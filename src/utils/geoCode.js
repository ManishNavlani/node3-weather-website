const axios = require("axios");

const geoCode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoibWFuaXNoLTciLCJhIjoiY2t3ZjMxcHlmMGFsbTMxcG1pemViM214dyJ9.yAFwVrbXWgCw_8u8-TqMgA&limit=1`;
  axios
    .get(url)
    .then((res) => {
      if (res.data.features.length === 0) {
        const { query } = res.data;
        throw new Error(
          `Please enter valid location. we can't find anything for ${query.join(
            " "
          )}`
        );
      }
      const { center: latLonArray } = res.data.features[0];
      const { place_name } = res.data.features[0];
      callback(undefined, {
        latitude: latLonArray[0],
        longitude: latLonArray[1],
        location: place_name,
      });
    })
    .catch((err) => {
      if (err.code === "ENOTFOUND") {
        callback("Please check your internet connection.", undefined);
      } else {
        callback(err.message, undefined);
      }
    });
};
// geoCode("ahmedabad", (error, response) => {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log(response);
//   }
// });

module.exports = geoCode;
