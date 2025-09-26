// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui';

export function VideoSettings({
  settings,
  onChange
}) {
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
}