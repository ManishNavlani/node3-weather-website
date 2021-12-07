const axios = require("axios");

const forecast = (location, callback) => {
  const url = "http://api.weatherstack.com/current";
  const params = {
    access_key: "fbd23933c1c0c3f29e358be7387f0969",
    query: location,
    units: "m",
  };

  axios
    .get(url, { params })
    .then((response) => {
      const data = response.data;
      const { name } = data.location;
      const { temperature, feelslike } = data.current;
      if (data.error) {
        throw new Error(
          "Unable to make response from services.Try another search"
        );
      }
      callback(undefined, {
        location: name,
        temperature: temperature,
        forecast: `The Temperature of ${name} is ${temperature} celsius degree, but outside it feels like ${feelslike}`,
        img: data.current.weather_icons[0],
      });
    })
    .catch((error) => {
      if (error.code === "ENOTFOUND") {
        callback("Something went wrong.", undefined);
      } else {
        callback(error.message, undefined);
      }
    });
};

forecast("austria", (err, response) => {
  if (err) {
    console.log(err);
  } else {
    console.log(response);
  }
});
module.exports = forecast;
