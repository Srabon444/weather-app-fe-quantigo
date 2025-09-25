export interface Config {
  apiUrl: string;
  makeApiUrl: (path: string, base?: string) => string; //for multiple url support
}

// For production
const apiUrl = "https://api.openweathermap.org";

const config: Config = {
  apiUrl,
  makeApiUrl: (path: string, base: string = apiUrl) => {
    return base + path;
  },
};
export default config;
