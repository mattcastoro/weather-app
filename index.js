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

getData("boulder", "us").then((data) => {
  console.log(data);
  const displayData = {
    datetime : data.currentConditions.datetime,
    location : data.resolvedAddress,
    currentTemp : data.currentConditions.temp,
    feelsLike : data.currentConditions.feelslike,
    currentHighTemp : data.days[0].tempmax,
    currentLowTemp : data.days[0].tempmin,
    currentDayDescription : data.days[0].description,
  };
  console.log(displayData);
})
