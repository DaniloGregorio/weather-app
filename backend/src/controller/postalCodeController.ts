import { Request, Response, NextFunction } from "express";

export const PCQuery = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { postalCode } = req.body;

  if (!postalCode) {
    return res.status(400).json({ error: "Postal code is mandatory" });
  }

  const url = `https://nominatim.openstreetmap.org/search?format=json&postalcode=${postalCode}&limit=1`;

  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": "WeatherAppTest/1.0",
      },
    });
    const data = await response.json();

    if (!data || data.length === 0) {
      return res.status(404).json({ error: "Postal code no found" });
    }

    const { lat, lon, display_name } = data[0];

    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&timezone=America%2FSao_Paulo`;

    const weatherResponse = await fetch(weatherUrl);
    const weatherData = await weatherResponse.json();

    return res.status(200).json({
      location: display_name,
      coordinates: { lat, lon },
      climate: {
        temperature: weatherData.current_weather.temperature,
        unity: "°C",
        wind: weatherData.current_weather.windspeed,
        climate_code: weatherData.current_weather.weathercode,
      },
    });
  } catch (error) {
    console.error("error", error);
    return res.status(500).json({ error: "Error to process intern data" });
  }
};
