// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Button } from '@/components/ui';
// @ts-ignore;
import { CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

export function GenerationModal({
  isOpen,
  onClose,
  progress,
  status,
  error
}) {
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
}