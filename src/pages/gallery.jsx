// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Badge, Avatar, AvatarFallback, AvatarImage } from '@/components/ui';
// @ts-ignore;
import { Play, Heart, Share2, Filter, Search } from 'lucide-react';

export default function GalleryPage(props) {
  const {
    $w,
    style
  } = props;
  const [selectedCategory, setSelectedCategory] = useState('all');
  const categories = [{
    id: 'all',
    name: '全部'
  }, {
    id: 'business',
    name: '商务'
  }, {
    id: 'education',
    name: '教育'
  }, {
    id: 'entertainment',
    name: '娱乐'
  }, {
    id: 'marketing',
    name: '营销'
  }];
  const videos = [{
    id: 1,
    title: "产品介绍 - 科技新品发布",
    author: "TechCreator",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop",
    thumbnail: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=225&fit=crop",
    category: "business",
    likes: 1234,
    views: 5678
  }, {
    id: 2,
    title: "在线课程 - Python入门教程",
    author: "EduMaster",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop",
    thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=225&fit=crop",
    category: "education",
    likes: 892,
    views: 3421
  }, {
    id: 3,
    title: "游戏解说 - 最新手游评测",
    author: "GameReviewer",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop",
    thumbnail: "https://images.unsplash.com/photo-1556438064-2d7646166914?w=400&h=225&fit=crop",
    category: "entertainment",
    likes: 2156,
    views: 8901
  }, {
    id: 4,
    title: "品牌推广 - 时尚服装广告",
    author: "FashionBrand",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop",
    thumbnail: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=225&fit=crop",
    category: "marketing",
    likes: 1567,
    views: 6789
  }, {
    id: 5,
    title: "企业培训 - 销售技巧分享",
    author: "SalesPro",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop",
    thumbnail: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=225&fit=crop",
    category: "business",
    likes: 743,
    views: 2103
  }, {
    id: 6,
    title: "美妆教程 - 日常妆容教学",
    author: "BeautyGuru",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=40&h=40&fit=crop",
    thumbnail: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=225&fit=crop",
    category: "entertainment",
    likes: 3021,
    views: 12345
  }];
  const filteredVideos = selectedCategory === 'all' ? videos : videos.filter(video => video.category === selectedCategory);
  return <div style={style} className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 头部 */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">作品展厅</h1>
            <p className="text-gray-300">探索社区创作的精彩数字人作品</p>
          </div>
          <Button variant="outline" className="border-purple-600 text-purple-300 hover:bg-purple-600/20" onClick={() => $w.utils.navigateTo({
          pageId: 'create'
        })}>
            创作我的作品
          </Button>
        </div>

        {/* 搜索和筛选 */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input type="text" placeholder="搜索作品..." className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400" />
          </div>
          <div className="flex gap-2">
            {categories.map(category => <Button key={category.id} variant={selectedCategory === category.id ? "default" : "outline"} size="sm" className={`${selectedCategory === category.id ? 'bg-purple-600 hover:bg-purple-700' : 'border-gray-600 text-gray-300 hover:bg-gray-700'}`} onClick={() => setSelectedCategory(category.id)}>
                {category.name}
              </Button>)}
          </div>
        </div>

        {/* 作品网格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVideos.map(video => <Card key={video.id} className="bg-gray-800/50 border-purple-800/30 backdrop-blur-sm overflow-hidden group cursor-pointer">
              <div className="relative aspect-video overflow-hidden">
                <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Button className="bg-purple-600 hover:bg-purple-700 rounded-full p-3">
                    <Play className="h-6 w-6" />
                  </Button>
                </div>
                <Badge className="absolute top-2 right-2 bg-purple-600">
                  {video.category}
                </Badge>
              </div>
              
              <CardHeader>
                <CardTitle className="text-white text-lg line-clamp-2">
                  {video.title}
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={video.avatar} />
                    <AvatarFallback>{video.author[0]}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm text-gray-300">{video.author}</span>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="flex justify-between items-center text-sm text-gray-400">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <Heart className="h-4 w-4" />
                      {video.likes}
                    </span>
                    <span>{video.views} 次观看</span>
                  </div>
                  <Button variant="ghost" size="sm" className="text-purple-400 hover:text-purple-300">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>)}
        </div>

        {/* 加载更多 */}
        <div className="text-center mt-12">
          <Button variant="outline" className="border-purple-600 text-purple-300 hover:bg-purple-600/20">
            加载更多作品
          </Button>
        </div>
      </div>
    </div>;
}