'use client';

import { use } from 'react';
import { atom, useAtom, useAtomValue } from 'jotai';
import type { Book, Platform, Warning } from '@/lib/types';
import { useScan } from '@/lib/scan';
import { Badge } from '@/components/ui/badge';
import { Spinner } from '@/components/ui/spinner';
import { Button } from '@/components/ui/button';
import { TriangleAlert } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { DialogHeader } from '@/components/ui/dialog';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import ScanResultTable from './ScanResultTable';

const filterAtom = atom<Platform | null>(null);

function WarningDialog({ data }: { data: object }) {
  const formattedJson = JSON.stringify(data, null, 2);
  return (
    <Dialog>
      <DialogTrigger>
        <Tooltip>
          <TooltipTrigger asChild>
            <TriangleAlert className="h-4 w-4 ml-1" />
          </TooltipTrigger>
          <TooltipContent side="bottom" sideOffset={10}>
            Click để mở
          </TooltipContent>
        </Tooltip>
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
  platform,
  isFetching,
  count,
  warnings,
}: {
  platform: Platform | null;
  isFetching: boolean;
  count?: number;
  warnings?: Warning[];
}) {
  const [filter, setFilter] = useAtom(filterAtom);
  const selected = filter === platform;
  return (
    <div className="flex items-center">
      <Badge
        variant={selected ? 'default' : 'outline'}
        className={cn(
          'space-x-2 text-sm cursor-pointer',
          selected ? 'hover:bg-primary' : 'hover:bg-primary/10'
        )}
        onClick={() => {
          setFilter(platform);
        }}
      >
        <span>{platform || 'Tất cả'}</span>
        {isFetching ? <Spinner /> : <span className="font-bold">{count}</span>}
      </Badge>
      {warnings && warnings.length > 0 && (
        <WarningDialog data={{ platform, warnings }} />
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

  const tikiQuery = useScan('Tiki', decodedName);
  const fahasaQuery = useScan('Fahasa', decodedName);

  const filter = useAtomValue(filterAtom);
  const books: Book[] = [];
  if (tikiQuery.data && (filter === null || filter === 'Tiki')) {
    books.push(...tikiQuery.data.results);
  }
  if (fahasaQuery.data && (filter === null || filter === 'Fahasa')) {
    books.push(...fahasaQuery.data.results);
  }

  const totalSales = books?.reduce((sum, b) => sum + (b.sold || 0), 0) || 0;
  const isFetching = tikiQuery.isFetching || fahasaQuery.isFetching;
  const booksCount =
    (tikiQuery.data?.results.length || 0) +
    (fahasaQuery.data?.results.length || 0);

  return (
    <div className="my-8">
      <div className="mb-8">
        <div className="text-sm">Kết quả tìm kiếm</div>
        <h1 className="text-2xl mb-4 font-bold">{decodedName}</h1>
        <div>
          Tổng doanh số{filter !== null && ` (${filter})`}:{' '}
          <strong>{totalSales}</strong>
        </div>
      </div>

      <div className="my-6 flex gap-4">
        <PlatformChip
          platform={null}
          isFetching={isFetching}
          count={booksCount}
        />
        <PlatformChip
          platform="Tiki"
          isFetching={tikiQuery.isFetching}
          count={tikiQuery.data?.results.length}
          warnings={tikiQuery.data?.warnings}
        />
        <PlatformChip
          platform="Fahasa"
          isFetching={fahasaQuery.isFetching}
          count={fahasaQuery.data?.results.length}
          warnings={fahasaQuery.data?.warnings}
        />
      </div>

      <ScanResultTable books={books} isFetching={isFetching} />
    </div>
  );
}
