import { Notify } from 'notiflix';

Notify.init({
  width: '300px',
  distance: '20px',
  opacity: 0.9,
  borderRadius: '50px',
  timeout: 3000,
  clickToClose: true,
});

const refs = {
  form: document.querySelector('form'),
  firstDalay: document.querySelector('[name="delay"]'),
  stepDalay: document.querySelector('[name="step"]'),
  amount: document.querySelector('[name="amount"]')
}


refs.form.addEventListener('submit', (e) => {
  e.preventDefault()
  let delay = Number(refs.firstDalay.value);
  const step = Number(refs.stepDalay.value);
  const amount = Number(refs.form.amount.value);


  for (let index = 1; index <= amount; index += 1, delay += step) {
    createPromise(index, delay)
      .then(({ position, delay }) =>
        Notify.success(` Fulfilled promise ${position} in ${delay}ms`))
      .catch(({ position, delay }) =>
        Notify.failure(` Rejected promise ${position} in ${delay}ms`));
      }
  });

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}


