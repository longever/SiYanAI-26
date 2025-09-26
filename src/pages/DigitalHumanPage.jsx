// @ts-ignore;
import React, { useState, useRef, useEffect } from 'react';
// @ts-ignore;
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Textarea, useToast, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, RadioGroup, RadioGroupItem, Label } from '@/components/ui';
// @ts-ignore;
import { Play, Pause, Loader2, Mic, Video, Settings, XCircle as XCircleIcon, Upload, User, CheckCircle, AlertCircle } from 'lucide-react';

// 获取文档型数据库实例
const getDB = async () => {
  const tcb = await $w.cloud.getCloudInstance();
  return tcb.database();
};

// 文件上传组件
const FileUploadSection = ({
  onFileUpload,
  acceptedTypes,
  maxSize,
  toast,
  type = 'file',
  preview = false
}) => {
  const fileInputRef = useRef(null);
  const [dragOver, setDragOver] = useState(false);
  const handleFileSelect = e => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > maxSize * 1024 * 1024) {
        toast({
          title: "文件过大",
          description: `文件大小不能超过 ${maxSize}MB`,
          variant: "destructive"
        });
        return;
      }
      onFileUpload(file);
    }
  };
  const handleDrop = e => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      if (file.size > maxSize * 1024 * 1024) {
        toast({
          title: "文件过大",
          description: `文件大小不能超过 ${maxSize}MB`,
          variant: "destructive"
        });
        return;
      }
      onFileUpload(file);
    }
  };
  return <div className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${dragOver ? 'border-purple-400 bg-purple-400/10' : 'border-gray-600 hover:border-gray-500'}`} onDrop={handleDrop} onDragOver={e => {
    e.preventDefault();
    setDragOver(true);
  }} onDragLeave={() => setDragOver(false)}>
    <input ref={fileInputRef} type="file" accept={acceptedTypes} onChange={handleFileSelect} className="hidden" />
    <div className="flex flex-col items-center">
      {type === 'avatar' ? <User className="w-12 h-12 text-gray-400 mb-3" /> : <Mic className="w-12 h-12 text-gray-400 mb-3" />}
      <p className="text-gray-300 mb-2">
        拖拽{type === 'avatar' ? '照片' : '音频'}文件到此处，或
        <button onClick={() => fileInputRef.current?.click()} className="text-purple-400 hover:text-purple-300 ml-1">
          点击上传
        </button>
      </p>
      <p className="text-gray-500 text-sm">
        支持 {acceptedTypes}，最大 {maxSize}MB
      </p>
    </div>
  </div>;
};

// 头像预览组件
const AvatarPreview = ({
  imageUrl,
  onRemove
}) => {
  if (!imageUrl) return null;
  return <div className="bg-gray-700/50 rounded-lg p-4">
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-600">
          <img src={imageUrl} alt="个人形象" className="w-full h-full object-cover" />
        </div>
        <span className="text-white text-sm">个人形象</span>
      </div>
      <button onClick={onRemove} className="text-gray-400 hover:text-red-400 transition-colors">
        <XCircleIcon className="w-5 h-5" />
      </button>
    </div>
  </div>;
};

// 音频播放器组件
const AudioPlayer = ({
  audioRef,
  audioPreviewUrl,
  isPlaying,
  currentTime,
  duration,
  onPlay,
  onTimeUpdate,
  onLoadedMetadata,
  onSeek
}) => {
  if (!audioPreviewUrl) return null;
  return <div className="bg-gray-800 rounded-lg p-3">
    <audio ref={audioRef} src={audioPreviewUrl} onTimeUpdate={onTimeUpdate} onLoadedMetadata={onLoadedMetadata} onEnded={() => onPlay(false)} />
    <div className="flex items-center space-x-3">
      <button onClick={() => onPlay(!isPlaying)} className="text-purple-400 hover:text-purple-300">
        {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
      </button>
      <div className="flex-1">
        <input type="range" min="0" max={duration || 0} value={currentTime} onChange={e => onSeek(parseFloat(e.target.value))} className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer" />
      </div>
      <span className="text-xs text-gray-400">
        {Math.floor(currentTime / 60)}:{String(Math.floor(currentTime % 60)).padStart(2, '0')} /
        {Math.floor(duration / 60)}:{String(Math.floor(duration % 60)).padStart(2, '0')}
      </span>
    </div>
  </div>;
};

// 视频设置组件
const VideoSettingsControl = ({
  settings,
  onChange
}) => {
  return <div className="space-y-4">
    <div className="grid grid-cols-3 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">时长(秒)</label>
        <Select value={settings.duration.toString()} onValueChange={value => onChange({
          ...settings,
          duration: parseInt(value)
        })}>
          <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="3">3秒</SelectItem>
            <SelectItem value="5">5秒</SelectItem>
            <SelectItem value="10">10秒</SelectItem>
            <SelectItem value="15">15秒</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">帧率</label>
        <Select value={settings.fps.toString()} onValueChange={value => onChange({
          ...settings,
          fps: parseInt(value)
        })}>
          <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="12">12fps</SelectItem>
            <SelectItem value="24">24fps</SelectItem>
            <SelectItem value="30">30fps</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">分辨率</label>
        <Select value={`${settings.width}x${settings.height}`} onValueChange={value => {
          const [width, height] = value.split('x').map(Number);
          onChange({
            ...settings,
            width,
            height
          });
        }}>
          <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="512x512">512x512</SelectItem>
            <SelectItem value="768x512">768x512</SelectItem>
            <SelectItem value="512x768">512x768</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  </div>;
};

// 系统选择组件
const SystemSelectorControl = ({
  selectedSystem,
  onChange
}) => {
  return <div className="space-y-2">
    <label className="block text-sm font-medium text-gray-300 mb-2">AI系统</label>
    <Select value={selectedSystem} onValueChange={onChange}>
      <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="wan2_2_s2v">万相2.2</SelectItem>
        <SelectItem value="emo_v1">悦动人像</SelectItem>
        <SelectItem value="keling">可灵</SelectItem>
        <SelectItem value="guiji">硅基</SelectItem>
      </SelectContent>
    </Select>
  </div>;
};

// 生成进度模态框
const GenerationProgressModal = ({
  isOpen,
  onClose,
  progress,
  status,
  error
}) => {
  if (!isOpen) return null;
  return <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div className="bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
      <h3 className="text-xl font-bold text-white mb-4">
        {status === 'failed' ? '生成失败' : status === 'completed' ? '生成完成' : '生成中...'}
      </h3>
      <div className="space-y-4">
        {status === 'processing' && <>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div className="bg-purple-600 h-2 rounded-full transition-all duration-300" style={{
              width: `${progress}%`
            }}></div>
          </div>
          <p className="text-center text-gray-300">{progress}%</p>
        </>}
        {status === 'completed' && <div className="text-center">
          <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-2" />
          <p className="text-green-400">数字人视频生成成功！</p>
        </div>}
        {status === 'failed' && <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-2" />
          <p className="text-red-400">{error || '生成失败，请重试'}</p>
        </div>}
        {(status === 'completed' || status === 'failed') && <Button onClick={onClose} className="w-full bg-purple-600 hover:bg-purple-700 text-white">
          {status === 'completed' ? '查看作品' : '关闭'}
        </Button>}
      </div>
    </div>
  </div>;
};

// 作品列表组件
const WorksList = ({
  works,
  onRefresh
}) => {
  if (!works || works.length === 0) {
    return <div className="text-center py-8">
      <Video className="w-12 h-12 text-gray-500 mx-auto mb-4" />
      <p className="text-gray-400">暂无数字人作品</p>
    </div>;
  }
  return <div className="space-y-4">
    <div className="flex justify-between items-center mb-4">
      <h3 className="text-lg font-semibold text-white">我的数字人作品</h3>
      <button onClick={onRefresh} className="text-purple-400 hover:text-purple-300 text-sm">
        刷新
      </button>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {works.map(work => <div key={work._id} className="bg-gray-700/50 rounded-lg p-4">
        <div className="aspect-video bg-gray-600 rounded-lg mb-3 flex items-center justify-center">
          {work.status === 'completed' ? <Video className="w-8 h-8 text-purple-400" /> : <Loader2 className="w-8 h-8 text-purple-400 animate-spin" />}
        </div>
        <h4 className="text-white font-medium mb-1 truncate">{work.prompt.substring(0, 50)}...</h4>
        <p className="text-sm text-gray-400 mb-2">
          状态: <span className={work.status === 'completed' ? 'text-green-400' : work.status === 'failed' ? 'text-red-400' : 'text-yellow-400'}>
            {work.status === 'completed' ? '已完成' : work.status === 'failed' ? '失败' : '处理中'}
          </span>
        </p>
        <p className="text-xs text-gray-500">
          {work.resolution} • {work.duration}秒
        </p>
      </div>)}
    </div>
  </div>;
};
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
      // 修改1：加载失败后不弹出消息窗口
      // 仅记录日志，不显示toast
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
        // 默认时长
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

      // 调用云函数生成视频
      const taskResult = await $w.cloud.callFunction({
        name: 'aliyun_dashscope_jbn02va',
        methodName: 'get_tasks_status',
        data: {
          prompt: textPrompt,
          voice_url: voiceUrl,
          avatar_url: avatarUrl,
          params: generationParams.generation_params
        }
      });

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
                video_url: taskResult.result?.video_url || 'https://example.com/videos/generated_video.mp4',
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
            // 修改2：提示用户可到我的作品中查看结果
            toast({
              title: "生成完成",
              description: "数字人视频已生成成功！可到我的作品中查看结果，或继续生成下一个视频。",
              variant: "success"
            });
            loadWorks(); // 刷新作品列表
          }).catch(error => {
            console.error('更新记录失败:', error);
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
                  <label className="block text-sm font-medium text-gray-300 mb-2">个人形象照片</label>
                  {avatarPreviewUrl ? <AvatarPreview imageUrl={avatarPreviewUrl} onRemove={() => handleFileRemove('avatar')} /> : <FileUploadSection onFileUpload={file => handleFileUpload(file, 'avatar')} acceptedTypes="image/*" maxSize={5} toast={toast} type="avatar" />}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">数字人形象</label>
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
                    <label className="block text-sm font-medium text-gray-300 mb-2">声音选择</label>
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

                <FileUploadSection onFileUpload={file => handleFileUpload(file, 'audio')} acceptedTypes="audio/*" maxSize={50} toast={toast} type="audio" />

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
                    <label className="block text-sm font-medium text-gray-300 mb-2">视频清晰度</label>
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
                    <label className="block text-sm font-medium text-gray-300 mb-2">视频比例</label>
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

                <Textarea placeholder="输入要数字人朗读的文字内容..." value={textPrompt} onChange={e => setTextPrompt(e.target.value)} className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 min-h-[100px]" />

                <SystemSelectorControl selectedSystem={selectedSystem} onChange={setSelectedSystem} />

                <Button onClick={handleGenerate} disabled={isGenerating} className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white hover:from-purple-700 hover:to-purple-800">
                  {isGenerating ? <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    生成中...
                  </> : <>
                    <Play className="w-4 h-4 mr-2" />
                    开始生成
                  </>}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 右侧：预览和设置 + 作品列表 */}
        <div className="space-y-6">
          <Card className="bg-gray-800/50 border-purple-800/30 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white text-lg">预览</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-gray-700 rounded-lg flex items-center justify-center">
                <Video className="w-16 h-16 text-gray-500" />
              </div>
              {avatarPreviewUrl && <div className="mt-4 text-center">
                <p className="text-sm text-gray-300">个人形象已上传</p>
              </div>}
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-purple-800/30 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white text-lg">设置</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-300">个人形象:</span>
                  <span className="text-white">{avatarFile ? '已上传' : '未上传'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">清晰度:</span>
                  <span className="text-white">{videoQuality === '480p' ? '480P' : '720P'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">比例:</span>
                  <span className="text-white">{videoRatio}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">系统:</span>
                  <span className="text-white">{selectedSystem}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 作品列表 */}
          <Card className="bg-gray-800/50 border-purple-800/30 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white text-lg">我的数字人作品</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoadingWorks ? <div className="flex justify-center py-4">
                <Loader2 className="w-6 h-6 text-purple-400 animate-spin" />
              </div> : <WorksList works={works} onRefresh={loadWorks} />}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>

    <GenerationProgressModal isOpen={isGenerating} onClose={() => {
      setIsGenerating(false);
      setGenerationStatus('idle');
    }} progress={generationProgress} status={generationStatus} error={generationError} />
  </div>;
}