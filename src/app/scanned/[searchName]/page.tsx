'use client';

import { useQuery } from 'react-query';
import BookResults from './BookResults';

export default function ScanResultPage({
  params: { searchName },
}: {
  params: { searchName: string };
}) {
  const { data: books, isFetching } = useQuery({
    queryKey: ['scan', searchName],
    queryFn: () =>
      fetch(`/api/count-sales/${searchName}`).then((res) => res.json()),
  });

  return <BookResults books={books} isFetching={isFetching} />;
}
