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
  if (!userLocation.value) {
    alert("Please add a location before searching or selecting a degree unit.");
  } else {
    getDataPast(userLocation.value, unit).then((data) => {
      console.log(data);
    });

    getDataCurrent(userLocation.value, unit).then((data) => {
      console.log(data);
      const hour = data.currentConditions.datetime.slice(0,2);
      const displayData = {
        datetime : data.currentConditions.datetime,
        location : cleanLocation(data.resolvedAddress),

        currentTemp : Math.round(data.currentConditions.temp),
        feelsLike : Math.round(data.currentConditions.feelslike),
        currentHighTemp : Math.round(data.days[0].tempmax),
        currentLowTemp : Math.round(data.days[0].tempmin),
        currentIcon : data.currentConditions.icon,
        currentSunrise : data.currentConditions.sunrise.slice(0, 5),
        currentSunset : data.currentConditions.sunset.slice(0, 5),

        currentDayDescription : data.description,
        hour0Icon : data.currentConditions.icon,
        hour1Icon : data.days[0].hours[setHours(hour, 1)].icon,
        hour1Temp : Math.round(data.days[0].hours[setHours(hour, 1)].temp),
        hour2Icon : data.days[0].hours[setHours(hour, 2)].icon,
        hour2Temp : Math.round(data.days[0].hours[setHours(hour, 2)].temp),
        hour3Icon : data.days[0].hours[setHours(hour, 3)].icon,
        hour3Temp : Math.round(data.days[0].hours[setHours(hour, 3)].temp),
        hour4Icon : data.days[0].hours[setHours(hour, 4)].icon,
        hour4Temp : Math.round(data.days[0].hours[setHours(hour, 4)].temp),
        hour5Icon : data.days[0].hours[setHours(hour, 5)].icon,
        hour5Temp : Math.round(data.days[0].hours[setHours(hour, 5)].temp),

        day1Day : data.days[1].datetime,
        day1Icon : data.days[1].icon,
        day1TempLow : Math.round(data.days[1].tempmin),
        day1TempHigh : Math.round(data.days[1].tempmax),
        day2Day : data.days[2].datetime,
        day2Icon : data.days[2].icon,
        day2TempLow : Math.round(data.days[2].tempmin),
        day2TempHigh : Math.round(data.days[2].tempmax),
        day3Day : data.days[3].datetime,
        day3Icon : data.days[3].icon,
        day3TempLow : Math.round(data.days[3].tempmin),
        day3TempHigh : Math.round(data.days[3].tempmax),
        day4Day : data.days[4].datetime,
        day4Icon : data.days[4].icon,
        day4TempLow : Math.round(data.days[4].tempmin),
        day4TempHigh : Math.round(data.days[4].tempmax),
        day5Day : data.days[5].datetime,
        day5Icon : data.days[5].icon,
        day5TempLow : Math.round(data.days[5].tempmin),
        day5TempHigh : Math.round(data.days[5].tempmax),
      };
      console.log(displayData);
      displayWeather(displayData);
    })
  }
}

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


  const bottom = document.querySelector('.bottom');

  const dailyForecast = document.createElement('div');
  bottom.appendChild(dailyForecast);
  dailyForecast.textContent = "5-DAY FORECAST";
  dailyForecast.classList.add('subheading');

  const hontainerDaily = document.createElement('div');
  bottom.appendChild(hontainerDaily);
  hontainerDaily.classList.add('hontainer');

  const vontainerDays = document.createElement('div');
  hontainerDaily.appendChild(vontainerDays);
  vontainerDays.classList.add("vontainer");

  const dayDay0 = document.createElement('div');
  vontainerDays.appendChild(dayDay0);
  dayDay0.textContent = "Today";
  dayDay0.classList.add('content');

  const dayDay1 = document.createElement('div');
  vontainerDays.appendChild(dayDay1);
  dayDay1.textContent = setDay(displayData.day1Day);
  dayDay1.classList.add('content');

  const dayDay2 = document.createElement('div');
  vontainerDays.appendChild(dayDay2);
  dayDay2.textContent = setDay(displayData.day2Day);
  dayDay2.classList.add('content');

  const dayDay3 = document.createElement('div');
  vontainerDays.appendChild(dayDay3);
  dayDay3.textContent = setDay(displayData.day3Day);
  dayDay3.classList.add('content');

  const dayDay4 = document.createElement('div');
  vontainerDays.appendChild(dayDay4);
  dayDay4.textContent = setDay(displayData.day4Day);
  dayDay4.classList.add('content');

  const dayDay5 = document.createElement('div');
  vontainerDays.appendChild(dayDay5);
  dayDay5.textContent = setDay(displayData.day5Day);
  dayDay5.classList.add('content');

  const vontainerIcon = document.createElement('div');
  hontainerDaily.appendChild(vontainerIcon);
  vontainerIcon.classList.add("vontainer");

  const iconDay0 = document.createElement('img');
  vontainerIcon.appendChild(iconDay0);
  iconDay0.src = getIcon(displayData.currentIcon);
  iconDay0.classList.add('content', 'icon');

  const iconDay1 = document.createElement('img');
  vontainerIcon.appendChild(iconDay1);
  iconDay1.src = getIcon(displayData.day1Icon);
  iconDay1.classList.add('content', 'icon');

  const iconDay2 = document.createElement('img');
  vontainerIcon.appendChild(iconDay2);
  iconDay2.src = getIcon(displayData.day2Icon);
  iconDay2.classList.add('content', 'icon');

  const iconDay3 = document.createElement('img');
  vontainerIcon.appendChild(iconDay3);
  iconDay3.src = getIcon(displayData.day3Icon);
  iconDay3.classList.add('content', 'icon');

  const iconDay4 = document.createElement('img');
  vontainerIcon.appendChild(iconDay4);
  iconDay4.src = getIcon(displayData.day4Icon);
  iconDay4.classList.add('content', 'icon');

  const iconDay5 = document.createElement('img');
  vontainerIcon.appendChild(iconDay5);
  iconDay5.src = getIcon(displayData.day5Icon);
  iconDay5.classList.add('content', 'icon');

  const vontainerTempLow = document.createElement('div');
  hontainerDaily.appendChild(vontainerTempLow);
  vontainerTempLow.classList.add("vontainer");

  const tempLowDay0 = document.createElement('div');
  vontainerTempLow.appendChild(tempLowDay0);
  tempLowDay0.textContent = displayData.currentLowTemp;
  tempLowDay0.classList.add('content');

  const tempLowDay1 = document.createElement('div');
  vontainerTempLow.appendChild(tempLowDay1);
  tempLowDay1.textContent = displayData.day1TempLow;
  tempLowDay1.classList.add('content');

  const tempLowDay2 = document.createElement('div');
  vontainerTempLow.appendChild(tempLowDay2);
  tempLowDay2.textContent = displayData.day2TempLow;
  tempLowDay2.classList.add('content');

  const tempLowDay3 = document.createElement('div');
  vontainerTempLow.appendChild(tempLowDay3);
  tempLowDay3.textContent = displayData.day3TempLow;
  tempLowDay3.classList.add('content');

  const tempLowDay4 = document.createElement('div');
  vontainerTempLow.appendChild(tempLowDay4);
  tempLowDay4.textContent = displayData.day4TempLow;
  tempLowDay4.classList.add('content');

  const tempLowDay5 = document.createElement('div');
  vontainerTempLow.appendChild(tempLowDay5);
  tempLowDay5.textContent = displayData.day5TempLow;
  tempLowDay5.classList.add('content');

  const vontainerTempHigh = document.createElement('div');
  hontainerDaily.appendChild(vontainerTempHigh);
  vontainerTempHigh.classList.add("vontainer");

  const tempHighDay0 = document.createElement('div');
  vontainerTempHigh.appendChild(tempHighDay0);
  tempHighDay0.textContent = displayData.currentHighTemp;
  tempHighDay0.classList.add('content');

  const tempHighDay1 = document.createElement('div');
  vontainerTempHigh.appendChild(tempHighDay1);
  tempHighDay1.textContent = displayData.day1TempHigh;
  tempHighDay1.classList.add('content');

  const tempHighDay2 = document.createElement('div');
  vontainerTempHigh.appendChild(tempHighDay2);
  tempHighDay2.textContent = displayData.day2TempHigh;
  tempHighDay2.classList.add('content');

  const tempHighDay3 = document.createElement('div');
  vontainerTempHigh.appendChild(tempHighDay3);
  tempHighDay3.textContent = displayData.day3TempHigh;
  tempHighDay3.classList.add('content');

  const tempHighDay4 = document.createElement('div');
  vontainerTempHigh.appendChild(tempHighDay4);
  tempHighDay4.textContent = displayData.day4TempHigh;
  tempHighDay4.classList.add('content');

  const tempHighDay5 = document.createElement('div');
  vontainerTempHigh.appendChild(tempHighDay5);
  tempHighDay5.textContent = displayData.day5TempHigh;
  tempHighDay5.classList.add('content');
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