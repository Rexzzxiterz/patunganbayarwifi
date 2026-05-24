const wheel = document.getElementById("wheel");
const btn = document.getElementById("spinBtn");
const result = document.getElementById("result");

const hadiah = [
  "100 Coins",
  "200 Coins",
  "Zonk",
  "500 Coins",
  "1000 Coins",
  "Coba Lagi"
];

let deg = 0;

btn.onclick = () => {

  btn.disabled = true;

  const random = Math.floor(Math.random() * 360);
  deg += 3600 + random;

  wheel.style.transform = `rotate(${deg}deg)`;

  setTimeout(() => {

    const index = Math.floor((360 - (random % 360)) / 60) % 6;

    result.innerText = "Hadiah: " + hadiah[index];

    btn.disabled = false;

  }, 5000);

};
