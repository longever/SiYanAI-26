
    'use strict';

    const cloudbase = require('@cloudbase/node-sdk');
    const https = require('https');
    const http = require('http');
    const { URL } = require('url');

    const app = cloudbase.init({
      env: cloudbase.SYMBOL_CURRENT_ENV
    });

    exports.main = async (event, context) => {
      try {
        // 1. 校验输入
        const { url, filename } = event;
        
        if (!url || typeof url !== 'string') {
          return {
            success: false,
            error: '参数错误：url 不能为空且必须为字符串'
          };
        }

        // 验证URL格式
        try {
          new URL(url);
        } catch (e) {
          return {
            success: false,
            error: '参数错误：url 格式不合法'
          };
        }

        // 2. 生成目标路径
        const timestamp = Date.now();
        const random = Math.random().toString(36).substring(2, 8);
        const finalFilename = filename 
          ? `${filename}.mp4`
          : `video_${timestamp}_${random}.mp4`;
        const cloudPath = `saas_temp/video/${finalFilename}`;

        // 3. 下载视频
        const videoBuffer = await downloadVideo(url);
        
        if (!videoBuffer || videoBuffer.length === 0) {
          return {
            success: false,
            error: '下载失败：无法获取视频内容'
          };
        }

        // 4. 上传到云存储
        const uploadResult = await app.uploadFile({
          cloudPath: cloudPath,
          fileContent: videoBuffer
        });

        // 5. 返回结果
        return {
          success: true,
          fileID: uploadResult.fileID
        };

      } catch (error) {
        console.error('downloadVideoProxy error:', error);
        
        // 错误处理
        let errorMessage = '操作失败';
        
        if (error.code === 'ECONNREFUSED') {
          errorMessage = '下载失败：无法连接到目标地址';
        } else if (error.code === 'ENOTFOUND') {
          errorMessage = '下载失败：域名解析失败';
        } else if (error.message && error.message.includes('timeout')) {
          errorMessage = '下载失败：请求超时';
        } else if (error.message && error.message.includes('quota')) {
          errorMessage = '上传失败：云存储配额不足';
        } else if (error.message && error.message.includes('size')) {
          errorMessage = '上传失败：文件大小超出限制';
        } else {
          errorMessage = `操作失败：${error.message || '未知错误'}`;
        }

        return {
          success: false,
          error: errorMessage
        };
      }
    };

    // 下载视频函数
    function downloadVideo(url) {
      return new Promise((resolve, reject) => {
        const urlObj = new URL(url);
        const client = urlObj.protocol === 'https:' ? https : http;
        
        const options = {
          hostname: urlObj.hostname,
          port: urlObj.port || (urlObj.protocol === 'https:' ? 443 : 80),
          path: urlObj.pathname + urlObj.search,
          method: 'GET',
          timeout: 30000, // 30秒超时
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
          }
        };

        const req = client.request(options, (res) => {
          if (res.statusCode !== 200) {
            reject(new Error(`HTTP ${res.statusCode}: ${res.statusMessage}`));
            return;
          }

          const chunks = [];
          let totalSize = 0;
          const maxSize = 100 * 1024 * 1024; // 100MB 限制

          res.on('data', (chunk) => {
            chunks.push(chunk);
            totalSize += chunk.length;
            
            if (totalSize > maxSize) {
              req.destroy();
              reject(new Error('文件大小超出限制'));
            }
          });

          res.on('end', () => {
            const buffer = Buffer.concat(chunks);
            resolve(buffer);
          });

          res.on('error', (err) => {
            reject(err);
          });
        });

        req.on('error', (err) => {
          reject(err);
        });

        req.on('timeout', () => {
          req.destroy();
          reject(new Error('请求超时'));
        });

        req.end();
      });
    }
  