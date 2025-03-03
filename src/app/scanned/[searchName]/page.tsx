'use client';

import { use } from 'react';
import type { Book } from '@/lib/types';
import { useScan } from '@/lib/scan';
import ScanResultTable from './ScanResultTable';

export default function ScanResultPage({
  params,
}: {
  params: Promise<{ searchName: string }>;
}) {
  const { searchName } = use(params);
  const decodedName = decodeURIComponent(searchName);
  const books: Book[] = [];

  const tikiQuery = useScan('Tiki', decodedName);
  if (tikiQuery.data) books.push(...tikiQuery.data.results);

  const fahasaQuery = useScan('Fahasa', decodedName);
  if (fahasaQuery.data) books.push(...fahasaQuery.data.results);

  const total = books?.reduce((sum, b) => sum + (b.sold || 0), 0) || 0;
  const isFetching = tikiQuery.isFetching || fahasaQuery.isFetching;

  return (
    <div className="my-8">
      <div className="mb-8">
        <div className="text-sm">Kết quả tìm kiếm</div>
        <h1 className="text-2xl mb-4 font-bold">{decodedName}</h1>
        <div>
          Tổng doanh số: <strong>{total}</strong>
        </div>
      </div>

      <ScanResultTable books={books} isFetching={isFetching} />
    </div>
  );
}
