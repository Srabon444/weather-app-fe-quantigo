import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  ArrowLeft,
  Cloud,
  CloudRain,
  Sun,
  Wind,
  CloudSnow,
} from 'lucide-react';
import {
  WiCloudy,
  WiDaySunny,
  WiRain,
  WiSnow,
  WiThunderstorm,
} from 'react-icons/wi';

export const metadata: Metadata = {
  title: '404 - Weather Not Found',
  description:
    "Looks like this forecast got lost in the clouds. Let's get you back to safety!",
};

export default function Custom404() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-purple p-4">
      {/* Animated Background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Floating Clouds */}
        <div className="absolute top-20 left-10 animate-bounce opacity-20">
          <WiCloudy size={80} className="text-neutral-300" />
        </div>
        <div className="absolute top-40 right-20 animate-bounce opacity-15 delay-1000">
          <WiCloudy size={60} className="text-neutral-200" />
        </div>
        <div className="absolute bottom-40 left-20 animate-bounce opacity-10 delay-2000">
          <WiCloudy size={100} className="text-neutral-300" />
        </div>

        {/* Weather Icons */}
        <div className="absolute top-32 right-10 animate-pulse delay-500">
          <WiDaySunny size={40} className="text-orange-500 opacity-30" />
        </div>
        <div className="absolute right-40 bottom-32 animate-pulse delay-1500">
          <WiRain size={35} className="text-blue-500 opacity-25" />
        </div>
        <div className="absolute top-60 left-40 animate-pulse delay-700">
          <WiSnow size={30} className="text-neutral-300 opacity-20" />
        </div>
      </div>

      {/* Main Content */}
      <div className="z-10 mx-auto max-w-2xl text-center">
        {/* Weather Icon Animation */}
        <div className="relative mb-8">
          <div className="mb-4 flex items-center justify-center space-x-4">
            <div className="animate-bounce">
              <Cloud size={60} className="text-neutral-300" />
            </div>
            <div className="animate-bounce delay-300">
              <CloudRain size={60} className="text-blue-500" />
            </div>
            <div className="animate-bounce delay-600">
              <Sun size={60} className="text-orange-500" />
            </div>
          </div>
          <div className="animate-pulse">
            <Wind size={40} className="mx-auto text-neutral-300" />
          </div>
        </div>

        {/* 404 Text */}
        <div className="mb-6">
          <h1 className="mb-4 animate-pulse bg-gradient-to-r from-orange-500 via-blue-500 to-orange-500 bg-clip-text text-8xl font-bold text-transparent md:text-9xl">
            404
          </h1>
          <div className="mb-4 flex items-center justify-center space-x-2">
            <CloudSnow className="animate-spin text-blue-500" size={24} />
            <h2 className="text-2xl font-semibold text-neutral-0 md:text-3xl">
              Weather Not Found
            </h2>
            <WiThunderstorm
              className="animate-pulse text-orange-500"
              size={28}
            />
          </div>
        </div>

        {/* Description */}
        <div className="mb-8 space-y-4">
          <p className="text-lg leading-relaxed text-neutral-300">
            Looks like this forecast got lost in the clouds! ⛅
          </p>
        </div>

        {/* Weather Status Cards */}
        <div className="mx-auto mb-8 grid max-w-md grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-lg border border-neutral-300 bg-neutral-0/20 p-4 backdrop-blur-sm">
            <Sun className="mx-auto mb-2 text-orange-500" size={24} />
            <p className="text-xs font-medium text-neutral-0">
              Clear
            </p>
          </div>
          <div className="rounded-lg border border-neutral-300 bg-neutral-0/20 p-4 backdrop-blur-sm">
            <CloudRain className="mx-auto mb-2 text-blue-500" size={24} />
            <p className="text-xs font-medium text-neutral-0">
              Cloudy
            </p>
          </div>
          <div className="rounded-lg border border-neutral-300 bg-neutral-0/20 p-4 backdrop-blur-sm">
            <Wind className="mx-auto mb-2 text-neutral-300" size={24} />
            <p className="text-xs font-medium text-neutral-0">
              Windy
            </p>
          </div>
        </div>

        {/* Back to Home Button */}
        <Link href="/">
          <Button
            size="lg"
            className="transform gap-3 rounded-xl bg-gradient-to-r from-orange-500 to-blue-500 px-8 py-3 text-base font-semibold text-neutral-0 shadow-lg transition-all duration-300 hover:scale-105 hover:from-blue-500 hover:to-orange-500 hover:shadow-xl"
          >
            <ArrowLeft size={20} />
            Return to Weather Dashboard
          </Button>
        </Link>

        {/* Additional Info */}
        <div className="mt-8 text-sm text-neutral-300">
          <p>Maybe try checking the weather for a different location? 🌍</p>
        </div>
      </div>
    </div>
  );
}
