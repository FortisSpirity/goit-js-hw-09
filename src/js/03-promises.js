import { Notify } from 'notiflix';

Notify.init({
  width: '300px',
  distance: '20px',
  opacity: 0.9,
  borderRadius: '50px',
  timeout: 3000,
  clickToClose: true,
});

const els = {
  form: document.querySelector('form'),
  delayInputs: [
    document.querySelector('[name="delay"]'),
    document.querySelector('[name="step"]'),
  ],
  amountInput: document.querySelector('[name="amount"]'),
};

els.form.addEventListener('submit', (e) => {
  e.preventDefault();
  let delay = Number(els.delayInputs[0].value);
  const step = Number(els.delayInputs[1].value);
  const amount = Number(els.amountInput.value);

  for (let index = 1; index <= amount; index++, delay += step) {
    createPromise(index, delay)
      .then(({ position, delay }) =>
        Notify.success(`Fulfilled promise ${position} in ${delay}ms`)
      )
      .catch(({ position, delay }) =>
        Notify.failure(`Rejected promise ${position} in ${delay}ms`)
      );
  }
});

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      shouldResolve ? resolve({ position, delay }) : reject({ position, delay });
    }, delay);
  });
}


