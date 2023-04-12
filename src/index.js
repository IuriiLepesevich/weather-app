import "./style.css";
import fillWeatherInfo from "./modules/DOMcontroller";

const searchForm = document.querySelector(".search-holder");

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchField = document.querySelector("#request");
  fillWeatherInfo(searchField.value, "c");
});

fillWeatherInfo("Murmansk", "c");
