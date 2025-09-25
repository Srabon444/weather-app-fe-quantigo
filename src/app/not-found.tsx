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
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-sky-50 to-indigo-100 p-4 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900">
      {/* Animated Background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Floating Clouds */}
        <div className="absolute top-20 left-10 animate-bounce opacity-20 dark:opacity-10">
          <WiCloudy size={80} className="text-blue-300" />
        </div>
        <div className="absolute top-40 right-20 animate-bounce opacity-15 delay-1000 dark:opacity-8">
          <WiCloudy size={60} className="text-gray-400" />
        </div>
        <div className="absolute bottom-40 left-20 animate-bounce opacity-10 delay-2000 dark:opacity-5">
          <WiCloudy size={100} className="text-blue-200" />
        </div>

        {/* Weather Icons */}
        <div className="absolute top-32 right-10 animate-pulse delay-500">
          <WiDaySunny size={40} className="text-yellow-400 opacity-30" />
        </div>
        <div className="absolute right-40 bottom-32 animate-pulse delay-1500">
          <WiRain size={35} className="text-blue-500 opacity-25" />
        </div>
        <div className="absolute top-60 left-40 animate-pulse delay-700">
          <WiSnow size={30} className="text-blue-300 opacity-20" />
        </div>
      </div>

      {/* Main Content */}
      <div className="z-10 mx-auto max-w-2xl text-center">
        {/* Weather Icon Animation */}
        <div className="relative mb-8">
          <div className="mb-4 flex items-center justify-center space-x-4">
            <div className="animate-bounce">
              <Cloud size={60} className="text-blue-400" />
            </div>
            <div className="animate-bounce delay-300">
              <CloudRain size={60} className="text-blue-500" />
            </div>
            <div className="animate-bounce delay-600">
              <Sun size={60} className="text-yellow-500" />
            </div>
          </div>
          <div className="animate-pulse">
            <Wind size={40} className="mx-auto text-gray-500" />
          </div>
        </div>

        {/* 404 Text */}
        <div className="mb-6">
          <h1 className="mb-4 animate-pulse bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-8xl font-bold text-transparent md:text-9xl">
            404
          </h1>
          <div className="mb-4 flex items-center justify-center space-x-2">
            <CloudSnow className="animate-spin text-blue-500" size={24} />
            <h2 className="text-2xl font-semibold text-gray-800 md:text-3xl dark:text-gray-200">
              Weather Not Found
            </h2>
            <WiThunderstorm
              className="animate-pulse text-purple-500"
              size={28}
            />
          </div>
        </div>

        {/* Description */}
        <div className="mb-8 space-y-4">
          <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-300">
            Looks like this forecast got lost in the clouds! ⛅
          </p>
        </div>

        {/* Weather Status Cards */}
        <div className="mx-auto mb-8 grid max-w-md grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-lg border border-blue-200 bg-white/70 p-4 backdrop-blur-sm dark:border-gray-700 dark:bg-gray-800/70">
            <Sun className="mx-auto mb-2 text-yellow-500" size={24} />
            <p className="text-xs font-medium text-gray-700 dark:text-gray-300">
              Clear
            </p>
          </div>
          <div className="rounded-lg border border-blue-200 bg-white/70 p-4 backdrop-blur-sm dark:border-gray-700 dark:bg-gray-800/70">
            <CloudRain className="mx-auto mb-2 text-blue-500" size={24} />
            <p className="text-xs font-medium text-gray-700 dark:text-gray-300">
              Cloudy
            </p>
          </div>
          <div className="rounded-lg border border-blue-200 bg-white/70 p-4 backdrop-blur-sm dark:border-gray-700 dark:bg-gray-800/70">
            <Wind className="mx-auto mb-2 text-gray-500" size={24} />
            <p className="text-xs font-medium text-gray-700 dark:text-gray-300">
              Windy
            </p>
          </div>
        </div>

        {/* Back to Home Button */}
        <Link href="/">
          <Button
            size="lg"
            className="transform gap-3 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 px-8 py-3 text-base font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:from-blue-600 hover:to-blue-700 hover:shadow-xl"
          >
            <ArrowLeft size={20} />
            Return to Weather Dashboard
          </Button>
        </Link>

        {/* Additional Info */}
        <div className="mt-8 text-sm text-gray-500 dark:text-gray-400">
          <p>Maybe try checking the weather for a different location? 🌍</p>
        </div>
      </div>
    </div>
  );
}
