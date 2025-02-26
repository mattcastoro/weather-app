const apiKey = 'PN8RHXTN8SN6DFG8DGBSBE9GS'

async function getData(location, unit) {
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=${unit}&key=${apiKey}`
  try {
    const response = await fetch(url);
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
  console.log(userLocation.value);
  getData(userLocation.value, "us").then((data) => {
    const hour = data.currentConditions.datetime.slice(0,2);
    const displayData = {
      datetime : data.currentConditions.datetime,
      location : cleanLocation(data.resolvedAddress),

      currentTemp : data.currentConditions.temp,
      feelsLike : data.currentConditions.feelslike,
      currentHighTemp : data.days[0].tempmax,
      currentLowTemp : data.days[0].tempmin,
      currentIcon : data.days[0].icon,

      currentDayDescription : data.days[0].description,
      hour0Icon : data.currentConditions.icon,
      hour1Icon : data.days[0].hours[setHours(hour, 1)].icon,
      hour1Temp : data.days[0].hours[setHours(hour, 1)].temp,
      hour2Icon : data.days[0].hours[setHours(hour, 2)].icon,
      hour2Temp : data.days[0].hours[setHours(hour, 2)].temp,
      hour3Icon : data.days[0].hours[setHours(hour, 3)].icon,
      hour3Temp : data.days[0].hours[setHours(hour, 3)].temp,
      hour4Icon : data.days[0].hours[setHours(hour, 4)].icon,
      hour4Temp : data.days[0].hours[setHours(hour, 4)].temp,
      hour5Icon : data.days[0].hours[setHours(hour, 5)].icon,
      hour5Temp : data.days[0].hours[setHours(hour, 5)].temp,

      day1Day : data.days[1].datetime,
      day1Icon : data.days[1].icon,
      day1TempLow : data.days[1].tempmin,
      day1TempHigh : data.days[1].tempmax,
      day2Day : data.days[2].datetime,
      day2Icon : data.days[2].icon,
      day2TempLow : data.days[2].tempmin,
      day2TempHigh : data.days[2].tempmax,
      day3Day : data.days[3].datetime,
      day3Icon : data.days[3].icon,
      day3TempLow : data.days[3].tempmin,
      day3TempHigh : data.days[3].tempmax,
      day4Day : data.days[4].datetime,
      day4Icon : data.days[4].icon,
      day4TempLow : data.days[4].tempmin,
      day4TempHigh : data.days[4].tempmax,
      day5Day : data.days[5].datetime,
      day5Icon : data.days[5].icon,
      day5TempLow : data.days[5].tempmin,
      day5TempHigh : data.days[5].tempmax,
    };
    console.log(data);
    console.log(displayData);
    displayWeather(displayData);
  })
}

function displayWeather(displayData) {
  const top = document.querySelector('.top');

  const searchLocation = document.createElement('div');
  top.appendChild(searchLocation);
  searchLocation.textContent = displayData.location;
  searchLocation.classList.add('heading');

  const currentTemp = document.createElement('div');
  top.appendChild(currentTemp);
  currentTemp.textContent = displayData.currentTemp;
  currentTemp.classList.add('title');

  const feelsLike = document.createElement('div');
  top.appendChild(feelsLike);
  feelsLike.textContent = `Feels Like: ${displayData.feelsLike}`;
  feelsLike.classList.add('content');

  const hontainerTemp = document.createElement('div');
  top.appendChild(hontainerTemp);
  hontainerTemp.classList.add('hontainer');

  const currentHigh = document.createElement('div');
  hontainerTemp.appendChild(currentHigh);
  currentHigh.textContent = `H: ${displayData.currentHighTemp}`;
  currentHigh.classList.add('content');
  
  const currentLow = document.createElement('div');
  hontainerTemp.appendChild(currentLow);
  currentLow.textContent = `L: ${displayData.currentLowTemp}`;
  currentLow.classList.add('content');

  const middle = document.querySelector('.middle');

  const description = document.createElement('div');
  middle.appendChild(description);
  description.textContent = displayData.currentDayDescription;
  description.classList.add('heading');

  const hontainerHourly = document.createElement('div');
  middle.appendChild(hontainerHourly);
  hontainerHourly.classList.add('hontainer');

  const vontainerHour0 = document.createElement('div');
  hontainerHourly.appendChild(vontainerHour0);
  vontainerHour0.classList.add('vontainer');

  const time0 = document.createElement('div');
  vontainerHour0.appendChild(time0);
  time0.textContent = "Now";
  time0.classList.add('content');

  const iconTime0 = document.createElement('img');
  vontainerHour0.appendChild(iconTime0);
  iconTime0.src = getIcon(displayData.hour0Icon);
  iconTime0.classList.add('content', 'icon');

  const tempTime0 = document.createElement('div');
  vontainerHour0.appendChild(tempTime0);
  tempTime0.textContent = displayData.currentTemp;
  tempTime0.classList.add('content');

  const vontainerHour1 = document.createElement('div');
  hontainerHourly.appendChild(vontainerHour1);
  vontainerHour1.classList.add('vontainer');

  const time1 = document.createElement('div');
  vontainerHour1.appendChild(time1);
  time1.textContent = setHours(displayData.datetime.slice(0, 2), 1);
  time1.classList.add('content');

  const iconTime1 = document.createElement('img');
  vontainerHour1.appendChild(iconTime1);
  iconTime1.src = getIcon(displayData.hour1Icon);
  iconTime1.classList.add('content', 'icon');

  const tempTime1 = document.createElement('div');
  vontainerHour1.appendChild(tempTime1);
  tempTime1.textContent = displayData.hour1Temp;
  tempTime1.classList.add('content');

  const vontainerHour2 = document.createElement('div');
  hontainerHourly.appendChild(vontainerHour2);
  vontainerHour2.classList.add('vontainer');

  const time2 = document.createElement('div');
  vontainerHour2.appendChild(time2);
  time2.textContent = setHours(displayData.datetime.slice(0, 2), 2);
  time2.classList.add('content');

  const iconTime2 = document.createElement('img');
  vontainerHour2.appendChild(iconTime2);
  iconTime2.src = getIcon(displayData.hour2Icon);
  iconTime2.classList.add('content', 'icon');

  const tempTime2 = document.createElement('div');
  vontainerHour2.appendChild(tempTime2);
  tempTime2.textContent = displayData.hour2Temp;
  tempTime2.classList.add('content');

  const vontainerHour3 = document.createElement('div');
  hontainerHourly.appendChild(vontainerHour3);
  vontainerHour3.classList.add('vontainer');

  const time3 = document.createElement('div');
  vontainerHour3.appendChild(time3);
  time3.textContent = setHours(displayData.datetime.slice(0, 2), 3);
  time3.classList.add('content');

  const iconTime3 = document.createElement('img');
  vontainerHour3.appendChild(iconTime3);
  iconTime3.src = getIcon(displayData.hour3Icon);
  iconTime3.classList.add('content', 'icon');

  const tempTime3 = document.createElement('div');
  vontainerHour3.appendChild(tempTime3);
  tempTime3.textContent = displayData.hour3Temp;
  tempTime3.classList.add('content');

  const vontainerHour4 = document.createElement('div');
  hontainerHourly.appendChild(vontainerHour4);
  vontainerHour4.classList.add('vontainer');

  const time4 = document.createElement('div');
  vontainerHour4.appendChild(time4);
  time4.textContent = setHours(displayData.datetime.slice(0, 2), 4);
  time4.classList.add('content');

  const iconTime4 = document.createElement('img');
  vontainerHour4.appendChild(iconTime4);
  iconTime4.src = getIcon(displayData.hour4Icon);
  iconTime4.classList.add('content', 'icon');

  const tempTime4 = document.createElement('div');
  vontainerHour4.appendChild(tempTime4);
  tempTime4.textContent = displayData.hour4Temp;
  tempTime4.classList.add('content');

  const vontainerHour5 = document.createElement('div');
  hontainerHourly.appendChild(vontainerHour5);
  vontainerHour5.classList.add('vontainer');

  const time5 = document.createElement('div');
  vontainerHour5.appendChild(time5);
  time5.textContent = setHours(displayData.datetime.slice(0, 2), 5);
  time5.classList.add('content');

  const iconTime5 = document.createElement('img');
  vontainerHour5.appendChild(iconTime5);
  iconTime5.src = getIcon(displayData.hour5Icon);
  iconTime5.classList.add('content', 'icon');

  const tempTime5 = document.createElement('div');
  vontainerHour5.appendChild(tempTime5);
  tempTime5.textContent = displayData.hour5Temp;
  tempTime5.classList.add('content');

  const bottom = document.querySelector('.bottom');

  const dailyForecast = document.createElement('div');
  bottom.appendChild(dailyForecast);
  dailyForecast.textContent = "5-DAY FORECAST";
  dailyForecast.classList.add('heading');

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
  return `${split[0]},${split[1]}`;
}

function setHours(currentHour, shift) {
  if (Number(currentHour) + shift <= 24) {
    return Number(currentHour) + shift;
  } else {
    return (Number(currentHour) + shift) - 24;
  }
}

function setDay(dateData) {
  console.log(`dateData = ${dateData}`);
  const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  const date = new Date(`${dateData}T00:00:00`);
  console.log(`date = ${date}`);
  let day = weekday[date.getDay()];
  console.log(`day = ${day}`);
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


