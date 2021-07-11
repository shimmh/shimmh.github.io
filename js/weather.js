const API_KEY = "7ad78eebbbef14c7644968c6101a309f";

function onGeoOk(position) {
  const lat = position.coords.latitude;
  const lng = position.coords.longitude;
  const url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const temp = document.querySelector("#weather span");
      const city = document.querySelector("#weather div");
      console.log(data.name);
      temp.innerText = `${data.main.temp}°`;
      city.innerText = `${data.name}`;
    });
}

function onGeoError() {}
