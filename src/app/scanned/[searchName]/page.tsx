'use client';

import { use } from 'react';
import { useQuery } from 'react-query';
import BookResults from './BookResults';

export default function ScanResultPage({
  params,
}: {
  params: Promise<{ searchName: string }>;
}) {
  const { searchName } = use(params);
  const { data: books, isFetching } = useQuery({
    queryKey: ['scan', searchName],
    queryFn: () =>
      fetch(`/api/count-sales/${searchName}`).then((res) => res.json()),
    retry: false,
  });

  return <BookResults books={books} isFetching={isFetching} />;
}
