import { memo } from "react";
import { useCapitalWeather } from "../hooks/useCapitalWeather";

export const Weather = memo(({ country }) => {
  const { weather, isLoading, hasError } = useCapitalWeather({ country });

  return (
    <>
      <h3>Weather in {country.capital[0]}</h3>
      {isLoading && <p>Loading weather...</p>}
      {hasError && <p>{hasError}</p>}
      {!isLoading && !hasError && !weather && <p>No weather data available.</p>}
      {weather && (
        <>
          <p>Temperature: {weather.current.temp} Celsius</p>
          <img
            src={`https://openweathermap.org/img/wn/${weather.current.weather[0].icon}@2x.png`}
            alt=""
          />
          <p>Weather: {weather.current.weather[0].description}</p>
          <p>Wind: {weather.current.wind_speed} m/s</p>
        </>
      )}
    </>
  );
});
