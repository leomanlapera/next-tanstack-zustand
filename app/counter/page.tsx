'use client';

import { Button } from '@/components/ui/button';
import { useCounterStore } from '@/store/slices/counter-slice';
import { Minus, Plus } from 'lucide-react';

export default function Counter() {
  const { count, increment, decrement } = useCounterStore();
  return (
    <div className="mx-auto max-w-md space-y-2 p-8 text-center">
      <h1 className="font-bold">Counter: {count}</h1>
      <div className="space-x-2">
        <Button onClick={decrement} size="sm">
          <Minus />
        </Button>
        <Button onClick={increment} size="sm">
          <Plus />
        </Button>
      </div>
    </div>
  );
}
