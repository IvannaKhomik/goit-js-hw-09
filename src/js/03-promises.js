import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('.form');

const delayEl = document.getElementsByName('delay')[0];
const stepEl = document.getElementsByName('step')[0];
const amountEl = document.getElementsByName('amount')[0];

form.addEventListener('submit', onSubmit);

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position: position, delay: delay });
      }
      reject({ position: position, delay: delay });
    }, delay);
  });
}

function onSubmit(e) {
  e.preventDefault();

  let delay = Number(delayEl.value);
  const step = Number(stepEl.value);
  const amount = Number(amountEl.value);

  for (let position = 1; position <= amount; position += 1) {
    if (position > 1) {
      delay += step;
    }
    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay} ms`, {
          timeout: 2000,
        });
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay} ms`, {
          timeout: 2000,
        });
      });
  }
}
