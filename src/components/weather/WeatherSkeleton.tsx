import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export const WeatherSkeleton = () => {
  return (
    <div className="space-y-6">
      {/* Current Weather Skeleton */}
      <Card className="border-gray-600 bg-gray-800/50 p-8">
        <div className="flex items-center justify-between">
          <div className="flex-1 space-y-4">
            <Skeleton className="h-8 w-48 bg-gray-700" />
            <Skeleton className="h-4 w-32 bg-gray-700" />
            <div className="flex items-center gap-4">
              <Skeleton className="h-16 w-16 rounded-full bg-gray-700" />
              <Skeleton className="h-16 w-24 bg-gray-700" />
            </div>
          </div>
        </div>
      </Card>

      {/* Weather Details Skeleton */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <Card key={index} className="border-gray-600 bg-gray-800/50 p-4">
            <div className="space-y-2 text-center">
              <Skeleton className="mx-auto h-4 w-16 bg-gray-700" />
              <Skeleton className="mx-auto h-6 w-12 bg-gray-700" />
            </div>
          </Card>
        ))}
      </div>

      {/* Hourly Forecast Skeleton */}
      <Card className="border-gray-600 bg-gray-800/50 p-6">
        <div className="mb-4 flex items-center justify-between">
          <Skeleton className="h-6 w-32 bg-gray-700" />
          <Skeleton className="h-8 w-24 bg-gray-700" />
        </div>
        <div className="space-y-3">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="flex items-center justify-between py-2">
              <div className="flex items-center gap-4">
                <Skeleton className="h-8 w-8 rounded-full bg-gray-700" />
                <Skeleton className="h-4 w-16 bg-gray-700" />
              </div>
              <Skeleton className="h-4 w-12 bg-gray-700" />
            </div>
          ))}
        </div>
      </Card>

      {/* Daily Forecast Skeleton */}
      <Card className="border-gray-600 bg-gray-800/50 p-6">
        <Skeleton className="mb-4 h-6 w-32 bg-gray-700" />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-7">
          {Array.from({ length: 7 }).map((_, index) => (
            <div key={index} className="space-y-2 text-center">
              <Skeleton className="mx-auto h-4 w-12 bg-gray-700" />
              <Skeleton className="mx-auto h-8 w-8 rounded-full bg-gray-700" />
              <Skeleton className="mx-auto h-4 w-8 bg-gray-700" />
              <Skeleton className="mx-auto h-4 w-8 bg-gray-700" />
            </div>
          ))}
        </div>
      </Card>
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
