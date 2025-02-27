import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import logo from '@/resources/logo-full.jpg';

function SearchBox() {
  return (
    <div className="flex w-full max-w-sm items-center space-x-2">
      <Input placeholder="Tên sách" />
      <Button>Tìm kiếm</Button>
    </div>
  );
}

export default function Home() {
  return (
    <main className="container mx-auto min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center">
        <Image
          src={logo}
          alt="Logo"
          width={282}
          height={282}
          className="mb-4"
        />
        <SearchBox />
      </div>
    </main>
  );
}
