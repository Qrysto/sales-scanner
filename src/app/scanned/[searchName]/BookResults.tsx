import {
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  createColumnHelper,
} from '@tanstack/react-table';
// import Image from 'next/image';
import DataTable from '@/components/DataTable';
import { Book } from '@/lib/types';

const ch = createColumnHelper<Book>();
const columns = [
  ch.accessor('source', {
    header: 'Nguồn',
    cell: ({ getValue, row }) => (
      <a href={row.original.url} target="_blank">
        {getValue()}
      </a>
    ),
  }),
  ch.accessor('thumbnailUrl', {
    header: 'Ảnh',
    cell: ({ getValue, row }) => (
      <img src={getValue()} alt={row.original.name} width={140} height={140} />
    ),
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
    header: 'Số lượng đã bán',
    cell: ({ getValue }) => getValue(),
  }),
];

export default function BookResults({
  books = [],
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
      <DataTable table={table} isFetching />
    </div>
  );
}
