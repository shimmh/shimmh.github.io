const images = ["0.jpeg", "1.jpeg"];

const chosenImage = images[Math.floor(Math.random() * images.length)];
const bg = document.querySelector(".background");
const bgImage = document.createElement("img");

bgImage.src = `img/${chosenImage}`;
bg.appendChild(bgImage);
