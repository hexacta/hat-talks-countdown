const speed = 0.3; // viewport height per second
const freq = 3; // new drops per second
let currentFace = null;
const texts = [
  "🙌 Novedades 🙌",
  "🍺 Cervezas 🍺",
  "🏅 Premios 🏅",
  "🥃 Fernets 🥃",
  "🤦 Código 🤦",
  "🍻 Más cervezas 🍻",
  "🤜 Pshhs 🤛"
];

document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".button");
  buttons.forEach(button => button.addEventListener("click", onClick));
  setInterval(newDrop, 1000 / freq);
  initTextRotator();
});

function onClick(e) {
  const button = e.target;
  currentFace = button["src"];

  const audios = document.querySelectorAll("audio");
  audios.forEach(audio => audio.pause());
  const i = Math.floor(Math.random() * audios.length);
  audios[i].play();
}

function newDrop() {
  if (!currentFace) return;
  const rain = document.getElementById("rain");
  const drop = document.createElement("img");
  drop["className"] = "drop";
  drop["src"] = currentFace;
  rain.appendChild(drop);

  const left = Math.random() * 100 + "vw";
  const scale = 0.2 + 0.8 * Math.random();
  const time = 1 / (speed * scale);

  TweenMax.fromTo(
    drop,
    time,
    { left, scale },
    {
      bottom: "-100%",
      ease: Power0.easeNone,
      onComplete: () => rain.removeChild(drop)
    }
  );
  moveRight(drop);
}

function moveRight(drop) {
  TweenMax.to(drop, 0.8, {
    ease: Power2.easeInOut,
    rotation: 20,
    onComplete: moveLeft,
    onCompleteParams: [drop]
  });
}

function moveLeft(drop) {
  TweenMax.to(drop, 0.5, {
    ease: Power1.easeInOut,
    rotation: -20,
    onComplete: moveRight,
    onCompleteParams: [drop]
  });
}

function initTextRotator() {
  const timeline = new TimelineMax({ onComplete: () => timeline.restart() });
  texts.forEach(text => {
    timeline
      .set("p", { text })
      .to("p", 1, { scale: 2 })
      .to("p", 1, { scale: 0 });
  });
}
