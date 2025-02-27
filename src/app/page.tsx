import Image from 'next/image';
import logo from '@/resources/ANA-logo-RGB.svg';
import SearchBox from './search';

export default function Home() {
  return (
    <main>
      <div className="flex flex-col items-center my-8">
        <Image src={logo} alt="Logo" width={350} />

        <SearchBox />
      </div>
    </main>
  );
}
