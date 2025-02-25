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
  console.log("I've been clicked!");
  getData("boulder", "us").then((data) => {
    const hour = data.currentConditions.datetime.slice(0,2);
    const displayData = {
      datetime : data.currentConditions.datetime,
      location : cleanLocation(data.resolvedAddress),

      currentTemp : data.currentConditions.temp,
      feelsLike : data.currentConditions.feelslike,
      currentHighTemp : data.days[0].tempmax,
      currentLowTemp : data.days[0].tempmin,

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

      day1Icon : data.days[1].icon,
      day1TempLow : data.days[1].tempmin,
      day1TempHigh : data.days[1].tempmax,
      day2Icon : data.days[2].icon,
      day2TempLow : data.days[2].tempmin,
      day2TempHigh : data.days[2].tempmax,
      day3Icon : data.days[3].icon,
      day3TempLow : data.days[3].tempmin,
      day3TempHigh : data.days[3].tempmax,
      day4Icon : data.days[4].icon,
      day4TempLow : data.days[4].tempmin,
      day4TempHigh : data.days[4].tempmax,
      day5Icon : data.days[5].icon,
      day5TempLow : data.days[5].tempmin,
      day5TempHigh : data.days[5].tempmax,
    };
    displayWeather(displayData);
  })
}

function setHours(currentHour, shift) {
  if (Number(currentHour) + shift <= 24) {
    return Number(currentHour) + shift;
  } else {
    return (Number(currentHour) + shift) - 24;
  }
}

function cleanLocation(location) {
  let split = location.split(",");
  return `${split[0]},${split[1]}`;
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

function displayWeather(displayData) {
  const test = document.querySelector('.test')
  const image = document.createElement('img');
  image.src = getIcon(displayData.hour0Icon);
  test.appendChild(image);
  console.log(displayData.hour0Icon);
}


