# weather-app
For this project I will be creating a simple weather application. A user will have the ability to select a location to view the weather from said location, as well as toggle between fahrenheit and celsius.  In order to provide the user with this ability, I will take the location, call an API service, process the returned data, and then display the appropriate to the user. Depending on the type of weather displayed the page will change it's "theme". For example, if the weather is cloudy, then the page's background color will be gray-is  

Weather conditions icons: https://www.svgrepo.com/collection/weather-line-icons/

## Running locally

The Visual Crossing API key is read by the local server from an environment variable or an ignored `.env` file so it is not exposed in browser JavaScript.

```sh
VISUAL_CROSSING_API_KEY=your_api_key npm start
```

Or add this to `.env`:

```sh
VISUAL_CROSSING_API_KEY=your_api_key
```

Then run:

```sh
npm start
```

Then open http://localhost:3000.
