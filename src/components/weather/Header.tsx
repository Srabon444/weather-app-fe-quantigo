import Image from 'next/image';
import { UnitSelector } from './UnitSelector';

export const Header = () => {
  return (
    <header className="flex items-center justify-between w-full mb-8">
      <div className="flex items-center gap-3">
        <Image
          src="/images/weather-logo.png"
          alt="Weather Now"
          width={32}
          height={32}
          className="rounded-lg"
        />
        <h1 className="text-xl font-semibold text-white">
          Weather Now
        </h1>
      </div>
      
      <UnitSelector />
    </header>
  );
};