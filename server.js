const http = require("http");
const fs = require("fs");
const path = require("path");

const ROOT_DIR = __dirname;

loadEnvFile();

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "0.0.0.0";
const API_KEY = process.env.VISUAL_CROSSING_API_KEY;

const MIME_TYPES = {
  ".css": "text/css",
  ".html": "text/html",
  ".jpeg": "image/jpeg",
  ".js": "text/javascript",
  ".svg": "image/svg+xml",
};

const server = http.createServer(async (req, res) => {
  const requestUrl = new URL(req.url, `http://${req.headers.host}`);

  if (requestUrl.pathname.startsWith("/api/weather/")) {
    await handleWeatherRequest(requestUrl, res);
    return;
  }

  serveStaticFile(requestUrl.pathname, res);
});

server.listen(PORT, HOST, () => {
  console.log(`Weather app running on ${HOST}:${PORT}`);
});

async function handleWeatherRequest(requestUrl, res) {
  if (!API_KEY) {
    sendJson(res, 500, { error: "Missing VISUAL_CROSSING_API_KEY environment variable." });
    return;
  }

  const location = requestUrl.searchParams.get("location");
  const unit = requestUrl.searchParams.get("unit") || "us";

  if (!location) {
    sendJson(res, 400, { error: "Missing location query parameter." });
    return;
  }

  if (!["us", "metric"].includes(unit)) {
    sendJson(res, 400, { error: "Unit must be either 'us' or 'metric'." });
    return;
  }

  const timelinePath = buildTimelinePath(requestUrl.pathname, location);

  if (!timelinePath) {
    sendJson(res, 404, { error: "Unknown weather endpoint." });
    return;
  }

  const visualCrossingUrl = new URL(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${timelinePath}`
  );
  visualCrossingUrl.searchParams.set("unitGroup", unit);
  visualCrossingUrl.searchParams.set("key", API_KEY);

  try {
    const apiResponse = await fetch(visualCrossingUrl);
    const responseBody = await apiResponse.text();

    res.writeHead(apiResponse.status, {
      "Content-Type": apiResponse.headers.get("content-type") || "application/json",
    });
    res.end(responseBody);
  } catch (error) {
    console.error("Unable to fetch weather data:", error);
    sendJson(res, 502, { error: "Unable to fetch weather data." });
  }
}

function buildTimelinePath(endpoint, location) {
  const encodedLocation = encodeURIComponent(location);

  if (endpoint === "/api/weather/current") {
    return encodedLocation;
  }

  if (endpoint === "/api/weather/past") {
    const startDate = getLastYearDateString();
    const endDate = getLastYearPlusFiveDays();
    return `${encodedLocation}/${startDate}/${endDate}`;
  }

  return null;
}

function serveStaticFile(requestPath, res) {
  let decodedPath;

  try {
    decodedPath = decodeURIComponent(requestPath);
  } catch (error) {
    res.writeHead(400);
    res.end("Bad request");
    return;
  }

  const normalizedPath = path.normalize(decodedPath).replace(/^[/\\]+/, "");
  const filePath = path.join(ROOT_DIR, normalizedPath === "" ? "index.html" : normalizedPath);

  if (!filePath.startsWith(ROOT_DIR)) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }

  fs.readFile(filePath, (error, contents) => {
    if (error) {
      res.writeHead(404);
      res.end("Not found");
      return;
    }

    const contentType = MIME_TYPES[path.extname(filePath)] || "application/octet-stream";
    res.writeHead(200, { "Content-Type": contentType });
    res.end(contents);
  });
}

function sendJson(res, statusCode, data) {
  res.writeHead(statusCode, { "Content-Type": "application/json" });
  res.end(JSON.stringify(data));
}

function loadEnvFile() {
  const envPath = path.join(ROOT_DIR, ".env");

  if (!fs.existsSync(envPath)) {
    return;
  }

  const envContents = fs.readFileSync(envPath, "utf8");

  envContents.split(/\r?\n/).forEach((line) => {
    const trimmedLine = line.trim();

    if (!trimmedLine || trimmedLine.startsWith("#")) {
      return;
    }

    const separatorIndex = trimmedLine.indexOf("=");

    if (separatorIndex === -1) {
      return;
    }

    const key = trimmedLine.slice(0, separatorIndex).trim();
    const value = trimmedLine.slice(separatorIndex + 1).trim();

    if (key && !process.env[key]) {
      process.env[key] = value.replace(/^["']|["']$/g, "");
    }
  });
}

function getLastYearDateString() {
  const today = new Date();

  const lastYear = new Date(
    today.getFullYear() - 1,
    today.getMonth(),
    today.getDate()
  );

  return lastYear.toISOString().split("T")[0];
}

function getLastYearPlusFiveDays() {
  const today = new Date();

  today.setFullYear(today.getFullYear() - 1);
  today.setDate(today.getDate() + 5);

  return today.toISOString().split("T")[0];
}
