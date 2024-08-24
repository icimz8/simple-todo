const textClock = document.querySelector('.clock .text');

function setTime() {
  const now = new Date();

  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

  textClock.innerText = `${hours}:${minutes}:${seconds}`
}

setInterval(setTime, 1000);