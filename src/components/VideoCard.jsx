// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle, Badge, Avatar, AvatarFallback, AvatarImage, Button } from '@/components/ui';
// @ts-ignore;
import { Play, Download, Share2, Edit, Trash2 } from 'lucide-react';

export function VideoCard({
  work,
  onPreview,
  onDownload,
  onShare,
  onEdit,
  onDelete
}) {
  const getStatusColor = status => {
    switch (status) {
      case 'completed':
        return 'bg-green-600';
      case 'processing':
        return 'bg-yellow-600';
      case 'draft':
        return 'bg-gray-600';
      default:
        return 'bg-gray-600';
    }
  };
  const getStatusText = status => {
    switch (status) {
      case 'completed':
        return '已完成';
      case 'processing':
        return '处理中';
      case 'draft':
        return '草稿';
      default:
        return '未知';
    }
  };
  return <Card className="bg-gray-800/50 border-purple-800/30 backdrop-blur-sm overflow-hidden">
      <div className="relative aspect-video">
        <img src={work.thumbnail} alt={work.title} className="w-full h-full object-cover" />
        <div className="absolute top-2 right-2">
          <Badge className={getStatusColor(work.status)}>
            {getStatusText(work.status)}
          </Badge>
        </div>
      </div>

      <CardHeader>
        <CardTitle className="text-white text-lg line-clamp-2">
          {work.title}
        </CardTitle>
        <div className="flex items-center gap-4 text-sm text-gray-400">
          <span className="flex items-center gap-1">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {work.duration}
          </span>
          <span className="flex items-center gap-1">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            {work.views}
          </span>
        </div>
      </CardHeader>

      <CardContent>
        <div className="flex gap-2">
          <Button size="sm" variant="outline" className="flex-1 border-purple-600 text-purple-300 hover:bg-purple-600/20" onClick={onPreview}>
            <Play className="h-4 w-4 mr-1" />
            预览
          </Button>
          <Button size="sm" variant="outline" className="border-purple-600 text-purple-300 hover:bg-purple-600/20" onClick={onDownload}>
            <Download className="h-4 w-4" />
          </Button>
          <Button size="sm" variant="outline" className="border-purple-600 text-purple-300 hover:bg-purple-600/20" onClick={onShare}>
            <Share2 className="h-4 w-4" />
          </Button>
          <Button size="sm" variant="outline" className="border-purple-600 text-purple-300 hover:bg-purple-600/20" onClick={onEdit}>
            <Edit className="h-4 w-4" />
          </Button>
          <Button size="sm" variant="outline" className="border-red-600 text-red-400 hover:bg-red-600/20" onClick={onDelete}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>;
}