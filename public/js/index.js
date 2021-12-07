const weatherForm = document.querySelector("form");
const weatherInput = document.querySelector("input");
const para = document.querySelector(".weatherData");
weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = weatherInput.value;

  const weatherApi = (location = "Mumbai") => {
    const weatherData = fetch(
      `http://localhost:3000/weather?address=${location}`
    )
      .then((res) => res.json())
      .then((data) => {
        para.textContent = `${data.response.forecast}`;
      })
      .catch((err) => {
        if (err === "SyntaxError: Unexpected token P in JSON at position 0") {
          return (para.textContent = "Please enter valid location.");
        }
      });

    //   console.log(weatherData);
    weatherInput.value = "";
  };
  weatherApi(location);
});

// #3E00FF
// #590995
// #DC2ADE
// #6927FF
