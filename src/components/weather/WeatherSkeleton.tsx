import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export const WeatherSkeleton = () => {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      <div className="space-y-6 lg:col-span-2">
        {/* Current Weather Skeleton */}
        <Card className="bg-gradient-purple mb-6 border-none p-8">
          <div className="flex h-[200px] flex-col items-center justify-center">
            <div className="mb-4 flex space-x-1">
              <div className="h-2 w-2 animate-bounce rounded-full bg-white [animation-delay:-0.3s]"></div>
              <div className="h-2 w-2 animate-bounce rounded-full bg-white [animation-delay:-0.15s]"></div>
              <div className="h-2 w-2 animate-bounce rounded-full bg-white"></div>
            </div>
            <p className="text-sm text-white">Loading...</p>
          </div>
        </Card>

        {/* Weather Details Skeleton */}
        <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5 lg:gap-6">
          {Array.from({ length: 4 }).map((_, index) => (
            <Card
              key={index}
              className="border-[var(--color-neutral-800)] bg-[var(--color-neutral-600)] p-4"
            >
              <div className="text-start">
                <Skeleton className="mb-6 h-4 w-16 bg-gray-500" />
                <Skeleton className="h-6 w-12 bg-gray-500" />
              </div>
            </Card>
          ))}
        </div>

        {/* Daily Forecast Skeleton */}
        <div className="mt-6">
          <Skeleton className="mb-4 h-6 w-32 bg-gray-700" />
          <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4 xl:grid-cols-7">
            {Array.from({ length: 7 }).map((_, index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-center space-y-2 rounded-xl border border-[var(--color-neutral-800)] bg-[var(--color-neutral-600)] p-4"
              >
                <Skeleton className="h-4 w-12 bg-gray-700" />
                <Skeleton className="h-15 w-15 rounded-full bg-gray-700" />
                <div className="flex w-full items-center justify-between">
                  <Skeleton className="h-4 w-8 bg-gray-700" />
                  <Skeleton className="h-4 w-8 bg-gray-700" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Hourly Forecast Skeleton */}
      <div className="space-y-6">
        <Card className="border-none bg-[var(--color-neutral-800)] p-6">
          <div className="mb-4 flex items-center justify-between">
            <Skeleton className="h-6 w-32 bg-gray-700" />
            <Skeleton className="h-8 w-24 bg-gray-700" />
          </div>
          <div className="space-y-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="flex items-center justify-between rounded-lg border border-none bg-[var(--color-neutral-700)] px-3 py-2.5"
              >
                <div className="flex items-center space-x-3">
                  <Skeleton className="h-10 w-10 rounded-full bg-gray-600" />
                  <Skeleton className="h-4 w-16 bg-gray-600" />
                </div>
                <Skeleton className="h-4 w-12 bg-gray-600" />
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export const SearchStateSkeleton = () => {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <div className="mb-4 text-6xl">🌤️</div>
      <p className="text-lg text-gray-400">
        Search for a city to see weather information
      </p>
    </div>
  );
};
