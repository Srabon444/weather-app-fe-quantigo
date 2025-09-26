import Image from 'next/image';
import { UnitSelector } from './UnitSelector';

export const Header = () => {
  return (
    <header className="mb-8 flex w-full items-center justify-between">
      <div className="flex items-center gap-3">
        <Image
          src="/images/weather-logo.png"
          alt="Weather Now"
          width={40}
          height={40}
          className="rounded-lg"
        />
        <h1 className="text-[22px] leading-[100%] font-bold text-white">
          Weather Now
        </h1>
      </div>

      <UnitSelector />
    </header>
  );
};
