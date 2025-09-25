// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Card, CardContent, Button, Badge } from '@/components/ui';
// @ts-ignore;
import { Check } from 'lucide-react';

export function SystemSelector({
  items,
  selectedId,
  onSelect,
  type
}) {
  return <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {items.map(item => <Card key={item.id} className={`bg-gray-700/50 border-2 ${selectedId === item.id ? 'border-purple-500' : 'border-gray-600'} cursor-pointer transition-all hover:border-purple-400`} onClick={() => onSelect(item.id)}>
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-semibold text-white">{item.name}</h4>
                <div className="flex gap-2 mt-1">
                  <Badge variant="outline" className="text-xs">
                    {type === 'voice' ? item.gender : item.category}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {type === 'voice' ? item.style : item.description}
                  </Badge>
                </div>
                {type === 'voice' && <p className="text-sm text-gray-400 mt-2">{item.preview}</p>}
              </div>
              {selectedId === item.id && <Check className="w-5 h-5 text-purple-400" />}
            </div>
            {type === 'image' && <div className="mt-3">
                <img src={item.image} alt={item.name} className="w-full h-32 object-cover rounded-lg" />
              </div>}
            <Button size="sm" variant="outline" className="mt-3 w-full border-purple-600 text-purple-300">
              {type === 'voice' ? '预览声音' : '预览形象'}
            </Button>
          </CardContent>
        </Card>)}
    </div>;
}