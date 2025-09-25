// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Badge, RadioGroup, RadioGroupItem, Label, useToast } from '@/components/ui';
// @ts-ignore;
import { Check, X, Loader2, CreditCard, Smartphone, Building2, Crown, Star, Zap, Shield } from 'lucide-react';

const plans = [{
  id: 'basic',
  name: '基础版',
  price: 29,
  originalPrice: 39,
  period: '月',
  features: ['每月50次生成', '720P视频质量', '基础模板库', '标准客服支持', '7天历史记录'],
  popular: false,
  color: 'from-blue-500 to-blue-600'
}, {
  id: 'pro',
  name: '专业版',
  price: 79,
  originalPrice: 99,
  period: '月',
  features: ['每月200次生成', '1080P视频质量', '高级模板库', '优先客服支持', '30天历史记录', '批量处理功能', 'API接口访问'],
  popular: true,
  color: 'from-purple-500 to-purple-600'
}, {
  id: 'enterprise',
  name: '企业版',
  price: 199,
  originalPrice: 299,
  period: '月',
  features: ['无限次生成', '4K视频质量', '全部模板库', '专属客服经理', '永久历史记录', '团队协作功能', 'API接口访问', '自定义品牌', 'SLA保障'],
  popular: false,
  color: 'from-yellow-500 to-orange-500'
}];
const paymentMethods = [{
  id: 'wechat',
  name: '微信支付',
  icon: Smartphone,
  color: 'bg-green-500 hover:bg-green-600',
  description: '使用微信扫码支付'
}, {
  id: 'alipay',
  name: '支付宝',
  icon: Smartphone,
  color: 'bg-blue-500 hover:bg-blue-600',
  description: '使用支付宝扫码支付'
}, {
  id: 'unionpay',
  name: '银联支付',
  icon: CreditCard,
  color: 'bg-red-500 hover:bg-red-600',
  description: '使用银行卡支付'
}];
export default function SubscriptionPage(props) {
  const {
    $w,
    style
  } = props;
  const {
    toast
  } = useToast();

  // 从URL参数获取默认选中的套餐
  const defaultPlan = props.$w.page.dataset.params?.plan || 'pro';
  const [selectedPlan, setSelectedPlan] = useState(defaultPlan);
  const [selectedPayment, setSelectedPayment] = useState('wechat');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStep, setPaymentStep] = useState('select'); // select, processing, success, failed

  // 当URL参数变化时更新选中的套餐
  useEffect(() => {
    const planFromUrl = props.$w.page.dataset.params?.plan;
    if (planFromUrl && plans.find(p => p.id === planFromUrl)) {
      setSelectedPlan(planFromUrl);
    }
  }, [props.$w.page.dataset.params?.plan]);
  const selectedPlanData = plans.find(p => p.id === selectedPlan);
  const handlePayment = async () => {
    setIsProcessing(true);
    setPaymentStep('processing');

    // 模拟支付流程
    setTimeout(() => {
      const success = Math.random() > 0.2; // 80%成功率
      if (success) {
        setPaymentStep('success');
        toast({
          title: "支付成功",
          description: `已成功订阅${selectedPlanData.name}套餐`,
          variant: "success"
        });

        // 模拟跳转到成功页面
        setTimeout(() => {
          $w.utils.navigateTo({
            pageId: 'dashboard'
          });
        }, 2000);
      } else {
        setPaymentStep('failed');
        toast({
          title: "支付失败",
          description: "支付过程中出现问题，请重试",
          variant: "destructive"
        });
      }
      setIsProcessing(false);
    }, 3000);
  };
  const simulatePayment = method => {
    const paymentWindows = {
      wechat: {
        title: '微信支付',
        content: '请使用微信扫描二维码完成支付',
        qrColor: 'bg-green-500'
      },
      alipay: {
        title: '支付宝支付',
        content: '请使用支付宝扫描二维码完成支付',
        qrColor: 'bg-blue-500'
      },
      unionpay: {
        title: '银联支付',
        content: '正在跳转到银联支付页面...',
        qrColor: 'bg-red-500'
      }
    };
    return paymentWindows[method] || paymentWindows.wechat;
  };
  if (paymentStep === 'processing') {
    const paymentInfo = simulatePayment(selectedPayment);
    return <div style={style} className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center p-4">
        <Card className="bg-gray-800/50 border-purple-800/30 backdrop-blur-sm max-w-md w-full">
          <CardHeader className="text-center">
            <CardTitle className="text-white text-2xl mb-2">{paymentInfo.title}</CardTitle>
            <CardDescription className="text-gray-300">
              {paymentInfo.content}
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <div className={`w-48 h-48 ${paymentInfo.qrColor} rounded-lg mx-auto mb-4 flex items-center justify-center`}>
              <div className="w-40 h-40 bg-white rounded flex items-center justify-center">
                <Loader2 className="w-16 h-16 text-gray-600 animate-spin" />
              </div>
            </div>
            <p className="text-gray-400 mb-4">正在处理支付...</p>
            <div className="flex justify-center space-x-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{
              animationDelay: '0.1s'
            }}></div>
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{
              animationDelay: '0.2s'
            }}></div>
            </div>
          </CardContent>
        </Card>
      </div>;
  }
  if (paymentStep === 'success') {
    return <div style={style} className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center p-4">
        <Card className="bg-gray-800/50 border-purple-800/30 backdrop-blur-sm max-w-md w-full">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-white text-2xl mb-2">支付成功</CardTitle>
            <CardDescription className="text-gray-300">
              恭喜您成功订阅{selectedPlanData.name}套餐
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-gray-400 mb-4">正在为您激活套餐...</p>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div className="bg-green-500 h-2 rounded-full animate-pulse" style={{
              width: '100%'
            }}></div>
            </div>
          </CardContent>
        </Card>
      </div>;
  }
  return <div style={style} className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">选择适合您的套餐</h1>
          <p className="text-xl text-purple-300">解锁更多高级功能，提升创作体验</p>
        </div>

        {/* 套餐选择 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {plans.map(plan => <Card key={plan.id} className={`bg-gray-800/50 border-purple-800/30 backdrop-blur-sm transition-all duration-300 hover:scale-105 ${selectedPlan === plan.id ? 'ring-2 ring-purple-500' : ''}`}>
              {plan.popular && <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-purple-600 text-white px-3 py-1">
                    <Crown className="w-4 h-4 mr-1" />
                    最受欢迎
                  </Badge>
                </div>}
              <CardHeader className="text-center">
                <CardTitle className="text-2xl text-white mb-2">{plan.name}</CardTitle>
                <div className="flex items-center justify-center space-x-2">
                  <span className="text-4xl font-bold text-white">¥{plan.price}</span>
                  <span className="text-gray-400">/{plan.period}</span>
                  {plan.originalPrice && <span className="text-gray-500 line-through">¥{plan.originalPrice}</span>}
                </div>
                {plan.originalPrice && <Badge className="bg-red-500 text-white mt-2">
                    限时{Math.round((1 - plan.price / plan.originalPrice) * 100)}%优惠
                  </Badge>}
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => <li key={index} className="flex items-center text-gray-300">
                      <Check className="w-5 h-5 text-green-400 mr-2 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>)}
                </ul>
                <Button onClick={() => setSelectedPlan(plan.id)} className={`w-full mt-6 bg-gradient-to-r ${plan.color} text-white hover:opacity-90`} variant={selectedPlan === plan.id ? "default" : "outline"}>
                  {selectedPlan === plan.id ? '已选择' : '选择套餐'}
                </Button>
              </CardContent>
            </Card>)}
        </div>

        {/* 支付方式选择 */}
        <Card className="bg-gray-800/50 border-purple-800/30 backdrop-blur-sm max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-white text-xl">选择支付方式</CardTitle>
            <CardDescription className="text-gray-300">
              选择您偏好的支付方式完成订阅
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RadioGroup value={selectedPayment} onValueChange={setSelectedPayment} className="space-y-4">
              {paymentMethods.map(method => <div key={method.id} className="flex items-center space-x-3 p-4 border border-gray-600 rounded-lg hover:border-purple-500 transition-colors">
                  <RadioGroupItem value={method.id} id={method.id} />
                  <Label htmlFor={method.id} className="flex-1 cursor-pointer">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${method.color}`}>
                        <method.icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-white font-medium">{method.name}</p>
                        <p className="text-gray-400 text-sm">{method.description}</p>
                      </div>
                    </div>
                  </Label>
                </div>)}
            </RadioGroup>

            <div className="mt-6 p-4 bg-gray-700/50 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-300">已选择套餐：</span>
                <span className="text-white font-medium">{selectedPlanData.name}</span>
              </div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-300">应付金额：</span>
                <span className="text-2xl font-bold text-purple-400">¥{selectedPlanData.price}/{selectedPlanData.period}</span>
              </div>
              
              <Button onClick={handlePayment} disabled={isProcessing} className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white hover:from-purple-700 hover:to-purple-800">
                {isProcessing ? <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    处理中...
                  </> : <>
                    <Shield className="w-4 h-4 mr-2" />
                    确认支付 ¥{selectedPlanData.price}
                  </>}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* 安全提示 */}
        <div className="text-center mt-8">
          <p className="text-gray-400 text-sm">
            <Shield className="w-4 h-4 inline mr-1" />
            支付过程采用SSL加密，保障您的支付安全
          </p>
        </div>
      </div>
    </div>;
}