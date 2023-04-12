async function getWeather(location) {
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=d1816a2a86b24e719d8102406231204&q=${location.toLowerCase()}&days=7&aqi=no&alerts=no`,
      { mode: "cors" }
    );
    if (response.status > 299 || response.status < 200) return;
    const weatherData = await response.json();
    return weatherData;
  } catch (err) {
    alert(`Error: ${err}`);
  }
}

function getModifiedCurrentWeather(weatherData, type) {
  const { location } = weatherData;
  const { current } = weatherData;
  const currentData = {};
  const tempSymbol = `°${type.toUpperCase()}`;

  currentData.location = `${location.country}, ${location.name}`;
  currentData.time = location.localtime;
  currentData.temp = `Temperature: ${current[`temp_${type}`]} ${tempSymbol}`;
  currentData.condition = current.condition.text;
  currentData.conditionImg = current.condition.icon;

  currentData.wind = `Wind: ${current.wind_kph} km/h`;
  currentData.humidity = `Humidity: ${current.humidity} %`;
  currentData.feelslike = `Feels: ${
    current[`feelslike_${type}`]
  } ${tempSymbol}`;

  return currentData;
}

function getModifiedWeekWeather(weatherData, type) {
  const weekDays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const { forecastday } = weatherData.forecast;
  const weekData = [];
  const tempSymbol = `°${type.toUpperCase()}`;

  for (const [key, value] of Object.entries(forecastday)) {
    const day = {
      weekDay: weekDays[new Date(value.date).getDay()],
      maxTemp: `${value.day[`maxtemp_${type}`]} ${tempSymbol}`,
      minTemp: `${value.day[`mintemp_${type}`]} ${tempSymbol}`,
      condIcon: value.day.condition.icon,
    };
    weekData.push(day);
  }

  return weekData;
}

export default async function getModifiedWeatherData(place, type) {
  const weatherData = await getWeather(place);
  if (!weatherData) return;

  const currentData = getModifiedCurrentWeather(weatherData, type);
  const weekData = getModifiedWeekWeather(weatherData, type);

  return { currentData, weekData };
}
