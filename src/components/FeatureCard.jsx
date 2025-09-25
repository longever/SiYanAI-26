// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';

export function FeatureCard({
  icon,
  title,
  description
}) {
  return <Card className="bg-gray-800/50 border-purple-800/30 backdrop-blur-sm hover:bg-gray-800/70 transition-all duration-300 hover:scale-105">
      <CardHeader>
        <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center mb-4">
          <div className="text-white">
            {icon}
          </div>
        </div>
        <CardTitle className="text-xl text-white">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-300">
          {description}
        </p>
      </CardContent>
    </Card>;
}