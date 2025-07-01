import { useEffect, useMemo, useState } from "react";
import weatherApi from "../api/weatherApi";

export const useCapitalWeather = ({ country }) => {
  const [weather, setWeather] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(null);

  useEffect(() => {
    if (
      !country?.capitalInfo?.latlng ||
      country.capitalInfo.latlng?.length === 0
    ) {
      return;
    }

    setIsLoading(true);
    setHasError(null);

    try {
      weatherApi
        .getCapitalWeather(country.capitalInfo.latlng)
        .then((data) => {
          setIsLoading(false);
          setWeather(data);
        })
        .catch((error) => {
          setHasError("Failed to fetch weather data.");
          setIsLoading(false);
          console.error(error);
        });
    } catch (error) {
      setHasError("Failed to fetch weather data.");
      setIsLoading(false);
      console.error(error);
    }

    return () => {
      setWeather(null);
      setIsLoading(false);
      setHasError(null);
    };
  }, [country]);

  return useMemo(
    () => ({
      weather,
      isLoading,
      hasError,
    }),
    [weather, isLoading, hasError]
  );
};
