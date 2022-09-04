const btnStart = document.querySelector('button[data-start]');
const btnStop = document.querySelector('button[data-stop]');

btnStart.addEventListener('click', onClickStartBtn);
btnStop.addEventListener('click', onClickStopBtn);

let isActive = false;
let intervalId = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function onClickStartBtn(e) {
  if (isActive) {
    return;
  }
  intervalId = setInterval(() => {
    btnStart.parentNode.style.backgroundColor = getRandomHexColor();
  }, 1000);
  e.currentTarget.setAttribute('disabled', '');
  btnStop.removeAttribute('disabled', '');
}

function onClickStopBtn(e) {
  clearTimeout(intervalId);
  btnStart.removeAttribute('disabled', '');
  e.currentTarget.setAttribute('disabled', '');
}
