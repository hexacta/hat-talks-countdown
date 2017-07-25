NodeList.prototype.slice = Array.prototype.slice;

const speed = 0.3; // viewport height per second
const freq = 3; // new drops per second
let currentFace = null;
const deadline = new Date(2017, 8, 8, 17, 00);
const texts = [
  "🙌 Novedades 🙌",
  "🍺 Cervezas 🍺",
  "🏅 Premios 🏅",
  "🥃 Fernets 🥃",
  "🤦 Código 🤦",
  "🍻 Más cervezas 🍻",
  "🤜 Pshhs 🤛"
];

const audios = document.querySelectorAll("audio").slice().sort(function() {
  return .5 - Math.random();
});
let lastAudioPlayed = 0;

document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".button");
  buttons.forEach(button => button.addEventListener("click", onClick));
  setInterval(newDrop, 1000 / freq);
  tick(); setInterval(tick, 1000);
  initTextRotator();
});

function onClick(e) {
  const button = e.target;
  currentFace = button["src"];

  audios.forEach(audio => audio.pause());
  lastAudioPlayed = (lastAudioPlayed + 1) % audios.length;
  audios[lastAudioPlayed].play();
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

function tick() {  
  const t = deadline - new Date();
  const seconds = Math.floor( (t/1000) % 60 );
  const minutes = Math.floor( (t/1000/60) % 60 );
  const hours = Math.floor( (t/(1000*60*60)) % 24 );
  const days = Math.floor( t/(1000*60*60*24) );
  const count = `${days}d ${hours}h ${minutes}m ${seconds}s`;
  document.getElementById("countdown").innerText = count;
}
