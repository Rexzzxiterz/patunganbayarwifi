const dino = document.getElementById("dino");
const cactus = document.getElementById("cactus");
const scoreText = document.getElementById("score");

// HIGH SCORE
let highScore =
localStorage.getItem("highscore") || 0;

// TAMPILKAN HIGH SCORE
document.getElementById("high").innerText =
"HI " +
String(highScore).padStart(5,'0');

// SOUND
const jumpSound = new Audio(
"https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3"
);

const hitSound = new Audio(
"https://assets.mixkit.co/active_storage/sfx/2220/2220-preview.mp3"
);

let score = 0;
let started = false;
let dead = false;

// LOMPAT
function jump(){

  if(dino.classList != "jump"){

    jumpSound.play();

    dino.classList.add("jump");

    setTimeout(()=>{

      dino.classList.remove("jump");

    },700);

  }

}

// START GAME
function startGame(){

  if(!started){

    started = true;

    cactus.classList.add("cactus-move");

    setInterval(()=>{

      if(!dead){

        score++;

        scoreText.innerText =
          String(score).padStart(5,'0');

      }

    },200);

  }

}

// CONTROL
function control(){

  startGame();

  jump();

}

// KEYBOARD
window.addEventListener("keydown",(e)=>{

  if(e.code === "Space"){

    control();

  }

});

// TOUCH HP
window.addEventListener("touchstart",()=>{

  control();

});

// DETEKSI TABRAKAN
let isAlive = setInterval(()=>{

  let dinoBottom =
    parseInt(
      window.getComputedStyle(dino)
      .getPropertyValue("bottom")
    );

  let cactusRight =
    parseInt(
      window.getComputedStyle(cactus)
      .getPropertyValue("right")
    );

  // COLLISION
  if(
    cactusRight > 880 &&
    cactusRight < 950 &&
    dinoBottom < 80
  ){

    dead = true;

    cactus.style.animation = "none";

    hitSound.play();

    // SAVE HIGH SCORE
    if(score > highScore){

      localStorage.setItem(
        "highscore",
        score
      );

    }

    setTimeout(()=>{

      alert(
        "Game Over!\n\n" +
        "Score: " + score +
        "\nHigh Score: " +
        localStorage.getItem("highscore")
      );

      location.reload();

    },200);

  }

},10);
