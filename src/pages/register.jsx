// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Input, Label, Checkbox } from '@/components/ui';
// @ts-ignore;
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react';

export default function RegisterPage(props) {
  const {
    $w,
    style
  } = props;
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false
  });
  const handleRegister = async () => {
    if (formData.password !== formData.confirmPassword) {
      alert('两次输入的密码不一致');
      return;
    }
    if (!formData.agreeTerms) {
      alert('请同意服务条款');
      return;
    }
    try {
      // 模拟注册逻辑
      console.log('注册信息:', formData);
      // 注册成功后跳转到dashboard
      $w.utils.navigateTo({
        pageId: 'dashboard'
      });
    } catch (error) {
      console.error('注册失败:', error);
    }
  };
  return <div style={style} className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="bg-gray-800/50 border-purple-800/30 backdrop-blur-sm">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-white">创建账户</CardTitle>
            <CardDescription className="text-gray-300">
              开始您的AI数字人创作之旅
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={e => {
            e.preventDefault();
            handleRegister();
          }} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-gray-300">用户名</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input id="name" type="text" placeholder="您的用户名" className="pl-10 bg-gray-700 border-gray-600 text-white placeholder-gray-400" value={formData.name} onChange={e => setFormData({
                  ...formData,
                  name: e.target.value
                })} required />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-300">邮箱地址</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input id="email" type="email" placeholder="your@email.com" className="pl-10 bg-gray-700 border-gray-600 text-white placeholder-gray-400" value={formData.email} onChange={e => setFormData({
                  ...formData,
                  email: e.target.value
                })} required />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-300">密码</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input id="password" type={showPassword ? "text" : "password"} placeholder="••••••••" className="pl-10 pr-10 bg-gray-700 border-gray-600 text-white placeholder-gray-400" value={formData.password} onChange={e => setFormData({
                  ...formData,
                  password: e.target.value
                })} required />
                  <button type="button" className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-gray-300">确认密码</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input id="confirmPassword" type={showConfirmPassword ? "text" : "password"} placeholder="••••••••" className="pl-10 pr-10 bg-gray-700 border-gray-600 text-white placeholder-gray-400" value={formData.confirmPassword} onChange={e => setFormData({
                  ...formData,
                  confirmPassword: e.target.value
                })} required />
                  <button type="button" className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="terms" checked={formData.agreeTerms} onCheckedChange={checked => setFormData({
                ...formData,
                agreeTerms: checked
              })} />
                <Label htmlFor="terms" className="text-sm text-gray-300">
                  我同意{' '}
                  <Button variant="link" className="text-purple-400 hover:text-purple-300 p-0 h-auto">
                    服务条款
                  </Button>{' '}
                  和{' '}
                  <Button variant="link" className="text-purple-400 hover:text-purple-300 p-0 h-auto">
                    隐私政策
                  </Button>
                </Label>
              </div>

              <Button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                注册账户
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-400">
                已有账户？{' '}
                <Button variant="link" className="text-purple-400 hover:text-purple-300" onClick={() => $w.utils.navigateTo({
                pageId: 'login'
              })}>
                  立即登录
                </Button>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>;
}