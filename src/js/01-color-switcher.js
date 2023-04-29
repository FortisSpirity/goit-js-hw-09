const startButton = document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop]');

const colorChanger = (() => {
  let colorInterval = null;

  function start() {
    startButton.disabled = true;
    stopButton.disabled = false;

    colorInterval = setInterval(() => {
      document.body.style.backgroundColor = getRandomColor();
    }, 1000);
  }

  function stop() {
    clearInterval(colorInterval);
    startButton.disabled = false;
    stopButton.disabled = true;
  }

  return {
    start,
    stop
  };
})();

stopButton.disabled = true;
startButton.addEventListener('click', colorChanger.start);
stopButton.addEventListener('click', colorChanger.stop);

function getRandomColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
}
