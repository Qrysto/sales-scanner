'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useQuery } from 'react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import BookResults from './BookResults';
import logo from '@/resources/logo-full.jpg';

export default function Home() {
  const [searchName, setSearchName] = useState('');
  const {
    data: books,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ['books'],
    queryFn: () =>
      fetch(`/api/count-sales/${searchName}`).then((res) => res.json()),
    enabled: false,
  });

  return (
    <main className="container mx-auto min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center my-8">
        <div className="my-6">
          <Image
            src={logo}
            alt="Logo"
            width={282}
            height={282}
            className="mb-4"
          />

          {/* Search box */}
          <form
            className="flex w-full max-w-sm items-center space-x-2"
            onSubmit={() => {
              if (searchName) {
                refetch();
              }
            }}
          >
            <Input
              placeholder="Tên sách"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
            />
            <Button type="submit" disabled={isFetching}>
              Tìm kiếm
            </Button>
          </form>
        </div>

        {/* Results */}
        <BookResults books={books} isFetching={isFetching} />
      </div>
    </main>
  );
}
