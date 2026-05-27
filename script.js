const dino =
document.getElementById("dino");

const cactus =
document.getElementById("cactus");

const scoreText =
document.getElementById("score");

const highText =
document.getElementById("high");

const panel =
document.getElementById("startPanel");

const gameover =
document.getElementById("gameover");

const restart =
document.getElementById("restart");

let started = false;
let dead = false;

let score = 0;

let highScore =
localStorage.getItem("highscore") || 0;

highText.innerText =
"HI " +
String(highScore).padStart(5,"0");

/* SOUND */
const jumpSound =
new Audio(
"https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3"
);

const hitSound =
new Audio(
"https://assets.mixkit.co/active_storage/sfx/2220/2220-preview.mp3"
);

/* JUMP */
function jump(){

  if(
    !dino.classList.contains("jump")
  ){

    jumpSound.play();

    dino.classList.add("jump");

    setTimeout(()=>{

      dino.classList.remove("jump");

    },700);

  }

}

/* START */
function startGame(){

  if(!started){

    started = true;

    cactus.classList.add("cactus-move");

    panel.style.display = "none";

    setInterval(()=>{

      if(!dead){

        score++;

        scoreText.innerText =
        String(score)
        .padStart(5,"0");

      }

    },120);

  }

}

/* CONTROL */
function control(){

  if(dead) return;

  startGame();

  jump();

}

/* KEYBOARD */
window.addEventListener(
"keydown",
(e)=>{

  if(e.code === "Space"){

    control();

  }

});

/* MOBILE */
window.addEventListener(
"touchstart",
()=>{

  control();

});

/* COLLISION */
setInterval(()=>{

  let dinoBottom =
  parseInt(
    window
    .getComputedStyle(dino)
    .getPropertyValue("bottom")
  );

  let cactusRight =
  parseInt(
    window
    .getComputedStyle(cactus)
    .getPropertyValue("right")
  );

  if(

    cactusRight > 1450 &&
    cactusRight < 1560 &&

    dinoBottom < 220

  ){

    dead = true;

    cactus.style.animation = "none";

    hitSound.play();

    if(score > highScore){

      localStorage.setItem(
        "highscore",
        score
      );

    }

    gameover.style.display = "flex";

  }

},10);

/* RESTART */
restart.onclick = ()=>{

  location.reload();

}
