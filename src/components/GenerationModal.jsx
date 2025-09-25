// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Card, CardHeader, CardTitle, CardDescription, CardContent, Progress } from '@/components/ui';
// @ts-ignore;
import { Loader2 } from 'lucide-react';

export function GenerationModal({
  isOpen,
  progress
}) {
  if (!isOpen) return null;
  const getStatusText = () => {
    if (progress < 30) return '正在分析素材...';
    if (progress < 60) return '正在合成视频...';
    if (progress < 90) return '正在优化效果...';
    return '即将完成...';
  };
  return <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <Card className="bg-gray-800 border-purple-800/30 w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-white text-center">正在生成数字人视频</CardTitle>
          <CardDescription className="text-gray-300 text-center">
            正在使用AI技术为您生成专属数字人视频，请稍候...
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-center">
              <Loader2 className="h-12 w-12 text-purple-500 animate-spin" />
            </div>
            <div>
              <div className="flex justify-between text-sm text-gray-300 mb-1">
                <span>生成进度</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} className="h-2 bg-gray-700" />
            </div>
            <p className="text-sm text-gray-400 text-center">
              {getStatusText()}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>;
}