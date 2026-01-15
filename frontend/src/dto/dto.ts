export default interface WeatherData {
  location: string;
  coordinates: { lat: string; lon: string };
  climate: {
    temperature: number;
    unity: string;
    wind: number;
    cliamte_code: number;
  };
}
