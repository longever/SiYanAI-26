// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui';

export function VideoSettings({
  settings,
  onSettingsChange
}) {
  return <Card className="bg-gray-800/50 border-purple-800/30 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-white text-lg">视频设置</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-white text-sm">视频比例</label>
          <select className="w-full bg-gray-700 border-gray-600 rounded-lg p-2 text-white" value={settings.ratio} onChange={e => onSettingsChange({
          ...settings,
          ratio: e.target.value
        })}>
            <option value="16:9">16:9 横屏</option>
            <option value="3:4">3:4 竖屏</option>
            <option value="1:1">1:1 方形</option>
          </select>
        </div>
        <div>
          <label className="text-white text-sm">视频时长</label>
          <select className="w-full bg-gray-700 border-gray-600 rounded-lg p-2 text-white" value={settings.duration} onChange={e => onSettingsChange({
          ...settings,
          duration: parseInt(e.target.value)
        })}>
            <option value={15}>15秒</option>
            <option value={30}>30秒</option>
            <option value={60}>60秒</option>
            <option value={120}>2分钟</option>
          </select>
        </div>
        <div>
          <label className="text-white text-sm">输出质量</label>
          <select className="w-full bg-gray-700 border-gray-600 rounded-lg p-2 text-white" value={settings.quality} onChange={e => onSettingsChange({
          ...settings,
          quality: e.target.value
        })}>
            <option value="480P">480P</option>
            <option value="720P">720P</option>
            <option value="1080P">1080P</option>
          </select>
        </div>
      </CardContent>
    </Card>;
}