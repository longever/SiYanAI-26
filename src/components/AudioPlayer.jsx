// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Button } from '@/components/ui';
// @ts-ignore;
import { Play, Pause } from 'lucide-react';

export function AudioPlayer({
  audioRef,
  file,
  isPlaying,
  currentTime,
  duration,
  onTogglePlay,
  formatTime
}) {
  if (!file) return null;
  return <div className="bg-gray-800 rounded-lg p-3">
      <audio ref={audioRef} src={URL.createObjectURL(file)} onTimeUpdate={() => {
      if (audioRef.current) {
        onTogglePlay('timeUpdate', audioRef.current.currentTime);
      }
    }} onLoadedMetadata={() => {
      if (audioRef.current) {
        onTogglePlay('duration', audioRef.current.duration);
      }
    }} />
      <div className="flex items-center gap-3">
        <Button size="sm" variant="ghost" className="text-purple-400" onClick={() => onTogglePlay('toggle')}>
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        </Button>
        <div className="flex-1">
          <div className="text-xs text-gray-400 mb-1">
            {formatTime(currentTime)} / {formatTime(duration)}
          </div>
          <div className="w-full bg-gray-600 rounded-full h-1">
            <div className="bg-purple-500 h-1 rounded-full" style={{
            width: `${duration > 0 ? currentTime / duration * 100 : 0}%`
          }}></div>
          </div>
        </div>
      </div>
    </div>;
}