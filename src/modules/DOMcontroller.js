import getModifiedWeatherData from "./weatherAPI";

function clearWeekHolder() {
  const week = document.querySelector(".week");

  while (week.firstChild) {
    week.removeChild(week.firstChild);
  }
}

function createSmallWeatherFrame(dayWeather) {
  const weekInfo = document.createElement("div");
  weekInfo.classList.add("week-info");

  const weekDayP = document.createElement("p");
  weekDayP.classList.add("weekDay");
  weekDayP.textContent = dayWeather.weekDay;

  const maxTempP = document.createElement("p");
  maxTempP.classList.add("maxTemp");
  maxTempP.textContent = dayWeather.maxTemp;

  const minTempP = document.createElement("p");
  minTempP.classList.add("minTemp");
  minTempP.textContent = dayWeather.minTemp;

  const conditionIcon = document.createElement("img");
  conditionIcon.classList.add("condIcon");
  conditionIcon.setAttribute("alt", "Condition");
  conditionIcon.src = dayWeather.condIcon;

  weekInfo.appendChild(weekDayP);
  weekInfo.appendChild(maxTempP);
  weekInfo.appendChild(minTempP);
  weekInfo.appendChild(conditionIcon);

  return weekInfo;
}

function fillCurrentWeather(currentWeatherData) {
  const nodeList = document.querySelectorAll(".left-info>p, .right-info>p");
  nodeList.forEach((elem) => {
    elem.textContent = currentWeatherData[`${elem.classList.value}`];
  });
  const conditionImg = document.querySelector(".condition-image");
  conditionImg.src = currentWeatherData.conditionImg;
}

function fillWeekWeather(weekWeatherData) {
  clearWeekHolder();
  const week = document.querySelector(".week");
  weekWeatherData.forEach((dayData) => {
    week.appendChild(createSmallWeatherFrame(dayData));
  });
}

export default async function fillWeatherInfo(location, type) {
  const { currentData, weekData } = await getModifiedWeatherData(
    location,
    type
  );

  if (!currentData) {
    alert("Input Error");
    return;
  }

  fillCurrentWeather(currentData);
  fillWeekWeather(weekData);
}
