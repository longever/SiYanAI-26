// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Badge, Progress, Tabs, TabsContent, TabsList, TabsTrigger, Avatar, AvatarFallback, AvatarImage, useToast } from '@/components/ui';
// @ts-ignore;
import { Crown, Zap, Clock, TrendingUp, Package, History, RefreshCw, ArrowUpRight, CheckCircle, AlertCircle, Calendar, CreditCard, Settings, Plus } from 'lucide-react';

// 模拟数据 - 实际应从数据库获取
const mockUserData = {
  id: 'user_123',
  name: '张小明',
  email: 'xiaoming@example.com',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
  membership: {
    level: '专业版',
    status: 'active',
    startDate: '2024-01-15',
    endDate: '2024-12-15',
    price: 79,
    currency: 'CNY'
  },
  credits: {
    total: 200,
    used: 145,
    remaining: 55,
    resetDate: '2024-12-15'
  }
};
const mockUsageHistory = [{
  id: 1,
  type: '视频生成',
  description: '生成1080P数字人视频',
  credits: 15,
  timestamp: '2024-09-25 14:30',
  status: 'completed'
}, {
  id: 2,
  type: '图片处理',
  description: 'AI图片增强',
  credits: 5,
  timestamp: '2024-09-25 10:15',
  status: 'completed'
}, {
  id: 3,
  type: '视频生成',
  description: '生成720P数字人视频',
  credits: 8,
  timestamp: '2024-09-24 16:45',
  status: 'completed'
}, {
  id: 4,
  type: '批量处理',
  description: '批量生成5个视频',
  credits: 45,
  timestamp: '2024-09-24 09:20',
  status: 'completed'
}, {
  id: 5,
  type: 'API调用',
  description: '第三方集成调用',
  credits: 2,
  timestamp: '2024-09-23 20:10',
  status: 'completed'
}];
const membershipLevels = {
  basic: {
    name: '基础版',
    color: 'from-blue-500 to-blue-600',
    features: ['每月50次生成', '720P视频质量', '基础模板库', '标准客服']
  },
  pro: {
    name: '专业版',
    color: 'from-purple-500 to-purple-600',
    features: ['每月200次生成', '1080P视频质量', '高级模板库', '优先客服', 'API接口']
  },
  enterprise: {
    name: '企业版',
    color: 'from-yellow-500 to-orange-500',
    features: ['无限次生成', '4K视频质量', '全部模板库', '专属客服', '自定义品牌']
  }
};
export default function DashboardPage(props) {
  const {
    $w,
    style
  } = props;
  const {
    toast
  } = useToast();
  const [userData, setUserData] = useState(mockUserData);
  const [usageHistory, setUsageHistory] = useState(mockUsageHistory);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  // 计算剩余天数
  const calculateRemainingDays = () => {
    const endDate = new Date(userData.membership.endDate);
    const today = new Date();
    const diffTime = endDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // 计算使用百分比
  const calculateUsagePercentage = () => {
    return Math.round(userData.credits.used / userData.credits.total * 100);
  };

  // 处理续费
  const handleRenew = () => {
    $w.utils.navigateTo({
      pageId: 'subscription',
      params: {
        action: 'renew',
        currentPlan: 'pro'
      }
    });
  };

  // 处理升级
  const handleUpgrade = () => {
    $w.utils.navigateTo({
      pageId: 'subscription',
      params: {
        action: 'upgrade',
        currentPlan: 'pro'
      }
    });
  };

  // 刷新数据
  const handleRefresh = async () => {
    setLoading(true);
    // 模拟API调用
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "数据已更新",
        description: "会员信息已同步最新状态",
        variant: "success"
      });
    }, 1000);
  };
  const remainingDays = calculateRemainingDays();
  const usagePercentage = calculateUsagePercentage();
  const currentLevel = membershipLevels[userData.membership.level.toLowerCase()] || membershipLevels.pro;
  return <div style={style} className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 p-4">
    <div className="max-w-7xl mx-auto">
      {/* 页面标题 */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">会员中心</h1>
          <p className="text-purple-300">管理您的订阅和算力点数</p>
        </div>
        <Button variant="outline" className="border-purple-400 text-purple-400 hover:bg-purple-400/10" onClick={handleRefresh} disabled={loading}>
          <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
          刷新
        </Button>
      </div>

      {/* 用户信息卡片 */}
      <Card className="bg-gray-800/50 border-purple-800/30 backdrop-blur-sm mb-8">
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <Avatar className="w-16 h-16">
              <AvatarImage src={userData.avatar} alt={userData.name} />
              <AvatarFallback className="bg-purple-600 text-white text-xl">
                {userData.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-white">{userData.name}</h2>
              <p className="text-gray-300">{userData.email}</p>
              <div className="flex items-center space-x-2 mt-2">
                <Badge className={`bg-gradient-to-r ${currentLevel.color} text-white`}>
                  <Crown className="w-3 h-3 mr-1" />
                  {userData.membership.level}
                </Badge>
                <Badge variant={userData.membership.status === 'active' ? "default" : "secondary"}>
                  {userData.membership.status === 'active' ? '已激活' : '已过期'}
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 主要内容区域 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 左侧：套餐和算力信息 */}
        <div className="lg:col-span-2 space-y-8">
          {/* 套餐详情卡片 */}
          <Card className="bg-gray-800/50 border-purple-800/30 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Package className="w-5 h-5 mr-2" />
                当前套餐
              </CardTitle>
              <CardDescription className="text-gray-300">
                您的订阅详情和到期时间
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">套餐类型</span>
                  <span className="text-white font-medium">{userData.membership.level}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">订阅价格</span>
                  <span className="text-white font-medium">¥{userData.membership.price}/月</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">到期时间</span>
                  <span className="text-white font-medium">{userData.membership.endDate}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">剩余天数</span>
                  <span className={`font-medium ${remainingDays <= 7 ? 'text-red-400' : 'text-green-400'}`}>
                    {remainingDays}天
                  </span>
                </div>
                
                {remainingDays <= 7 && <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3">
                    <div className="flex items-center">
                      <AlertCircle className="w-4 h-4 text-red-400 mr-2" />
                      <span className="text-red-400 text-sm">套餐即将到期，请及时续费</span>
                    </div>
                  </div>}

                <div className="flex space-x-3 pt-4">
                  <Button className="flex-1 bg-purple-600 hover:bg-purple-700 text-white" onClick={handleRenew}>
                    <Calendar className="w-4 h-4 mr-2" />
                    立即续费
                  </Button>
                  <Button variant="outline" className="flex-1 border-purple-400 text-purple-400 hover:bg-purple-400/10" onClick={handleUpgrade}>
                    <ArrowUpRight className="w-4 h-4 mr-2" />
                    升级套餐
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 算力点数卡片 */}
          <Card className="bg-gray-800/50 border-purple-800/30 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Zap className="w-5 h-5 mr-2" />
                算力点数
              </CardTitle>
              <CardDescription className="text-gray-300">
                本月剩余算力点数和使用情况
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-4xl font-bold text-purple-400 mb-2">
                    {userData.credits.remaining}
                  </div>
                  <div className="text-gray-300">剩余点数</div>
                  <div className="text-sm text-gray-400">
                    总计 {userData.credits.total} 点 | 已用 {userData.credits.used} 点
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-300">使用进度</span>
                    <span className="text-white">{usagePercentage}%</span>
                  </div>
                  <Progress value={usagePercentage} className="h-2" />
                </div>

                <div className="bg-gray-700/50 rounded-lg p-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-300">重置日期</span>
                    <span className="text-white">{userData.credits.resetDate}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 会员权益 */}
          <Card className="bg-gray-800/50 border-purple-800/30 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <CheckCircle className="w-5 h-5 mr-2" />
                会员权益
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {currentLevel.features.map((feature, index) => <li key={index} className="flex items-center text-gray-300">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>)}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* 右侧：使用记录 */}
        <div className="lg:col-span-1">
          <Card className="bg-gray-800/50 border-purple-800/30 backdrop-blur-sm h-full">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <History className="w-5 h-5 mr-2" />
                使用记录
              </CardTitle>
              <CardDescription className="text-gray-300">
                最近30天的算力使用记录
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {usageHistory.map(record => <div key={record.id} className="border-l-2 border-purple-500 pl-4 py-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-white font-medium text-sm">{record.type}</p>
                        <p className="text-gray-400 text-xs">{record.description}</p>
                      </div>
                      <span className="text-purple-400 font-medium text-sm">-{record.credits}点</span>
                    </div>
                    <div className="flex items-center mt-1">
                      <Clock className="w-3 h-3 text-gray-500 mr-1" />
                      <span className="text-gray-500 text-xs">{record.timestamp}</span>
                      {record.status === 'completed' && <CheckCircle className="w-3 h-3 text-green-400 ml-2" />}
                    </div>
                  </div>)}
              </div>

              {usageHistory.length === 0 && <div className="text-center py-8">
                  <History className="w-12 h-12 text-gray-500 mx-auto mb-3" />
                  <p className="text-gray-400 text-sm">暂无使用记录</p>
                </div>}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* 快捷操作区域 */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <Button variant="outline" className="border-purple-400 text-purple-400 hover:bg-purple-400/10 h-12" onClick={() => $w.utils.navigateTo({
          pageId: 'subscription'
        })}>
          <CreditCard className="w-4 h-4 mr-2" />
          管理订阅
        </Button>
        <Button variant="outline" className="border-purple-400 text-purple-400 hover:bg-purple-400/10 h-12" onClick={() => $w.utils.navigateTo({
          pageId: 'create'
        })}>
          <Plus className="w-4 h-4 mr-2" />
          开始创作
        </Button>
        <Button variant="outline" className="border-purple-400 text-purple-400 hover:bg-purple-400/10 h-12" onClick={() => $w.utils.navigateTo({
          pageId: 'works'
        })}>
          <TrendingUp className="w-4 h-4 mr-2" />
          查看作品
        </Button>
      </div>
    </div>
  </div>;
}