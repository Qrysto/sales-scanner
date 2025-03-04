'use client';

import { useState } from 'react';
import {
  flexRender,
  Table as TableType,
  HeaderGroup,
  Header,
  Row,
  Cell,
} from '@tanstack/react-table';
import { ArrowUpDown, SortAsc, SortDesc } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
// import {
//   ContextMenu,
//   ContextMenuContent,
//   ContextMenuItem,
//   ContextMenuTrigger,
//   ContextMenuSeparator,
// } from '@/components/ui/context-menu';
// import { useAccount } from '@/lib/client';
import { Skeleton } from '@/components/ui/skeleton';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { cn, genericMemo } from '@/lib/utils';

export default function DataTable<TData>({
  table,
  isFetching,
}: // hasNextPage,
// fetchNextPage,
{
  table: TableType<TData>;
  isFetching?: boolean;
  // hasNextPage: boolean;
  // fetchNextPage: Function;
}) {
  const { rows } = table.getRowModel();
  // const scrollerRef = useRef<HTMLDivElement>(null);
  // const fetchMoreOnBottomReached = useCallback(
  //   (containerRefElement?: HTMLDivElement | null) => {
  //     if (hasNextPage && !isFetching && containerRefElement) {
  //       const { scrollHeight, scrollTop, clientHeight } = containerRefElement;
  //       if (scrollHeight - scrollTop - clientHeight < 200) {
  //         fetchNextPage();
  //       }
  //     }
  //   },
  //   [isFetching, hasNextPage, fetchNextPage]
  // );
  // useEffect(() => {
  //   fetchMoreOnBottomReached(scrollerRef.current);
  // }, [fetchMoreOnBottomReached]);

  return (
    <ScrollArea
      // viewportRef={scrollerRef}
      className="relative rounded-md border h-full"
      // onScroll={(e) => fetchMoreOnBottomReached(e.target as HTMLDivElement)}
    >
      <Table className="border-separate border-spacing-0">
        <TableHeader className="sticky top-0 z-10 rounded-t-md flex-shrink-0 bg-background shadow-[0_0_2px_1px_hsl(var(--border))]">
          {table.getHeaderGroups().map((headerGroup) => (
            <HeaderRow key={headerGroup.id} headerGroup={headerGroup} />
          ))}
        </TableHeader>
        <TableBody className="flex-1">
          {rows?.length ? (
            rows.map((row) => (
              <DataRow
                key={row.id}
                row={row}
                selected={!!table.getSelectedRowModel().rowsById[row.id]}
              />
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={table.getVisibleLeafColumns().length}
                className="h-24 text-center"
              >
                Vườn không nhà trống...
              </TableCell>
            </TableRow>
          )}
          {isFetching &&
            [1, 2, 3].map((i) => (
              <TableRow className="hover:bg-background" key={i}>
                {table.getVisibleLeafColumns().map((column) => (
                  <TableCell key={column.id}>
                    <Skeleton className="w-full h-[20px]" />
                  </TableCell>
                ))}
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}

const HeaderRow = genericMemo(
  <TData,>({ headerGroup }: { headerGroup: HeaderGroup<TData> }) => (
    <TableRow className="hover:bg-background">
      {headerGroup.headers.map((header) => (
        <HeaderCell key={header.id} header={header} />
      ))}
    </TableRow>
  )
);

const HeaderCell = genericMemo(
  <TData,>({ header }: { header: Header<TData, unknown> }) => {
    const sortable = header.column.getCanSort();
    const sorted = header.column.getIsSorted();
    // for programmatical re-rendering
    const [counter, setCounter] = useState(0);
    return (
      <TableHead
        colSpan={header.colSpan}
        className={cn(
          'font-bold whitespace-nowrap group border border-border/50',
          header.colSpan > 1 && 'text-center',
          sortable && 'cursor-pointer'
        )}
        onClick={
          sortable
            ? () => {
                const sorted = header.column.getIsSorted();
                // asc -> false
                if (sorted === 'asc') {
                  header.column.clearSorting();
                } else {
                  // false -> desc
                  // desc -> asc
                  header.column.toggleSorting(sorted !== 'desc');
                }
                setCounter(counter + 1);
              }
            : undefined
        }
      >
        {header.isPlaceholder
          ? null
          : flexRender(header.column.columnDef.header, header.getContext())}
        {sortable && sorted === false && (
          <ArrowUpDown className="inline-block ml-2 h-4 w-4 opacity-20 group-hover:opacity-40" />
        )}
        {sorted === 'asc' && <SortAsc className="inline-block ml-2 h-4 w-4" />}
        {sorted === 'desc' && (
          <SortDesc className="inline-block ml-2 h-4 w-4" />
        )}
      </TableHead>
    );
  }
);

const DataRow = genericMemo(
  <TData,>({ row, selected }: { row: Row<TData>; selected: boolean }) => {
    return (
      <TableRow data-state={selected && 'selected'}>
        {row.getVisibleCells().map((cell) => (
          <DataCell key={cell.id} cell={cell} />
        ))}
      </TableRow>
    );
  }
);

const DataCell = genericMemo(
  <TData,>({ cell }: { cell: Cell<TData, unknown> }) => {
    const { column } = cell;

    return (
      <TableCell className={cn('whitespace-nowrap')}>
        {flexRender(column.columnDef.cell, cell.getContext())}
      </TableCell>
    );
  }
);
