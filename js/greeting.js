const loginInput = document.querySelector("#login-form input");
const loginForm = document.querySelector("#login-form");
const greeting = document.querySelector("#greeting");
const clock = document.querySelector("#clock");
const weather = document.querySelector("#weather");

const HIDDEN_CLASSNAME = "hidden";
const USERNAME_KEY = "username";

function onLoginSubmit(event) {
  if (event.keyCode == 13) {
    event.preventDefault();
    loginForm.classList.add(HIDDEN_CLASSNAME);
    const username = loginInput.value;
    localStorage.setItem(USERNAME_KEY, username);
    paintGreeting(username);
  }
}

function paintGreeting(username) {
  weather.classList.remove(HIDDEN_CLASSNAME);
  navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);
  clock.classList.remove(HIDDEN_CLASSNAME);
  greeting.classList.remove(HIDDEN_CLASSNAME);
  greeting.innerText = `Welcome, ${username}!`;
}

const savedUsername = localStorage.getItem(USERNAME_KEY);

if (savedUsername == null) {
  loginForm.classList.remove(HIDDEN_CLASSNAME);
  clock.classList.add(HIDDEN_CLASSNAME);
  loginForm.addEventListener("keydown", onLoginSubmit);
} else {
  paintGreeting(savedUsername);
}
