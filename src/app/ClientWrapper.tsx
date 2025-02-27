'use client';

import { QueryClientProvider } from 'react-query';
import { ReactNode } from 'react';
import queryClient from '@/lib/queryClient';

export default function ClientWrapper({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
