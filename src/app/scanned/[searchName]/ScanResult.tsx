'use client';

import {
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  createColumnHelper,
} from '@tanstack/react-table';
import DataTable from '@/components/DataTable';
import { Book } from '@/lib/types';

const ch = createColumnHelper<Book>();
const columns = [
  ch.accessor('thumbnailUrl', {
    header: 'Ảnh',
    cell: ({ getValue, row }) => (
      <img src={getValue()} alt={row.original.name} className="w-20 h-20" />
    ),
    enableSorting: false,
  }),
  ch.accessor('name', {
    header: 'Tên sản phẩm',
    cell: ({ getValue }) => getValue(),
  }),
  ch.accessor('seller', {
    header: 'Người bán',
    cell: ({ getValue }) => getValue(),
  }),
  ch.accessor('sold', {
    header: 'Doanh số',
    cell: ({ getValue }) => <div className="text-right">{getValue()}</div>,
  }),
  ch.accessor('source', {
    header: 'Nguồn',
    cell: ({ getValue, row }) => (
      <a
        href={row.original.url}
        target="_blank"
        className="hover:underline text-primary underline-offset-4"
      >
        {getValue()}
      </a>
    ),
    enableSorting: false,
  }),
];

export default function ScanResult({
  books = [],
  isFetching,
}: {
  books?: Book[];
  isFetching?: boolean;
}) {
  const table = useReactTable<Book>({
    data: books,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    // state: {
    //   sorting,
    //   columnVisibility,
    //   rowSelection,
    // },
    // onSortingChange: setSorting,
    // onColumnVisibilityChange: setColumnVisibility,
    // onRowSelectionChange: setRowSelection,
  });

  return (
    <div>
      <DataTable table={table} isFetching={isFetching} />
    </div>
  );
}
