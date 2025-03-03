'use client';

import { ReactNode, use } from 'react';
import type { Book } from '@/lib/types';
import { useScan } from '@/lib/scan';
import { Badge } from '@/components/ui/badge';
import { Spinner } from '@/components/ui/spinner';
import ScanResultTable from './ScanResultTable';

function PlatformChip({
  label,
  isFetching,
  count,
  selected,
}: {
  label: ReactNode;
  isFetching: boolean;
  count?: number;
  selected?: boolean;
}) {
  return (
    <div className="flex items-center">
      <Badge
        variant={selected ? 'default' : 'outline'}
        className="space-x-2 text-sm cursor-pointer"
      >
        <span>{label}</span>
        {isFetching ? <Spinner /> : <span className="font-bold">{count}</span>}
      </Badge>
    </div>
  );
}

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

      <div className="my-6 flex gap-3">
        <PlatformChip
          selected
          label="Tất cả"
          isFetching={isFetching}
          count={total}
        />
        <PlatformChip
          label="Tiki"
          isFetching={tikiQuery.isFetching}
          count={tikiQuery.data?.results.length}
        />
        <PlatformChip
          label="Fahasa"
          isFetching={fahasaQuery.isFetching}
          count={fahasaQuery.data?.results.length}
        />
      </div>

      <ScanResultTable books={books} isFetching={isFetching} />
    </div>
  );
}
