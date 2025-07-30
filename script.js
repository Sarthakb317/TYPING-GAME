const keys = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"];
const timestamps = [];
const keySound = new Audio("mixkit-cool-interface-click-tone-2568.wav");
keySound.volume = 0.5;

timestamps.unshift(getTimestamp());

function getRandomNumber(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomKey() {
  return keys[getRandomNumber(0, keys.length - 1)];
}

function targetRandomKey() {
  const key = document.getElementById(getRandomKey());
  key.classList.add("selected");
}

function getTimestamp() {
  return Math.floor(Date.now() / 1000);
}

document.addEventListener("keyup", event => {
  const keyPressed = String.fromCharCode(event.keyCode);
  const keyElement = document.getElementById(keyPressed);
  const highlightedKey = document.querySelector(".selected");

  if (!keyElement) return;

  keySound.currentTime = 0;
  keySound.play();

  keyElement.classList.add("hit");
  keyElement.addEventListener('animationend', () => {
    keyElement.classList.remove("hit");
  });

  if (keyPressed === highlightedKey?.innerHTML) {
    timestamps.unshift(getTimestamp());
    const elapsedTime = timestamps[0] - timestamps[1];
    const cpm = Math.round(60 / elapsedTime);
    document.getElementById("speed").innerText = `CPM: ${cpm}`;
    highlightedKey.classList.remove("selected");
    targetRandomKey();
  }
});

targetRandomKey();
