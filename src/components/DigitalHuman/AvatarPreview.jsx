// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { XCircle as XCircleIcon } from 'lucide-react';

export function AvatarPreview({
  imageUrl,
  onRemove
}) {
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
}