const apiKey = 'PN8RHXTN8SN6DFG8DGBSBE9GS'

async function getData(location, unit) {
  try {
    const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=${unit}&key=${apiKey}`);
    if (!response.ok) {
      throw 'something went wrong!';
    }
    const data = await response.json();
    return data;
  } catch(error) {
    console.warn(error);
  }
  
}

let displayData = {};
getData("boulder", "us").then((data) => {
  console.log(data);
  const hour = data.currentConditions.datetime.slice(0,2);
  displayData = {
    datetime : data.currentConditions.datetime,
    location : data.resolvedAddress,

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
  console.log(displayData);
}) 

function setHours(currentHour, shift) {
  if (Number(currentHour) + shift <= 24) {
    return Number(currentHour) + shift;
  } else {
    return (Number(currentHour) + shift) - 24;
  }
}