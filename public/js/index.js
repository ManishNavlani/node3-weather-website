const weatherForm = document.querySelector("form");
const weatherInput = document.querySelector("input");
const para = document.querySelector(".weatherData");
const img = document.querySelector(".img");
weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = weatherInput.value;

  const weatherApi = (location = "Mumbai") => {
    const weatherData = fetch(`/weather?address=${location}`)
      .then((res) => res.json())
      .then((data) => {
        img.style.display = "block";
        img.style.margin = "auto";
        img.src = `${data.response.img}`;
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
