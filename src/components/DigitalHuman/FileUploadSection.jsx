// @ts-ignore;
import React, { useRef, useState } from 'react';
// @ts-ignore;
import { useToast } from '@/components/ui';
// @ts-ignore;
import { User, Mic } from 'lucide-react';

export function FileUploadSection({
  onFileUpload,
  acceptedTypes,
  maxSize,
  type = 'file',
  preview = false
}) {
  const fileInputRef = useRef(null);
  const [dragOver, setDragOver] = useState(false);
  const {
    toast
  } = useToast();
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
}