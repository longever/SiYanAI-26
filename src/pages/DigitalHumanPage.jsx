// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { Card, CardContent, CardDescription, CardHeader, CardTitle, Button, Tabs, TabsContent, TabsList, TabsTrigger, useToast } from '@/components/ui';

import { FileUploadSection } from '@/components/DigitalHuman/FileUploadSection';
import { AvatarPreview } from '@/components/DigitalHuman/AvatarPreview';
import { DigitalHumanAudioPlayer } from '@/components/DigitalHuman/DigitalHumanAudioPlayer';
import { VideoSettings } from '@/components/DigitalHuman/VideoSettings';
import { SystemSelector } from '@/components/DigitalHuman/SystemSelector';
import { GenerationModal } from '@/components/DigitalHuman/GenerationModal';
import { WorksList } from '@/components/DigitalHuman/WorksList';
export default function DigitalHumanPage(props) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [audioFile, setAudioFile] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const [settings, setSettings] = useState({
    resolution: '1080p',
    fps: 30,
    quality: 'high'
  });
  const [selectedSystem, setSelectedSystem] = useState('ali');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedVideo, setGeneratedVideo] = useState(null);
  const {
    toast
  } = useToast();
  const handleFileSelect = file => {
    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };
  const handleAudioSelect = file => {
    setAudioFile(file);
    setAudioUrl(URL.createObjectURL(file));
  };
  const handleGenerate = async () => {
    if (!selectedFile || !audioFile) {
      toast({
        title: "缺少文件",
        description: "请上传头像图片和音频文件",
        variant: "destructive"
      });
      return;
    }
    setIsGenerating(true);
    try {
      // 模拟生成过程
      await new Promise(resolve => setTimeout(resolve, 3000));
      setGeneratedVideo({
        id: Date.now(),
        url: 'https://example.com/generated-video.mp4',
        thumbnail: previewUrl,
        createdAt: new Date().toISOString()
      });
      toast({
        title: "生成成功",
        description: "数字人视频已生成完成"
      });
    } catch (error) {
      toast({
        title: "生成失败",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };
  return <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">数字人视频生成</h1>
          <p className="mt-2 text-gray-600">上传头像和音频，生成专属数字人视频</p>
        </div>

        <Tabs defaultValue="create" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="create">创建视频</TabsTrigger>
            <TabsTrigger value="works">我的作品</TabsTrigger>
          </TabsList>

          <TabsContent value="create">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>上传头像</CardTitle>
                    <CardDescription>支持 JPG、PNG 格式，建议尺寸 512x512</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <FileUploadSection accept="image/*" onFileSelect={handleFileSelect} previewUrl={previewUrl} />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>上传音频</CardTitle>
                    <CardDescription>支持 MP3、WAV 格式，最大 10MB</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <FileUploadSection accept="audio/*" onFileSelect={handleAudioSelect} type="audio" />
                    {audioUrl && <div className="mt-4">
                        <DigitalHumanAudioPlayer src={audioUrl} />
                      </div>}
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>预览</CardTitle>
                    <CardDescription>头像预览效果</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <AvatarPreview imageUrl={previewUrl} audioFile={audioFile} />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>系统选择</CardTitle>
                    <CardDescription>选择数字人生成系统</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <SystemSelector selected={selectedSystem} onChange={setSelectedSystem} />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>视频设置</CardTitle>
                    <CardDescription>调整输出视频参数</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <VideoSettings settings={settings} onChange={setSettings} />
                  </CardContent>
                </Card>

                <Button className="w-full" size="lg" onClick={handleGenerate} disabled={!selectedFile || !audioFile || isGenerating}>
                  {isGenerating ? "生成中..." : "开始生成"}
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="works">
            <WorksList works={generatedVideo ? [generatedVideo] : []} />
          </TabsContent>
        </Tabs>

        <GenerationModal open={isGenerating} onClose={() => setIsGenerating(false)} />
      </div>
    </div>;
}