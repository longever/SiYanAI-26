// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Play, Pause } from 'lucide-react';

export function AudioPlayer({
  audioRef,
  audioPreviewUrl,
  isPlaying,
  currentTime,
  duration,
  onPlay,
  onTimeUpdate,
  onLoadedMetadata,
  onSeek
}) {
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
}