// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui';

export function SystemSelector({
  selectedSystem,
  onChange
}) {
  return <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-300 mb-2">AI系统</label>
      <Select value={selectedSystem} onValueChange={onChange}>
        <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="wan2_2_s2v">万相2.2</SelectItem>
          <SelectItem value="emo_v1">悦动人像</SelectItem>
          <SelectItem value="keling">可灵</SelectItem>
          <SelectItem value="guiji">硅基</SelectItem>
        </SelectContent>
      </Select>
    </div>;
}