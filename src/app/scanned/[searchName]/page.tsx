'use client';

import { ReactNode, use } from 'react';
import type { Book, Warning } from '@/lib/types';
import { useScan } from '@/lib/scan';
import { Badge } from '@/components/ui/badge';
import { Spinner } from '@/components/ui/spinner';
import { Button } from '@/components/ui/button';
import { TriangleAlert } from 'lucide-react';
import { DialogHeader } from '@/components/ui/dialog';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { toast } from 'sonner';
import ScanResultTable from './ScanResultTable';

function WarningDialog({ data }: { data: object }) {
  const formattedJson = JSON.stringify(data, null, 2);
  return (
    <Dialog>
      <DialogTrigger>
        <TriangleAlert className="h-4 w-4 ml-1" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Warnings</DialogTitle>
          <div className="flex items-center justify-between">
            <DialogDescription>Ấn copy rồi gửi cho Hiệp</DialogDescription>
            <Button
              onClick={() => {
                navigator.clipboard.writeText(formattedJson).then(() => {
                  toast.success('Đã copy!');
                });
              }}
            >
              Copy
            </Button>
          </div>
        </DialogHeader>
        <pre className="max-h-96 overflow-y-scroll">
          <code>{formattedJson}</code>
        </pre>
      </DialogContent>
    </Dialog>
  );
}

function PlatformChip({
  label,
  isFetching,
  count,
  selected,
  warnings,
}: {
  label: ReactNode;
  isFetching: boolean;
  count?: number;
  selected?: boolean;
  warnings?: Warning[];
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
      {warnings && warnings.length > 0 && (
        <WarningDialog data={{ platform: label, warnings }} />
      )}
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

      <div className="my-6 flex gap-4">
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
          warnings={tikiQuery.data?.warnings}
        />
        <PlatformChip
          label="Fahasa"
          isFetching={fahasaQuery.isFetching}
          count={fahasaQuery.data?.results.length}
          warnings={fahasaQuery.data?.warnings}
        />
      </div>

      <ScanResultTable books={books} isFetching={isFetching} />
    </div>
  );
}
