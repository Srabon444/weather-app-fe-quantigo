# Weather App - Quantigo Frontend Test

A modern, responsive weather application built with Next.js 15.5.4, TypeScript, and Tailwind CSS. This app provides real-time weather data, detailed forecasts, and an intuitive user interface with smooth loading states and error handling.

**Live Demo:** https://weather-app-fe-quantigo.vercel.app/

## Features

- Real-time weather data including temperature, humidity, wind speed, and precipitation
- 7-day weather forecast with daily high and low temperatures
- Hourly forecast for detailed weather planning
- Unit system toggle between Imperial and Metric measurements
- Interactive day selection for viewing different forecast periods
- Fully responsive design that works seamlessly across all devices
- Smooth loading animations with skeleton components
- Comprehensive error handling with user-friendly retry options
- Smart city search with autocomplete suggestions
- Persistent user preferences using local storage

## Technologies Used

- **Framework:** Next.js 15.5.4 with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** Shadcn/ui
- **State Management:** Zustand with persistence middleware
- **Data Fetching:** TanStack Query (React Query) for server state
- **HTTP Client:** Axios
- **Validation:** Zod schemas for type-safe API responses
- **Icons:** Lucide React and React Icons
- **Weather API:** OpenWeatherMap API

## Getting Started

### Prerequisites

Before you begin, make sure you have the following installed on your machine:

- Node.js (version 18 or higher)
- Package manager: npm, yarn, pnpm, or bun
- OpenWeatherMap API key (get one free at [OpenWeatherMap](https://openweathermap.org/api))

### Installation

Follow these steps to get the project running locally:

1. **Clone the repository**
   ```bash
   git clone https://github.com/Srabon444/weather-app-fe-quantigo.git
   cd weather-app-fe-quantigo
   ```

2. **Install project dependencies**
   ```bash
   npm install
   ```

3. **Set up your environment variables**
   
   Create a `.env.local` file in the root directory and add your OpenWeatherMap API key:
   ```env
   NEXT_PUBLIC_OPENWEATHER_API_KEY=your_api_key_here
   ```
   
   You can get a free API key by signing up at [OpenWeatherMap](https://openweathermap.org/api). The free tier includes 1,000 calls per day, which is plenty for development and testing.

4. **Start the development server**
   ```bash
   npm run dev
   ```
   
   The application will be available at [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
├── app/                 # Next.js app router pages
├── components/          # Reusable UI components
│   ├── shared/         # Common components
│   ├── ui/             # Base UI components (shadcn/ui)
│   └── weather/        # Weather-specific components
├── lib/                # Utility functions and API handlers
├── store/              # Zustand store configuration
└── types/              # TypeScript type definitions
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Create production build
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## License

This project is part of a technical assessment for Quantigo.
