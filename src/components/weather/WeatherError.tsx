import { Button } from '@/components/ui/button';
import { RotateCcw } from 'lucide-react';

interface WeatherErrorProps {
  error: string;
  onRetry: () => void;
}

export const WeatherError = ({ error, onRetry }: WeatherErrorProps) => {
  const getErrorIcon = () => {
    if (error.toLowerCase().includes('not found')) {
      return '🔍';
    }
    if (error.toLowerCase().includes('network')) {
      return '📡';
    }
    return '⚠️';
  };

  const getErrorTitle = () => {
    if (error.toLowerCase().includes('not found')) {
      return 'No search result found!';
    }
    if (error.toLowerCase().includes('network')) {
      return 'Network Error';
    }
    return 'Something went wrong';
  };

  const getErrorMessage = () => {
    if (error.toLowerCase().includes('not found')) {
      return 'We couldn\'t find weather data for that location. Please try a different city name.';
    }
    if (error.toLowerCase().includes('network')) {
      return 'We couldn\'t connect to the weather service. Please check your internet connection and try again.';
    }
    return error || 'We couldn\'t connect to the server (API error). Please try again in a few moments.';
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <div className="text-6xl mb-4">{getErrorIcon()}</div>
      
      <h2 className="text-2xl font-bold text-white mb-2">
        {getErrorTitle()}
      </h2>
      
      <p className="text-gray-400 mb-6 max-w-md">
        {getErrorMessage()}
      </p>
      
      <Button
        onClick={onRetry}
        className="bg-blue-600 hover:bg-blue-700 text-white"
      >
        <RotateCcw className="mr-2 h-4 w-4" />
        Retry
      </Button>
    </div>
  );
};