import getModifiedWeatherData from "./weatherAPI";

function fillCurrentWeather(currentWeatherData) {
  const nodeList = document.querySelectorAll(".left-info>p, .right-info>p");
  nodeList.forEach((elem) => {
    elem.textContent = currentWeatherData[`${elem.classList.value}`];
  });
  const conditionImg = document.querySelector(".condition-image");
  conditionImg.src = currentWeatherData.conditionImg;
}

function fillWeekWeather(weekWeatherData) {
  const nodeList = document.querySelectorAll(".week-info");
  nodeList.forEach((day, index) => {
    for (const elem of day.children) {
      if (elem.tagName === "IMG") {
        elem.src = weekWeatherData[index].condIcon;
      } else {
        elem.textContent = weekWeatherData[index][`${elem.classList.value}`];
      }
    }
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
