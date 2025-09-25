// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Badge, useToast } from '@/components/ui';
// @ts-ignore;
import { Play, Zap, Shield, Users, Star, ArrowRight, CheckCircle, Video, Image as ImageIcon, Mic } from 'lucide-react';

export default function HomePage(props) {
  const {
    $w,
    style
  } = props;
  const {
    toast
  } = useToast();
  const [featuredVideos, setFeaturedVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const features = [{
    icon: Video,
    title: '文生视频',
    description: '输入文字描述，AI自动生成精彩视频内容'
  }, {
    icon: ImageIcon,
    title: '图生视频',
    description: '上传图片，让静态图片动起来'
  }, {
    icon: Mic,
    title: '数字人',
    description: '创建专属数字人形象，生成个性化视频'
  }];
  const plans = [{
    id: 'basic',
    name: '基础版',
    price: '29',
    features: ['50次/月', '720P视频', '基础模板'],
    color: 'from-blue-500 to-blue-600'
  }, {
    id: 'pro',
    name: '专业版',
    price: '79',
    features: ['200次/月', '1080P视频', '高级模板'],
    color: 'from-purple-500 to-purple-600',
    popular: true
  }, {
    id: 'enterprise',
    name: '企业版',
    price: '199',
    features: ['无限次', '4K视频', '全部功能'],
    color: 'from-yellow-500 to-orange-500'
  }];
  const handleGetStarted = () => {
    $w.utils.navigateTo({
      pageId: 'create'
    });
  };
  const handleViewSubscription = (planId = 'pro') => {
    $w.utils.navigateTo({
      pageId: 'subscription',
      params: {
        plan: planId
      }
    });
  };

  // 内联的FeatureCard组件
  const FeatureCard = ({
    feature
  }) => <div className="bg-gray-800/50 border border-purple-800/30 rounded-lg p-6 text-center hover:bg-gray-800/70 transition-colors">
      <div className="w-16 h-16 bg-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4">
        <feature.icon className="w-8 h-8 text-white" />
      </div>
      <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
      <p className="text-gray-300">{feature.description}</p>
    </div>;
  return <div style={style} className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-24 text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            AI视频创作
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">新时代</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            释放创意，让AI为您生成专业级视频内容。文生视频、图生视频、数字人，一站式AI视频创作平台。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={handleGetStarted} size="lg" className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 text-lg">
              立即开始创作
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button onClick={() => handleViewSubscription('pro')} size="lg" variant="outline" className="border-purple-400 text-purple-400 hover:bg-purple-400/10 px-8 py-3 text-lg">
              查看套餐方案
            </Button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">强大功能</h2>
            <p className="text-xl text-gray-300">多种AI视频创作方式，满足您的各种需求</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => <FeatureCard key={index} feature={feature} />)}
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div className="py-20 px-4 bg-gray-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">选择适合您的套餐</h2>
            <p className="text-xl text-gray-300">灵活的定价方案，满足不同创作需求</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => <Card key={index} className={`bg-gray-800/50 border-purple-800/30 backdrop-blur-sm relative overflow-hidden ${plan.popular ? 'ring-2 ring-purple-500' : ''}`}>
                {plan.popular && <div className="absolute top-0 right-0 bg-purple-500 text-white px-3 py-1 text-sm rounded-bl-lg">
                    最受欢迎
                  </div>}
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl text-white mb-2">{plan.name}</CardTitle>
                  <div className="text-4xl font-bold text-white mb-2">
                    ¥{plan.price}
                    <span className="text-lg text-gray-400">/月</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, idx) => <li key={idx} className="flex items-center text-gray-300">
                        <CheckCircle className="w-5 h-5 text-green-400 mr-2" />
                        {feature}
                      </li>)}
                  </ul>
                  <Button onClick={() => handleViewSubscription(plan.id)} className={`w-full bg-gradient-to-r ${plan.color} text-white`}>
                    立即订阅
                  </Button>
                </CardContent>
              </Card>)}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-purple-400 mb-2">10万+</div>
              <div className="text-gray-300">用户创作</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-400 mb-2">50万+</div>
              <div className="text-gray-300">视频生成</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-400 mb-2">99%</div>
              <div className="text-gray-300">满意度</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-400 mb-2">24/7</div>
              <div className="text-gray-300">技术支持</div>
            </div>
          </div>
        </div>
      </div>
    </div>;
}