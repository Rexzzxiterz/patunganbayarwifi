const dino = document.getElementById("dino");
const cactus = document.getElementById("cactus");
const scoreText = document.getElementById("score");

let score = 0;
let started = false;
let dead = false;

// FUNCTION LOMPAT
function jump(){

  if(dino.classList != "jump"){

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

// CONTROL GAME
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

    alert("Game Over! Score: " + score);

    location.reload();

  }

},10);
