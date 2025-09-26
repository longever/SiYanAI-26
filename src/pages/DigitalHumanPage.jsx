// @ts-ignore;
import React, { useState, useRef, useEffect } from 'react';
// @ts-ignore;
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Textarea, useToast, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, RadioGroup, RadioGroupItem, Label } from '@/components/ui';
// @ts-ignore;
import { Play, Pause, Loader2, Mic, Video, Settings, XCircle as XCircleIcon, Upload, User, CheckCircle, AlertCircle } from 'lucide-react';

import { FileUploadSection } from '@/components/DigitalHuman/FileUploadSection';
import { AvatarPreview } from '@/components/DigitalHuman/AvatarPreview';
import { AudioPlayer } from '@/components/DigitalHuman/AudioPlayer';
import { VideoSettings } from '@/components/DigitalHuman/VideoSettings';
import { SystemSelector } from '@/components/DigitalHuman/SystemSelector';
import { GenerationModal } from '@/components/DigitalHuman/GenerationModal';
import { WorksList } from '@/components/DigitalHuman/WorksList';
export default function DigitalHumanPage(props) {
  const {
    $w,
    style
  } = props;
  const {
    toast
  } = useToast();
  const [textPrompt, setTextPrompt] = useState('');
  const [audioFile, setAudioFile] = useState(null);
  const [avatarFile, setAvatarFile] = useState(null);
  const [audioPreviewUrl, setAudioPreviewUrl] = useState(null);
  const [avatarPreviewUrl, setAvatarPreviewUrl] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [generationStatus, setGenerationStatus] = useState('idle');
  const [generationError, setGenerationError] = useState('');
  const [videoQuality, setVideoQuality] = useState('720p');
  const [videoRatio, setVideoRatio] = useState('1:1');
  const [digitalHumanSettings, setDigitalHumanSettings] = useState({
    avatar: 'default',
    voice: 'xiaoyun',
    speed: 1.0,
    pitch: 1.0
  });
  const [selectedSystem, setSelectedSystem] = useState('wanx2.1');
  const [works, setWorks] = useState([]);
  const [isLoadingWorks, setIsLoadingWorks] = useState(false);

  // 音频播放器状态
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);

  // 加载作品列表
  const loadWorks = async () => {
    setIsLoadingWorks(true);
    try {
      const result = await $w.cloud.callDataSource({
        dataSourceName: 'digital_human_videos',
        methodName: 'wedaGetRecordsV2',
        params: {
          filter: {
            where: {
              owner: {
                $eq: $w.auth.currentUser?.userId || 'anonymous'
              }
            }
          },
          orderBy: [{
            createdAt: 'desc'
          }],
          pageSize: 10,
          pageNumber: 1
        }
      });
      setWorks(result.records || []);
    } catch (error) {
      console.error('加载作品失败:', error);
    } finally {
      setIsLoadingWorks(false);
    }
  };

  // 处理文件上传
  const handleFileUpload = (file, type) => {
    if (type === 'avatar') {
      setAvatarFile(file);
      const url = URL.createObjectURL(file);
      setAvatarPreviewUrl(url);
    } else if (type === 'audio') {
      setAudioFile(file);
      const url = URL.createObjectURL(file);
      setAudioPreviewUrl(url);
      setIsPlaying(false);
      setCurrentTime(0);
    }
  };

  // 处理文件删除
  const handleFileRemove = type => {
    if (type === 'avatar') {
      setAvatarFile(null);
      if (avatarPreviewUrl) {
        URL.revokeObjectURL(avatarPreviewUrl);
        setAvatarPreviewUrl(null);
      }
    } else if (type === 'audio') {
      setAudioFile(null);
      if (audioPreviewUrl) {
        URL.revokeObjectURL(audioPreviewUrl);
        setAudioPreviewUrl(null);
      }
      setIsPlaying(false);
      setCurrentTime(0);
    }
  };

  // 音频播放控制
  const handleAudioPlay = playState => {
    setIsPlaying(playState);
    if (audioRef.current) {
      if (playState) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  };
  const handleAudioTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };
  const handleAudioLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };
  const handleAudioSeek = time => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  // 上传文件到云存储
  const uploadFileToCloud = async (file, type) => {
    try {
      const cloud = await $w.cloud.getCloudInstance();
      const fileName = `${type}_${Date.now()}_${file.name}`;
      const result = await cloud.uploadFile({
        cloudPath: `digital_human/${type}/${fileName}`,
        filePath: file
      });
      return result.fileID;
    } catch (error) {
      console.error(`上传${type}失败:`, error);
      throw error;
    }
  };

  // 处理生成
  const handleGenerate = async () => {
    if (!textPrompt.trim() && !audioFile) {
      toast({
        title: "提示",
        description: "请输入文字内容或上传音频文件",
        variant: "destructive"
      });
      return;
    }
    setIsGenerating(true);
    setGenerationStatus('processing');
    setGenerationProgress(0);
    setGenerationError('');
    let recordId = null;
    try {
      // 上传文件到云存储
      let avatarUrl = '';
      let voiceUrl = '';
      if (avatarFile) {
        avatarUrl = await uploadFileToCloud(avatarFile, 'avatar');
      }
      if (audioFile) {
        voiceUrl = await uploadFileToCloud(audioFile, 'voice');
      }

      // 准备生成参数
      const generationParams = {
        prompt: textPrompt,
        voice_url: voiceUrl,
        voice_type: audioFile ? 'upload' : 'system',
        avatar_url: avatarUrl,
        avatar_type: avatarFile ? 'upload' : 'system',
        resolution: videoQuality,
        duration: 5,
        generation_params: {
          voice_id: digitalHumanSettings.voice,
          avatar_id: digitalHumanSettings.avatar,
          quality: videoQuality === '720p' ? 'high' : 'medium',
          ratio: videoRatio,
          speed: digitalHumanSettings.speed,
          pitch: digitalHumanSettings.pitch
        }
      };

      // 先保存记录到数据库
      const recordResult = await $w.cloud.callDataSource({
        dataSourceName: 'digital_human_videos',
        methodName: 'wedaCreateV2',
        params: {
          data: {
            ...generationParams,
            status: 'processing',
            task_id: `task_${Date.now()}`,
            owner: $w.auth.currentUser?.userId || 'anonymous',
            createBy: $w.auth.currentUser?.userId || 'anonymous',
            updateBy: $w.auth.currentUser?.userId || 'anonymous'
          }
        }
      });
      recordId = recordResult.id;

      // 模拟进度更新
      let progress = 0;
      const progressInterval = setInterval(() => {
        progress += 10;
        setGenerationProgress(progress);
        if (progress >= 100) {
          clearInterval(progressInterval);

          // 更新记录状态
          $w.cloud.callDataSource({
            dataSourceName: 'digital_human_videos',
            methodName: 'wedaUpdateV2',
            params: {
              data: {
                status: 'completed',
                video_url: 'https://example.com/videos/generated_video.mp4',
                updatedAt: Date.now()
              },
              filter: {
                where: {
                  _id: {
                    $eq: recordId
                  }
                }
              }
            }
          }).then(() => {
            setGenerationStatus('completed');
            toast({
              title: "生成完成",
              description: "数字人视频已生成成功！可到我的作品中查看结果，或继续生成下一个视频。",
              variant: "success"
            });
            loadWorks();
          });
        }
      }, 1000);
    } catch (error) {
      console.error('生成失败:', error);
      setGenerationStatus('failed');
      setGenerationError(error.message || '生成失败，请重试');

      // 更新失败状态
      if (recordId) {
        $w.cloud.callDataSource({
          dataSourceName: 'digital_human_videos',
          methodName: 'wedaUpdateV2',
          params: {
            data: {
              status: 'failed',
              error_message: error.message || '生成失败',
              updatedAt: Date.now()
            },
            filter: {
              where: {
                _id: {
                  $eq: recordId
                }
              }
            }
          }
        });
      }
      toast({
        title: "生成失败",
        description: error.message || '生成失败，请重试',
        variant: "destructive"
      });
    }
  };

  // 清理URL
  useEffect(() => {
    return () => {
      if (audioPreviewUrl) {
        URL.revokeObjectURL(audioPreviewUrl);
      }
      if (avatarPreviewUrl) {
        URL.revokeObjectURL(avatarPreviewUrl);
      }
    };
  }, [audioPreviewUrl, avatarPreviewUrl]);

  // 初始加载作品
  useEffect(() => {
    loadWorks();
  }, []);
  return <div style={style} className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">数字人创作</h1>
          <p className="text-xl text-purple-300">创建AI数字人，让虚拟形象为您说话</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 左侧：创作区域 */}
          <div className="lg:col-span-2">
            <Card className="bg-gray-800/50 border-purple-800/30 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">数字人视频生成</CardTitle>
                <CardDescription className="text-gray-300">
                  上传个人形象照片，选择数字人形象，生成专业数字人视频
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* 个人形象上传 */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      个人形象照片
                    </label>
                    {avatarPreviewUrl ? <AvatarPreview imageUrl={avatarPreviewUrl} onRemove={() => handleFileRemove('avatar')} /> : <FileUploadSection onFileUpload={file => handleFileUpload(file, 'avatar')} acceptedTypes="image/*" maxSize={5} type="avatar" />}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        数字人形象
                      </label>
                      <Select value={digitalHumanSettings.avatar} onValueChange={value => setDigitalHumanSettings(prev => ({
                      ...prev,
                      avatar: value
                    }))}>
                        <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="default">默认形象</SelectItem>
                          <SelectItem value="business">商务形象</SelectItem>
                          <SelectItem value="casual">休闲形象</SelectItem>
                          <SelectItem value="professional">专业形象</SelectItem>
                          <SelectItem value="custom">使用个人照片</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        声音选择
                      </label>
                      <Select value={digitalHumanSettings.voice} onValueChange={value => setDigitalHumanSettings(prev => ({
                      ...prev,
                      voice: value
                    }))}>
                        <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="xiaoyun">小云 (女声)</SelectItem>
                          <SelectItem value="xiaogang">小刚 (男声)</SelectItem>
                          <SelectItem value="xiaomei">小美 (女声)</SelectItem>
                          <SelectItem value="xiaoming">小明 (男声)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <FileUploadSection onFileUpload={file => handleFileUpload(file, 'audio')} acceptedTypes="audio/*" maxSize={50} type="audio" />

                  {audioFile && <div className="bg-gray-700/50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <Mic className="w-5 h-5 text-purple-400" />
                          <span className="text-white text-sm">{audioFile.name}</span>
                        </div>
                        <button onClick={() => handleFileRemove('audio')} className="text-gray-400 hover:text-red-400 transition-colors">
                          <XCircleIcon className="w-5 h-5" />
                        </button>
                      </div>

                      <AudioPlayer audioRef={audioRef} audioPreviewUrl={audioPreviewUrl} isPlaying={isPlaying} currentTime={currentTime} duration={duration} onPlay={handleAudioPlay} onTimeUpdate={handleAudioTimeUpdate} onLoadedMetadata={handleAudioLoadedMetadata} onSeek={handleAudioSeek} />
                    </div>}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        视频清晰度
                      </label>
                      <Select value={videoQuality} onValueChange={setVideoQuality}>
                        <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="480p">480P (标清)</SelectItem>
                          <SelectItem value="720p">720P (高清)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        视频比例
                      </label>
                      <RadioGroup value={videoRatio} onValueChange={setVideoRatio} className="flex space-x-4">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="1:1" id="ratio-1-1" />
                          <Label htmlFor="ratio-1-1" className="text-gray-300">1:1 (头像)</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="3:4" id="ratio-3-4" />
                          <Label htmlFor="ratio-3-4" className="text-gray-300">3:4 (半身)</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>

                  <Textarea placeholder="输入要数字人朗读的文字内容..." value={textPrompt} onChange={e => setTextPrompt(e.target.value)} className="bg-gray-700 border-gray-600 text-white placeholder-gray-400" rows={4} />

                  <Button onClick={handleGenerate} disabled={isGenerating} className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                    {isGenerating ? <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        生成中...
                      </> : <>
                        <Video className="w-4 h-4 mr-2" />
                        开始生成
                      </>}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 右侧：作品展示 */}
          <div>
            <Card className="bg-gray-800/50 border-purple-800/30 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">作品管理</CardTitle>
                <CardDescription className="text-gray-300">
                  查看和管理您的数字人作品
                </CardDescription>
              </CardHeader>
              <CardContent>
                <WorksList works={works} onRefresh={loadWorks} />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <GenerationModal isOpen={isGenerating} onClose={() => {
      setIsGenerating(false);
      setGenerationStatus('idle');
    }} progress={generationProgress} status={generationStatus} error={generationError} />
    </div>;
}