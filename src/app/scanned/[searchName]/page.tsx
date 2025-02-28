'use client';

import { use } from 'react';
import { useQuery } from 'react-query';
import { Book } from '@/lib/types';
import ScanResult from './ScanResult';

export default function ScanResultPage({
  params,
}: {
  params: Promise<{ searchName: string }>;
}) {
  const { searchName } = use(params);
  const decodedName = decodeURIComponent(searchName);
  const { data: books, isFetching } = useQuery<Book[]>({
    queryKey: ['scan', decodedName],
    queryFn: () =>
      fetch(`/api/scan-tiki/${decodedName}`).then((res) => res.json()),
    retry: false,
    staleTime: 3600000,
  });
  const total = books?.reduce((sum, b) => sum + (b.sold || 0), 0) || 0;

  return (
    <div className="my-8">
      <div className="mb-8">
        <div className="text-sm">Kết quả tìm kiếm</div>
        <h1 className="text-2xl mb-4 font-bold">{decodedName}</h1>
        <div>
          Tổng doanh số: <strong>{total}</strong>
        </div>
      </div>

      <ScanResult books={books} isFetching={isFetching} />
    </div>
  );
}
