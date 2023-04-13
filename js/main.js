// select elements from the HTML document and assign them to variables in JavaScript
const form = document.querySelector("form");
const input = document.querySelector("input");
const weatherDiv = document.querySelector("#weather");
const cityTime = document.querySelector("#cityTime");
const body = document.querySelector("body");

// attach an event listener to the submit event of the HTML form element
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = input.value;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=1c46ab2790dbd1be365348f91b70dda1&units=imperial`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const temperature = data.main.temp;
      const description = data.weather[0].description;
      const icon = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
      const timezone = data.timezone;
      const currentTime = new Date();
      const localTime = new Date(currentTime.getTime() + timezone * 1000);
      const timeString = localTime.toLocaleTimeString();

      weatherDiv.innerHTML = `
        <p><strong>Temperature:</strong> ${temperature}&deg;F</p>
        <p><strong>Description:</strong> ${description}</p>
        <img src="${icon}" alt="Weather icon">
      `;
      cityTime.innerHTML = `<p><strong> Current Time in ${location}:</strong> ${timeString}</p>`;
     
    })
    .catch((error) => {
      console.error("Error:", error);
      weatherDiv.textContent = "Sorry, something went wrong. Please try again.";
    });
});
