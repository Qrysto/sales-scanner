import Image from 'next/image';
import logo from '@/resources/logo-full.jpg';
import SearchBox from './search';

export default function Home() {
  return (
    <main>
      <div className="flex flex-col items-center my-8">
        <div className="my-6">
          <Image
            src={logo}
            alt="Logo"
            width={282}
            height={282}
            className="mb-4"
          />

          <SearchBox />
        </div>
      </div>
    </main>
  );
}
