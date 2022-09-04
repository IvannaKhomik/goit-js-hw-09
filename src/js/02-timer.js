import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

let intervalId = null;

const input = document.querySelector('#datetime-picker');
const btn = document.querySelector('button[data-start');
const timerDaysSpan = document.querySelector('span[data-days]');
const timerHoursSpan = document.querySelector('span[data-hours]');
const timerMinutesSpan = document.querySelector('span[data-minutes]');
const timerSecondsSpan = document.querySelector('span[data-seconds]');

btn.addEventListener('click', startTimer);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const currentDate = Date.now();
    const choosingDate = selectedDates[0].getTime();
    btn.setAttribute('disabled', '');
    if (choosingDate <= currentDate) {
      // return window.alert('Please choose a date in the future');
      Notify.failure('Please choose a date in the future', {
        timeout: 3000,
        clickToClose: true,
      });
    }
    btn.removeAttribute('disabled', '');
  },
};

flatpickr('#datetime-picker', options);

let isActive = false;

function startTimer() {
  if (isActive) {
    return;
  }
  const startTime = new Date(input.value).getTime();

  intervalId = setInterval(() => {
    isActive = true;
    const currentTime = Date.now();
    const deltaTime = startTime - currentTime;
    const { days, hours, minutes, seconds } = convertMs(deltaTime);

    timerDaysSpan.textContent = `${days}`;
    timerHoursSpan.textContent = `${hours}`;
    timerMinutesSpan.textContent = `${minutes}`;
    timerSecondsSpan.textContent = `${seconds}`;
    if (deltaTime < 1000) {
      clearInterval(intervalId);
      isActive = false;
    }
  }, 1000);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minu millisecondstes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}
