'use client';

import { useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function SearchBox() {
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  return (
    <form
      className="flex w-full max-w-sm items-center space-x-2"
      onSubmit={(e) => {
        e.preventDefault();
        const searchName = inputRef.current?.value;
        if (searchName) {
          router.push(`/scanned/${encodeURIComponent(searchName)}`);
        }
      }}
    >
      <Input placeholder="Tên sách" ref={inputRef} />
      <Button type="submit">Tìm kiếm</Button>
    </form>
  );
}
