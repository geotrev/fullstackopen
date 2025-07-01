const getCapitalWeather = async (coords) => {
  if (!coords || coords.length !== 2) {
    throw new Error("Invalid capital information provided.");
  }
  // import.meta.env.VITE_OWM_API_KEY
  // capital info: data.coords[0] (lat) / data.coords[1] (lon)
  const apiKey = import.meta.env.VITE_OWM_API_KEY;
  // api url structure: https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
  return fetch(
    `https://api.openweathermap.org/data/3.0/onecall?lat=${coords[0]}&lon=${coords[1]}&units=metric&exclude=minutely,hourly,alerts&appid=${apiKey}`
  ).then((res) => {
    if (!res.ok) {
      throw new Error("Couldn't fetch weather data.");
    }
    return res.json();
  });
};

export default {
  getCapitalWeather,
};
