// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle, useToast, Badge, Input, Tabs, TabsContent, TabsList, TabsTrigger, Table, TableBody, TableCell, TableHead, TableHeader, TableRow, Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui';
// @ts-ignore;
import { User, CreditCard, Coins, History, LogIn, UserPlus, Crown, Zap, CheckCircle, XCircle, ArrowUpRight, ArrowDownRight, ShoppingCart, Package } from 'lucide-react';

export default function MembershipPage(props) {
  const {
    $w,
    style
  } = props;
  const {
    toast
  } = useToast();
  const [activeTab, setActiveTab] = useState('subscription');
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // 模拟用户数据
  const [user, setUser] = useState({
    isLoggedIn: false,
    name: '',
    email: '',
    points: 0,
    subscription: null
  });

  // 模拟订阅计划
  const subscriptionPlans = [{
    id: 'basic',
    name: '基础版',
    price: 29,
    period: '月',
    points: 100,
    features: ['100点/月', '标准语音克隆', '基础形象生成', '客服支持'],
    recommended: false
  }, {
    id: 'pro',
    name: '专业版',
    price: 99,
    period: '月',
    points: 500,
    features: ['500点/月', '高清语音克隆', '高级形象生成', '优先客服', 'API访问'],
    recommended: true
  }, {
    id: 'enterprise',
    name: '企业版',
    price: 299,
    period: '月',
    points: 2000,
    features: ['2000点/月', '超清语音克隆', '定制形象生成', '专属客服', '完整API', '白标解决方案'],
    recommended: false
  }];

  // 新增：算力点数包
  const pointPackages = [{
    id: '500',
    name: '500点数包',
    points: 500,
    price: 49,
    originalPrice: 55,
    discount: '9折',
    color: 'from-blue-500 to-cyan-500',
    popular: false
  }, {
    id: '1000',
    name: '1000点数包',
    points: 1000,
    price: 89,
    originalPrice: 110,
    discount: '8折',
    color: 'from-purple-500 to-pink-500',
    popular: true
  }, {
    id: '3000',
    name: '3000点数包',
    points: 3000,
    price: 249,
    originalPrice: 330,
    discount: '7.5折',
    color: 'from-green-500 to-emerald-500',
    popular: false
  }, {
    id: '5000',
    name: '5000点数包',
    points: 5000,
    price: 399,
    originalPrice: 550,
    discount: '7折',
    color: 'from-orange-500 to-red-500',
    popular: false
  }, {
    id: '10000',
    name: '10000点数包',
    points: 10000,
    price: 749,
    originalPrice: 1100,
    discount: '6.8折',
    color: 'from-indigo-500 to-purple-500',
    popular: false
  }];

  // 模拟点数记录
  const [pointRecords, setPointRecords] = useState([{
    id: 1,
    type: 'consume',
    amount: -50,
    description: '语音克隆生成',
    date: '2025-01-18 14:30',
    balance: 450
  }, {
    id: 2,
    type: 'consume',
    amount: -30,
    description: '形象生成',
    date: '2025-01-17 10:15',
    balance: 500
  }, {
    id: 3,
    type: 'recharge',
    amount: 500,
    description: '套餐充值',
    date: '2025-01-15 09:00',
    balance: 530
  }, {
    id: 4,
    type: 'consume',
    amount: -20,
    description: '文案生成',
    date: '2025-01-14 16:45',
    balance: 30
  }]);
  const handleLogin = () => {
    if (!email || !password) {
      toast({
        title: "登录失败",
        description: "请输入邮箱和密码",
        variant: "destructive"
      });
      return;
    }
    setUser({
      isLoggedIn: true,
      name: '用户' + Math.random().toString(36).substr(2, 5),
      email: email,
      points: 500,
      subscription: subscriptionPlans[1]
    });
    setIsLoginOpen(false);
    toast({
      title: "登录成功",
      description: "欢迎回来！"
    });
  };
  const handleRegister = () => {
    if (!email || !password || !confirmPassword) {
      toast({
        title: "注册失败",
        description: "请填写所有信息",
        variant: "destructive"
      });
      return;
    }
    if (password !== confirmPassword) {
      toast({
        title: "注册失败",
        description: "密码确认不一致",
        variant: "destructive"
      });
      return;
    }
    setUser({
      isLoggedIn: true,
      name: '新用户' + Math.random().toString(36).substr(2, 5),
      email: email,
      points: 100,
      subscription: null
    });
    setIsRegisterOpen(false);
    toast({
      title: "注册成功",
      description: "欢迎加入AIClone！"
    });
  };
  const handleSubscribe = plan => {
    setUser({
      ...user,
      subscription: plan,
      points: user.points + plan.points
    });
    setPointRecords([{
      id: Date.now(),
      type: 'recharge',
      amount: plan.points,
      description: `${plan.name}套餐充值`,
      date: new Date().toLocaleString(),
      balance: user.points + plan.points
    }, ...pointRecords]);
    toast({
      title: "订阅成功",
      description: `已成功订阅${plan.name}套餐`
    });
  };
  const handlePurchasePoints = packageData => {
    setUser({
      ...user,
      points: user.points + packageData.points
    });
    setPointRecords([{
      id: Date.now(),
      type: 'recharge',
      amount: packageData.points,
      description: `购买${packageData.name}`,
      date: new Date().toLocaleString(),
      balance: user.points + packageData.points
    }, ...pointRecords]);
    toast({
      title: "购买成功",
      description: `已成功购买${packageData.name}，获得${packageData.points}点数`
    });
  };
  const handleConsumePoints = (amount, description) => {
    if (user.points < amount) {
      toast({
        title: "点数不足",
        description: "您的点数不足以完成此操作",
        variant: "destructive"
      });
      return;
    }
    setUser({
      ...user,
      points: user.points - amount
    });
    setPointRecords([{
      id: Date.now(),
      type: 'consume',
      amount: -amount,
      description: description,
      date: new Date().toLocaleString(),
      balance: user.points - amount
    }, ...pointRecords]);
    toast({
      title: "消费成功",
      description: `已消费${amount}点`
    });
  };
  const handleLogout = () => {
    setUser({
      isLoggedIn: false,
      name: '',
      email: '',
      points: 0,
      subscription: null
    });
    toast({
      title: "已退出登录",
      description: "期待再次为您服务"
    });
  };
  return <div style={style} className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* 导航栏 */}
      <nav className="fixed top-0 w-full bg-black/80 backdrop-blur-md border-b border-gray-700 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg"></div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                AIClone
              </span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <Button variant="ghost" onClick={() => $w.utils.navigateTo({
              pageId: 'home',
              params: {}
            })} className="text-white hover:text-blue-400">
                首页
              </Button>
              <Button variant="ghost" onClick={() => $w.utils.navigateTo({
              pageId: 'profile',
              params: {}
            })} className="text-white hover:text-blue-400">
                个人中心
              </Button>
              <Button variant="ghost" onClick={() => $w.utils.navigateTo({
              pageId: 'works',
              params: {}
            })} className="text-white hover:text-blue-400">
                作品管理
              </Button>
              <Button variant="ghost" onClick={() => $w.utils.navigateTo({
              pageId: 'gallery',
              params: {}
            })} className="text-white hover:text-blue-400">
                作品展示
              </Button>
              <Button variant="ghost" className="text-blue-400">会员中心</Button>
            </div>

            <div className="flex items-center space-x-4">
              {user.isLoggedIn ? <>
                  <div className="flex items-center space-x-2">
                    <Coins className="w-5 h-5 text-yellow-400" />
                    <span className="text-sm text-yellow-400">{user.points} 点</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <User className="w-5 h-5 text-gray-400" />
                    <span className="text-sm">{user.name}</span>
                  </div>
                  <Button variant="ghost" onClick={handleLogout} className="text-white hover:bg-gray-700">
                    退出
                  </Button>
                </> : <>
                  <Dialog open={isLoginOpen} onOpenChange={setIsLoginOpen}>
                    <DialogTrigger asChild>
                      <Button variant="ghost" className="text-white hover:bg-gray-700">
                        <LogIn className="w-4 h-4 mr-2" />
                        登录
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-gray-800 border-gray-700 text-white">
                      <DialogHeader>
                        <DialogTitle className="flex items-center">
                          <LogIn className="w-5 h-5 mr-2 text-blue-400" />
                          用户登录
                        </DialogTitle>
                        <DialogDescription className="text-gray-400">
                          请输入您的账号信息登录系统
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-300">邮箱地址</label>
                          <Input type="email" placeholder="请输入邮箱" value={email} onChange={e => setEmail(e.target.value)} className="bg-gray-700 border-gray-600 text-white" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-300">密码</label>
                          <Input type="password" placeholder="请输入密码" value={password} onChange={e => setPassword(e.target.value)} className="bg-gray-700 border-gray-600 text-white" />
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <Button variant="outline" onClick={() => {
                      setIsLoginOpen(false);
                      setIsRegisterOpen(true);
                    }} className="border-gray-600 text-gray-300">
                          注册账号
                        </Button>
                        <Button onClick={handleLogin} className="bg-blue-600 hover:bg-blue-700">
                          登录
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>

                  <Dialog open={isRegisterOpen} onOpenChange={setIsRegisterOpen}>
                    <DialogTrigger asChild>
                      <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                        <UserPlus className="w-4 h-4 mr-2" />
                        注册
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-gray-800 border-gray-700 text-white">
                      <DialogHeader>
                        <DialogTitle className="flex items-center">
                          <UserPlus className="w-5 h-5 mr-2 text-purple-400" />
                          用户注册
                        </DialogTitle>
                        <DialogDescription className="text-gray-400">
                          创建您的AIClone账号
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-300">邮箱地址</label>
                          <Input type="email" placeholder="请输入邮箱" value={email} onChange={e => setEmail(e.target.value)} className="bg-gray-700 border-gray-600 text-white" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-300">密码</label>
                          <Input type="password" placeholder="请输入密码" value={password} onChange={e => setPassword(e.target.value)} className="bg-gray-700 border-gray-600 text-white" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-300">确认密码</label>
                          <Input type="password" placeholder="请再次输入密码" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} className="bg-gray-700 border-gray-600 text-white" />
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <Button variant="outline" onClick={() => {
                      setIsRegisterOpen(false);
                      setIsLoginOpen(true);
                    }} className="border-gray-600 text-gray-300">
                          已有账号
                        </Button>
                        <Button onClick={handleRegister} className="bg-purple-600 hover:bg-purple-700">
                          注册
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </>}
            </div>
          </div>
        </div>
      </nav>

      {/* 主内容区 */}
      <div className="pt-24 pb-12 px-6">
        <div className="container mx-auto">
          {/* 页面标题 */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              会员中心
            </h1>
            <p className="text-gray-400 text-lg">
              管理您的会员订阅和点数余额
            </p>
          </div>

          {!user.isLoggedIn ? <Card className="bg-gray-800/50 border-gray-700">
              <CardContent className="p-12 text-center">
                <div className="text-gray-400 mb-4">请登录后查看会员信息</div>
                <Button onClick={() => setIsLoginOpen(true)} className="bg-blue-600 hover:bg-blue-700">
                  <LogIn className="w-4 h-4 mr-2" />
                  立即登录
                </Button>
              </CardContent>
            </Card> : <>
              {/* 用户信息卡片 */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card className="bg-blue-600/20 border-blue-500/30">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-2xl font-bold text-blue-400">{user.points}</div>
                        <div className="text-sm text-gray-300">可用点数</div>
                      </div>
                      <Coins className="w-8 h-8 text-blue-400" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-purple-600/20 border-purple-500/30">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-lg font-bold text-purple-400">
                          {user.subscription ? user.subscription.name : '无订阅'}
                        </div>
                        <div className="text-sm text-gray-300">当前套餐</div>
                      </div>
                      {user.subscription ? <Crown className="w-8 h-8 text-purple-400" /> : <XCircle className="w-8 h-8 text-gray-400" />}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-green-600/20 border-green-500/30">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-lg font-bold text-green-400">
                          {user.subscription ? '有效' : '未激活'}
                        </div>
                        <div className="text-sm text-gray-300">会员状态</div>
                      </div>
                      {user.subscription ? <CheckCircle className="w-8 h-8 text-green-400" /> : <XCircle className="w-8 h-8 text-gray-400" />}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* 功能选项卡 */}
              <Tabs defaultValue="subscription" value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid grid-cols-4 mb-8 bg-gray-800/50 p-1 rounded-lg">
                  <TabsTrigger value="subscription" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                    <CreditCard className="w-4 h-4 mr-2" />
                    订阅管理
                  </TabsTrigger>
                  <TabsTrigger value="points" className="data-[state=active]:bg-yellow-600 data-[state=active]:text-white">
                    <Coins className="w-4 h-4 mr-2" />
                    点数管理
                  </TabsTrigger>
                  <TabsTrigger value="purchase" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    点数购买
                  </TabsTrigger>
                  <TabsTrigger value="records" className="data-[state=active]:bg-gray-600 data-[state=active]:text-white">
                    <History className="w-4 h-4 mr-2" />
                    消费记录
                  </TabsTrigger>
                </TabsList>

                {/* 订阅管理 */}
                <TabsContent value="subscription">
                  <Card className="bg-gray-800/50 border-gray-700">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <CreditCard className="w-6 h-6 mr-2 text-blue-400" />
                        订阅套餐
                      </CardTitle>
                      <CardDescription className="text-gray-400">
                        选择适合您的会员套餐，享受更多AI创作功能
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {subscriptionPlans.map(plan => <Card key={plan.id} className={`bg-gray-800 border-2 ${plan.recommended ? 'border-purple-500 scale-105' : 'border-gray-700'} transition-all duration-300 hover:border-blue-500`}>
                            <CardHeader>
                              <div className="flex justify-between items-start mb-4">
                                <CardTitle className="text-xl">{plan.name}</CardTitle>
                                {plan.recommended && <Badge className="bg-purple-600">推荐</Badge>}
                              </div>
                              <div className="text-3xl font-bold text-blue-400">
                                ¥{plan.price}
                                <span className="text-sm text-gray-400">/{plan.period}</span>
                              </div>
                            </CardHeader>
                            <CardContent>
                              <div className="space-y-3 mb-6">
                                {plan.features.map((feature, index) => <div key={index} className="flex items-center text-sm text-gray-300">
                                    <CheckCircle className="w-4 h-4 mr-2 text-green-400" />
                                    {feature}
                                  </div>)}
                              </div>
                              <Button onClick={() => handleSubscribe(plan)} className={`w-full ${plan.recommended ? 'bg-purple-600 hover:bg-purple-700' : 'bg-blue-600 hover:bg-blue-700'}`}>
                                {user.subscription?.id === plan.id ? '续费订阅' : '立即订阅'}
                              </Button>
                            </CardContent>
                          </Card>)}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* 点数管理 */}
                <TabsContent value="points">
                  <Card className="bg-gray-800/50 border-gray-700">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Coins className="w-6 h-6 mr-2 text-yellow-400" />
                        点数管理
                      </CardTitle>
                      <CardDescription className="text-gray-400">
                        管理您的创作点数，用于AI功能的使用
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <Card className="bg-gray-700/50 border-gray-600">
                          <CardContent className="p-6">
                            <div className="text-center">
                              <div className="text-3xl font-bold text-yellow-400 mb-2">{user.points}</div>
                              <div className="text-sm text-gray-300">当前点数</div>
                            </div>
                          </CardContent>
                        </Card>
                        <Card className="bg-gray-700/50 border-gray-600">
                          <CardContent className="p-6">
                            <div className="text-center">
                              <div className="text-lg font-bold text-blue-400 mb-2">
                                {user.subscription ? `${user.subscription.points}点/月` : '无订阅'}
                              </div>
                              <div className="text-sm text-gray-300">每月赠送</div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <Button onClick={() => handleConsumePoints(50, '语音克隆生成')} className="bg-blue-600 hover:bg-blue-700">
                          测试消费50点
                        </Button>
                        <Button onClick={() => handleConsumePoints(30, '形象生成')} className="bg-purple-600 hover:bg-purple-700">
                          测试消费30点
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* 新增：点数购买 */}
                <TabsContent value="purchase">
                  <Card className="bg-gray-800/50 border-gray-700">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <ShoppingCart className="w-6 h-6 mr-2 text-green-400" />
                        算力点数包
                      </CardTitle>
                      <CardDescription className="text-gray-400">
                        灵活购买算力点数，无需订阅套餐即可使用
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {pointPackages.map(packageData => <Card key={packageData.id} className={`bg-gray-800 border-2 ${packageData.popular ? 'border-green-500 scale-105' : 'border-gray-700'} transition-all duration-300 hover:border-green-500`}>
                            <CardHeader>
                              <div className="flex justify-between items-start mb-4">
                                <CardTitle className="text-xl">{packageData.name}</CardTitle>
                                {packageData.popular && <Badge className="bg-green-600">热门</Badge>}
                              </div>
                              <div className="text-3xl font-bold bg-gradient-to-r ${packageData.color} bg-clip-text text-transparent">
                                ¥{packageData.price}
                              </div>
                              <div className="text-sm text-gray-400">
                                <span className="line-through">¥{packageData.originalPrice}</span>
                                <Badge className="ml-2 bg-red-600">{packageData.discount}</Badge>
                              </div>
                            </CardHeader>
                            <CardContent>
                              <div className="space-y-3 mb-6">
                                <div className="flex items-center text-sm text-gray-300">
                                  <Package className="w-4 h-4 mr-2 text-blue-400" />
                                  <span className="font-bold text-blue-400">{packageData.points}</span> 点数
                                </div>
                                <div className="flex items-center text-sm text-gray-300">
                                  <Zap className="w-4 h-4 mr-2 text-yellow-400" />
                                  即时到账
                                </div>
                                <div className="flex items-center text-sm text-gray-300">
                                  <CheckCircle className="w-4 h-4 mr-2 text-green-400" />
                                  永久有效
                                </div>
                              </div>
                              <Button onClick={() => handlePurchasePoints(packageData)} className={`w-full bg-gradient-to-r ${packageData.color} hover:opacity-90`}>
                                立即购买
                              </Button>
                            </CardContent>
                          </Card>)}
                      </div>

                      <div className="mt-8 p-4 bg-gray-700/50 rounded-lg">
                        <h3 className="text-lg font-semibold mb-2 text-gray-200">购买说明</h3>
                        <ul className="text-sm text-gray-400 space-y-1">
                          <li>• 购买的点数永久有效，不会过期</li>
                          <li>• 点数可用于所有AI功能，包括语音克隆、形象生成等</li>
                          <li>• 购买成功后点数立即到账，可立即使用</li>
                          <li>• 支持多种支付方式，包括微信、支付宝、银行卡</li>
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* 消费记录 */}
                <TabsContent value="records">
                  <Card className="bg-gray-800/50 border-gray-700">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <History className="w-6 h-6 mr-2 text-gray-400" />
                        消费记录
                      </CardTitle>
                      <CardDescription className="text-gray-400">
                        查看您的点数消费和充值记录
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>类型</TableHead>
                            <TableHead>金额</TableHead>
                            <TableHead>描述</TableHead>
                            <TableHead>时间</TableHead>
                            <TableHead>余额</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {pointRecords.map(record => <TableRow key={record.id}>
                              <TableCell>
                                <Badge variant={record.type === 'recharge' ? 'default' : 'secondary'} className={record.type === 'recharge' ? 'bg-green-600' : 'bg-red-600'}>
                                  {record.type === 'recharge' ? '充值' : '消费'}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center">
                                  {record.type === 'recharge' ? <ArrowUpRight className="w-4 h-4 text-green-400 mr-1" /> : <ArrowDownRight className="w-4 h-4 text-red-400 mr-1" />}
                                  <span className={record.type === 'recharge' ? 'text-green-400' : 'text-red-400'}>
                                    {record.amount > 0 ? '+' : ''}{record.amount}
                                  </span>
                                </div>
                              </TableCell>
                              <TableCell className="text-gray-300">{record.description}</TableCell>
                              <TableCell className="text-gray-400">{record.date}</TableCell>
                              <TableCell className="text-yellow-400">{record.balance}</TableCell>
                            </TableRow>)}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </>}
        </div>
      </div>
    </div>;
}