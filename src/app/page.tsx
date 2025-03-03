import Image from 'next/image';
import logo from '@/resources/ANA-logo-RGB.svg';
import SearchBox from './search';

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen items-center justify-center py-8">
      <Image src={logo} alt="Logo" width={350} />

      <SearchBox />
    </main>
  );
}
