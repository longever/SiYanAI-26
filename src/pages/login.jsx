// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Input, Label, Checkbox } from '@/components/ui';
// @ts-ignore;
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';

export default function LoginPage(props) {
  const {
    $w,
    style
  } = props;
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false
  });
  const handleLogin = async () => {
    try {
      // 模拟登录逻辑
      console.log('登录信息:', formData);
      // 登录成功后跳转到dashboard
      $w.utils.navigateTo({
        pageId: 'dashboard'
      });
    } catch (error) {
      console.error('登录失败:', error);
    }
  };
  return <div style={style} className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="bg-gray-800/50 border-purple-800/30 backdrop-blur-sm">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-white">欢迎回来</CardTitle>
            <CardDescription className="text-gray-300">
              登录您的AI数字人创作账户
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={e => {
            e.preventDefault();
            handleLogin();
          }} className="space-y-4">
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

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox id="remember" checked={formData.remember} onCheckedChange={checked => setFormData({
                  ...formData,
                  remember: checked
                })} />
                  <Label htmlFor="remember" className="text-sm text-gray-300">记住我</Label>
                </div>
                <Button variant="link" className="text-sm text-purple-400 hover:text-purple-300">
                  忘记密码？
                </Button>
              </div>

              <Button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                登录
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-400">
                还没有账户？{' '}
                <Button variant="link" className="text-purple-400 hover:text-purple-300" onClick={() => $w.utils.navigateTo({
                pageId: 'register'
              })}>
                  立即注册
                </Button>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>;
}