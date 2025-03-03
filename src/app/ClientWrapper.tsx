'use client';

import { QueryClientProvider } from 'react-query';
import { ReactNode } from 'react';
import queryClient from '@/lib/queryClient';
import { TooltipProvider } from '@/components/ui/tooltip';

export default function ClientWrapper({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider delayDuration={200}>{children}</TooltipProvider>
    </QueryClientProvider>
  );
}
