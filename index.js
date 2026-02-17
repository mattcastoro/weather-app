const apiKey = 'PN8RHXTN8SN6DFG8DGBSBE9GS'

async function getDataCurrent(location, unit) {
  const urlCurrent = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=${unit}&key=${apiKey}`
  try {
    const response = await fetch(urlCurrent);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch(error) {
    console.warn(error.message);
  }
}

async function getDataPast(location, unit) {
  // const urlPast = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/2024-12-31/2025-01-04/?unitGroup=${unit}&key=${apiKey}`
  const urlPast = `https://71e766cf-7a43-4fe6-baff-a3ced57a1119.mock.pstmn.io/historicData`
  try {
    const response = await fetch(urlPast);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch(error) {
    console.warn(error.message);
  }
}

async function getWeather() {
  const userLocation = document.getElementById('userLocation');
  const unit = getUnit();

  if(!userLocation.value) {
    alert("Please add a location before searching or selecting a degree unit.");
    return;
  }

  try {
    const [pastData, currentData] = await Promise.all([
      getDataPast(userLocation.value, unit),
      getDataCurrent(userLocation.value, unit)
    ]);

    const combinedData = {
      past: pastData,
      current: currentData
    };
    console.log(combinedData);
  } catch (error) {
    console.warn("Error fetching weather data:", error);
  }
}

// async function getWeather() {
//   const userLocation = document.getElementById('userLocation');
//   const unit = getUnit();
//   if (!userLocation.value) {
//     alert("Please add a location before searching or selecting a degree unit.");
//   } else {
//     getDataPast(userLocation.value, unit).then((data) => {
//       console.log(data);
//       const hour = new Date().getHours();
//       console.log(hour);
//       const displayData_ly = {
//         datetime : new Date().toLocaleString(),
//       }
//       console.log(displayData_ly);
//       const now = new Date().toLocaleDateString();
//       const today = new Date();
//       console.log("today's date " + "= " + now);
//       console.log(today.getHours());
//     });

//     getDataCurrent(userLocation.value, unit).then((data) => {
//       console.log(data);
//       const hour = data.currentConditions.datetime.slice(0,2);
//       console.log("today's hour " + "= " + hour);
//       const displayData = {
//         datetime : data.currentConditions.datetime,
//         location : cleanLocation(data.resolvedAddress),

//         currentTemp : Math.round(data.currentConditions.temp),
//         feelsLike : Math.round(data.currentConditions.feelslike),
//         currentHighTemp : Math.round(data.days[0].tempmax),
//         currentLowTemp : Math.round(data.days[0].tempmin),
//         currentIcon : data.currentConditions.icon,
//         currentSunrise : data.currentConditions.sunrise.slice(0, 5),
//         currentSunset : data.currentConditions.sunset.slice(0, 5),

//         currentDayDescription : data.description,
//         hour0Icon : data.currentConditions.icon,
//         hour1Icon : data.days[0].hours[setHours(hour, 1)].icon,
//         hour1Temp : Math.round(data.days[0].hours[setHours(hour, 1)].temp),
//         hour2Icon : data.days[0].hours[setHours(hour, 2)].icon,
//         hour2Temp : Math.round(data.days[0].hours[setHours(hour, 2)].temp),
//         hour3Icon : data.days[0].hours[setHours(hour, 3)].icon,
//         hour3Temp : Math.round(data.days[0].hours[setHours(hour, 3)].temp),
//         hour4Icon : data.days[0].hours[setHours(hour, 4)].icon,
//         hour4Temp : Math.round(data.days[0].hours[setHours(hour, 4)].temp),
//         hour5Icon : data.days[0].hours[setHours(hour, 5)].icon,
//         hour5Temp : Math.round(data.days[0].hours[setHours(hour, 5)].temp),

//         day1Day : data.days[1].datetime,
//         day1Icon : data.days[1].icon,
//         day1TempLow : Math.round(data.days[1].tempmin),
//         day1TempHigh : Math.round(data.days[1].tempmax),
//         day2Day : data.days[2].datetime,
//         day2Icon : data.days[2].icon,
//         day2TempLow : Math.round(data.days[2].tempmin),
//         day2TempHigh : Math.round(data.days[2].tempmax),
//         day3Day : data.days[3].datetime,
//         day3Icon : data.days[3].icon,
//         day3TempLow : Math.round(data.days[3].tempmin),
//         day3TempHigh : Math.round(data.days[3].tempmax),
//         day4Day : data.days[4].datetime,
//         day4Icon : data.days[4].icon,
//         day4TempLow : Math.round(data.days[4].tempmin),
//         day4TempHigh : Math.round(data.days[4].tempmax),
//         day5Day : data.days[5].datetime,
//         day5Icon : data.days[5].icon,
//         day5TempLow : Math.round(data.days[5].tempmin),
//         day5TempHigh : Math.round(data.days[5].tempmax),

//         ly_hour0Icon : data.currentConditions.icon,
//         ly_hour0Temp : Math.round(data.currentConditions.temp),
//         ly_hour1Icon : data.days[0].hours[setHours(hour, 1)].icon,
//         ly_hour1Temp : Math.round(data.days[0].hours[setHours(hour, 1)].temp),
//         ly_hour2Icon : data.days[0].hours[setHours(hour, 2)].icon,
//         ly_hour2Temp : Math.round(data.days[0].hours[setHours(hour, 2)].temp),
//         ly_hour3Icon : data.days[0].hours[setHours(hour, 3)].icon,
//         ly_hour3Temp : Math.round(data.days[0].hours[setHours(hour, 3)].temp),
//         ly_hour4Icon : data.days[0].hours[setHours(hour, 4)].icon,
//         ly_hour4Temp : Math.round(data.days[0].hours[setHours(hour, 4)].temp),
//         ly_hour5Icon : data.days[0].hours[setHours(hour, 5)].icon,
//         ly_hour5Temp : Math.round(data.days[0].hours[setHours(hour, 5)].temp), 

//         ly_day0Day : "Today",
//         ly_day0Icon : data.days[1].icon,
//         ly_day0TempLow : Math.round(data.days[1].tempmin),
//         ly_day0TempHigh : Math.round(data.days[1].tempmax),
//         ly_day1Day : data.days[1].datetime,
//         ly_day1Icon : data.days[1].icon,
//         ly_day1TempLow : Math.round(data.days[1].tempmin),
//         ly_day1TempHigh : Math.round(data.days[1].tempmax),
//         ly_day2Day : data.days[2].datetime,
//         ly_day2Icon : data.days[2].icon,
//         ly_day2TempLow : Math.round(data.days[2].tempmin),
//         ly_day2TempHigh : Math.round(data.days[2].tempmax),
//         ly_day3Day : data.days[3].datetime,
//         ly_day3Icon : data.days[3].icon,
//         ly_day3TempLow : Math.round(data.days[3].tempmin),
//         ly_day3TempHigh : Math.round(data.days[3].tempmax),
//         ly_day4Day : data.days[4].datetime,
//         ly_day4Icon : data.days[4].icon,
//         ly_day4TempLow : Math.round(data.days[4].tempmin),
//         ly_day4TempHigh : Math.round(data.days[4].tempmax),
//         ly_day5Day : data.days[5].datetime,
//         ly_day5Icon : data.days[5].icon,
//         ly_day5TempLow : Math.round(data.days[5].tempmin),
//         ly_day5TempHigh : Math.round(data.days[5].tempmax),
//       };
//       console.log(displayData);
//       displayWeather(displayData);
//     })
//   }
// }

function displayWeather(displayData) {
  clearDisplay();
  // updateBackground(displayData.currentIcon);
  
  const locationField = document.getElementById('userLocation');
  locationField.value = displayData.location;

  document.querySelector('#asOf').textContent = `As of: ${displayData.datetime.slice(0, 5)} local time`;
  document.querySelector('#searchLocation').textContent = displayData.location;

  document.querySelector('#timeSunrise').textContent = displayData.currentSunrise;
  document.querySelector('#timeSunset').textContent = displayData.currentSunset;

  document.querySelector('#currentDescription').textContent = displayData.currentDayDescription;
  document.querySelector('#currentTemp').textContent = `${displayData.currentTemp}°`;
  document.querySelector('#highTemp').textContent = `High: ${displayData.currentHighTemp}°`;
  document.querySelector('#lowTemp').textContent = `Low: ${displayData.currentLowTemp}°`;

  document.querySelector('#hour1').textContent = setHours(displayData.datetime.slice(0, 2), 1);
  document.querySelector('#hour2').textContent = setHours(displayData.datetime.slice(0, 2), 2);
  document.querySelector('#hour3').textContent = setHours(displayData.datetime.slice(0, 2), 3);
  document.querySelector('#hour4').textContent = setHours(displayData.datetime.slice(0, 2), 4);
  document.querySelector('#hour5').textContent = setHours(displayData.datetime.slice(0, 2), 5);

  document.querySelector('#hour1-icon').src = getIcon(displayData.hour1Icon);
  document.querySelector('#hour2-icon').src = getIcon(displayData.hour2Icon);
  document.querySelector('#hour3-icon').src = getIcon(displayData.hour3Icon);
  document.querySelector('#hour4-icon').src = getIcon(displayData.hour4Icon);
  document.querySelector('#hour5-icon').src = getIcon(displayData.hour5Icon);

  document.querySelector('#hour1-temp').textContent = `${displayData.hour1Temp}°`;
  document.querySelector('#hour2-temp').textContent = `${displayData.hour2Temp}°`;
  document.querySelector('#hour3-temp').textContent = `${displayData.hour3Temp}°`;
  document.querySelector('#hour4-temp').textContent = `${displayData.hour4Temp}°`;
  document.querySelector('#hour5-temp').textContent = `${displayData.hour5Temp}°`;

  document.querySelector('#day1').textContent = "Tomorrow";
  document.querySelector('#day2').textContent = setDay(displayData.day2Day);
  document.querySelector('#day3').textContent = setDay(displayData.day3Day);
  document.querySelector('#day4').textContent = setDay(displayData.day4Day);
  document.querySelector('#day5').textContent = setDay(displayData.day5Day);

  document.querySelector('#day1-icon').src = getIcon(displayData.day1Icon);
  document.querySelector('#day2-icon').src = getIcon(displayData.day2Icon);
  document.querySelector('#day3-icon').src = getIcon(displayData.day3Icon);
  document.querySelector('#day4-icon').src = getIcon(displayData.day4Icon);
  document.querySelector('#day5-icon').src = getIcon(displayData.day5Icon);

  document.querySelector('#day1-low-temp').textContent = `${displayData.day1TempLow}°`;
  document.querySelector('#day2-low-temp').textContent = `${displayData.day2TempLow}°`;
  document.querySelector('#day3-low-temp').textContent = `${displayData.day3TempLow}°`;
  document.querySelector('#day4-low-temp').textContent = `${displayData.day4TempLow}°`;
  document.querySelector('#day5-low-temp').textContent = `${displayData.day5TempLow}°`;

  document.querySelector('#day1-high-temp').textContent = `${displayData.day1TempHigh}°`;
  document.querySelector('#day2-high-temp').textContent = `${displayData.day2TempHigh}°`;
  document.querySelector('#day3-high-temp').textContent = `${displayData.day3TempHigh}°`;
  document.querySelector('#day4-high-temp').textContent = `${displayData.day4TempHigh}°`;
  document.querySelector('#day5-high-temp').textContent = `${displayData.day5TempHigh}°`;

  document.querySelector('#ly-hour0').textContent = "Now";
  document.querySelector('#ly-hour1').textContent = setHours(displayData.datetime.slice(0, 2), 1);
  document.querySelector('#ly-hour2').textContent = setHours(displayData.datetime.slice(0, 2), 2);
  document.querySelector('#ly-hour3').textContent = setHours(displayData.datetime.slice(0, 2), 3);
  document.querySelector('#ly-hour4').textContent = setHours(displayData.datetime.slice(0, 2), 4);
  document.querySelector('#ly-hour5').textContent = setHours(displayData.datetime.slice(0, 2), 5);

  document.querySelector('#ly-hour0-icon').src = getIcon(displayData.ly_hour0Icon);
  document.querySelector('#ly-hour1-icon').src = getIcon(displayData.ly_hour1Icon);
  document.querySelector('#ly-hour2-icon').src = getIcon(displayData.ly_hour2Icon);
  document.querySelector('#ly-hour3-icon').src = getIcon(displayData.ly_hour3Icon);
  document.querySelector('#ly-hour4-icon').src = getIcon(displayData.ly_hour4Icon);
  document.querySelector('#ly-hour5-icon').src = getIcon(displayData.ly_hour5Icon);

  document.querySelector('#ly-hour0-temp').textContent = `${displayData.ly_hour0Temp}°`;
  document.querySelector('#ly-hour1-temp').textContent = `${displayData.ly_hour1Temp}°`;
  document.querySelector('#ly-hour2-temp').textContent = `${displayData.ly_hour2Temp}°`;
  document.querySelector('#ly-hour3-temp').textContent = `${displayData.ly_hour3Temp}°`;
  document.querySelector('#ly-hour4-temp').textContent = `${displayData.ly_hour4Temp}°`;
  document.querySelector('#ly-hour5-temp').textContent = `${displayData.ly_hour5Temp}°`;

  document.querySelector('#ly-day0').textContent = displayData.ly_day0Day;
  document.querySelector('#ly-day1').textContent = setDay(displayData.day1Day);
  document.querySelector('#ly-day2').textContent = setDay(displayData.day2Day);
  document.querySelector('#ly-day3').textContent = setDay(displayData.day3Day);
  document.querySelector('#ly-day4').textContent = setDay(displayData.day4Day);
  document.querySelector('#ly-day5').textContent = setDay(displayData.day5Day);

  document.querySelector('#ly-day0-icon').src = getIcon(displayData.day0Icon);
  document.querySelector('#ly-day1-icon').src = getIcon(displayData.day1Icon);
  document.querySelector('#ly-day2-icon').src = getIcon(displayData.day2Icon);
  document.querySelector('#ly-day3-icon').src = getIcon(displayData.day3Icon);
  document.querySelector('#ly-day4-icon').src = getIcon(displayData.day4Icon);
  document.querySelector('#ly-day5-icon').src = getIcon(displayData.day5Icon);

  document.querySelector('#ly-day0-low-temp').textContent = `${displayData.ly_day0TempLow}°`;
  document.querySelector('#ly-day1-low-temp').textContent = `${displayData.ly_day1TempLow}°`;
  document.querySelector('#ly-day2-low-temp').textContent = `${displayData.ly_day2TempLow}°`;
  document.querySelector('#ly-day3-low-temp').textContent = `${displayData.ly_day3TempLow}°`;
  document.querySelector('#ly-day4-low-temp').textContent = `${displayData.ly_day4TempLow}°`;
  document.querySelector('#ly-day5-low-temp').textContent = `${displayData.ly_day5TempLow}°`;

  document.querySelector('#ly-day0-high-temp').textContent = `${displayData.ly_day0TempHigh}°`;
  document.querySelector('#ly-day1-high-temp').textContent = `${displayData.ly_day1TempHigh}°`;
  document.querySelector('#ly-day2-high-temp').textContent = `${displayData.ly_day2TempHigh}°`;
  document.querySelector('#ly-day3-high-temp').textContent = `${displayData.ly_day3TempHigh}°`;
  document.querySelector('#ly-day4-high-temp').textContent = `${displayData.ly_day4TempHigh}°`;
  document.querySelector('#ly-day5-high-temp').textContent = `${displayData.ly_day5TempHigh}°`;
}

function cleanLocation(location) {
  let split = location.split(",");
  let concat = `${split[0]},${split[1]}`;
  storeLocation(concat);
  return concat;
}

function setHours(currentHour, shift) {
  if (Number(currentHour) + shift < 24) {
    return Number(currentHour) + shift;
  } else {
    return (Number(currentHour) + shift) - 24;
  }
}

function setDay(dateData) {
  const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  const date = new Date(`${dateData}T00:00:00`);
  let day = weekday[date.getDay()];
  return day;
}

function getIcon(iconId) {
  switch (iconId) {
    case "snow" :
      return "images/snow.svg";
    case "rain" :
      return "images/rain.svg";
    case "fog" :
      return "images/fog.svg";
    case "wind" :
      return "images/wind.svg";
    case "cloudy" :
      return "images/cloudy.svg";
    case "partly-cloudy-day" :
      return "images/partly-cloudy-day.svg";
    case "partly-cloudy-night" :
      return "images/partly-cloudy-night.svg";
    case "clear-day" :
      return "images/clear-day.svg";
    case "clear-night" :
      return "images/clear-night.svg";
    default :
      return "images/default.svg";
  }
}

function getUnit() {
  const userUnit = document.getElementById('tog');

  if (userUnit.checked === false) {
    return "us"
  } else {
    return "metric"
  }
}

function clearDisplay() {
  const top = document.querySelector('.top');
  top.textContent = "";

  const middle = document.querySelector('.middle');
  middle.textContent = "";

  const bottom = document.querySelector('.bottom');
  bottom.textContent = "";
}

function updateBackground(icon) {
  const bgc = document.querySelector('body');

  switch (icon) {
    case "snow" :
      bgc.style.cssText = "background-color: #F1F1F1; color: black";
      break;
    case "rain" :
      bgc.style.cssText = "background-color: #A7C2E5; color: black";
      break;
    case "fog" :
      bgc.style.cssText = "background-color: #7F9BA6; color: black";
      break;
    case "wind" :
      bgc.style.cssText = "background-color: #AABFCC; color: black";
      break;
    case "cloudy" :
      bgc.style.cssText = "background-color: #E4E6ED; color: black";
      break;
    case "partly-cloudy-day" :
      bgc.style.cssText = "background-color: #C8F4F9; color: black";
      break;
    case "partly-cloudy-night" :
      bgc.style.cssText = "background-color: #214358; color: white";
      break;
    case "clear-day" :
      bgc.style.cssText = "background-color: #FFDF40; color: black";
      break;
    case "clear-night" :
      bgc.style.cssText = "background-color: #151B25; color: white";
      break;;
    default :
    bgc.style.cssText = "background-color: #AABFCC; color: black";
      break;
  }
}

// For storing/retrieving last searched location

if (storageAvailable("localStorage")) {
  retrieveLocation();
}

function storageAvailable(type) {
  let storage;
  try {
    storage = window[type];
    const x = "__storage_test__";
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return (
      e instanceof DOMException &&
      e.name === "QuotaExceededError" &&
      // acknowledge QuotaExceededError only if there's something already stored
      storage &&
      storage.length !== 0
    );
  }
}

function storeLocation(location) {
  localStorage.setItem("location", JSON.stringify(location));
}

function retrieveLocation() {
  const storedLocation = localStorage.getItem("location");
  const parsedLocation = JSON.parse(storedLocation);
  if (!parsedLocation) {
    return "empty";
  } else {
    const locationField = document.getElementById('userLocation');
    locationField.value = parsedLocation; 
    getWeather();
  }
}