import { useState } from "react";
import type WeatherData from "../dto/dto";

export const useWeather = () => {
  const [climateST, setClimateST] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const searchClimate = async (postalCode: string) => {
    const cleanPostalCode = postalCode.replace(/\D/g, "");

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:3000/Query/postalCode", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postalCode: cleanPostalCode }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Error to search climate data");
      }

      setClimateST(data);
    } catch (err: any) {
      setError(err.message);
      setClimateST(null);
    } finally {
      setLoading(false);
    }
  };

  // Retornamos os estados e a função para o componente usar
  return { climateST, loading, error, searchClimate };
};
