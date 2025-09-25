// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Button, Card, CardContent, Progress, Badge } from '@/components/ui';
// @ts-ignore;
import { Upload, Mic, Camera, Trash2, RefreshCw } from 'lucide-react';

export function UploadSection({
  type,
  file,
  cloudUrl,
  progress,
  isUploading,
  onFileSelect,
  onDelete,
  onRetry,
  formatFileSize
}) {
  const icons = {
    voice: Mic,
    image: Camera
  };
  const labels = {
    voice: {
      title: '音频文件',
      formats: 'MP3, WAV, M4A',
      requirements: '30秒以上'
    },
    image: {
      title: '图片文件',
      formats: 'JPG, PNG',
      requirements: '建议尺寸512x512'
    }
  };
  const Icon = icons[type];
  const label = labels[type];
  return <div>
      <input type="file" onChange={e => onFileSelect(type, e)} accept={type === 'voice' ? 'audio/*' : 'image/*'} className="hidden" id={`${type}-upload`} />
      
      {!file ? <div className="border-2 border-dashed border-purple-600/50 rounded-lg p-8 text-center cursor-pointer hover:border-purple-400 transition-colors" onClick={() => document.getElementById(`${type}-upload`).click()}>
          <Icon className="h-12 w-12 text-purple-400 mx-auto mb-4" />
          <p className="text-gray-300 mb-2">点击或拖拽上传{label.title}</p>
          <p className="text-sm text-gray-400 mb-4">
            支持 {label.formats} 格式，{label.requirements}
          </p>
          <Button type="button" className="bg-purple-600 hover:bg-purple-700" onClick={e => {
        e.stopPropagation();
        document.getElementById(`${type}-upload`).click();
      }}>
            <Upload className="mr-2 h-4 w-4" />
            选择文件
          </Button>
        </div> : <div className="bg-gray-700/50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-white font-medium">{file.name}</p>
              <p className="text-sm text-gray-400">{formatFileSize(file.size)}</p>
              {cloudUrl && <Badge variant="outline" className="text-xs text-green-400 mt-1">
                  已上传至云端
                </Badge>}
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="ghost" className="text-red-400 hover:text-red-300" onClick={() => onDelete(type)}>
                <Trash2 className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="ghost" className="text-blue-400 hover:text-blue-300" onClick={() => document.getElementById(`${type}-upload`).click()}>
                <RefreshCw className="w-4 h-4" />
              </Button>
            </div>
          </div>
          
          {type === 'image' && <div className="relative">
              <img src={URL.createObjectURL(file)} alt="预览" className="w-full h-64 object-cover rounded-lg" />
            </div>}
          
          {(progress > 0 || isUploading) && <div className="mt-4">
              <div className="flex justify-between text-sm text-gray-300 mb-1">
                <span>{isUploading ? '上传中...' : '处理中...'}</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} className="h-2 bg-gray-700" />
            </div>}
        </div>}
    </div>;
}