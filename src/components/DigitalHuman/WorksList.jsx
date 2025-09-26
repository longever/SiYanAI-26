// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Video, Loader2 } from 'lucide-react';

export function WorksList({
  works,
  onRefresh
}) {
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
            <h4 className="text-white font-medium mb-1 truncate">
              {work.prompt?.substring(0, 50) || '无标题'}...
            </h4>
            <p className="text-sm text-gray-400 mb-2">
              状态: <span className={work.status === 'completed' ? 'text-green-400' : work.status === 'failed' ? 'text-red-400' : 'text-yellow-400'}>
                {work.status === 'completed' ? '已完成' : work.status === 'failed' ? '失败' : '处理中'}
              </span>
            </p>
            <p className="text-xs text-gray-500">
              {work.resolution || '720p'} • {work.duration || 5}秒
            </p>
          </div>)}
      </div>
    </div>;
}