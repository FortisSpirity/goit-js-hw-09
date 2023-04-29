import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const selectors = {
  input: document.querySelector("#datetime-picker"),
  buttonStart: document.querySelector("[data-start]"),
  tableDays: document.querySelector("[data-days]"),
  tableHours: document.querySelector("[data-hours]"),
  tableMinutes: document.querySelector("[data-minutes]"),
  tableSeconds: document.querySelector("[data-seconds]"),
};

let selectedDate = null;
let timerId = null;

toggleButton(false);

flatpickr(selectors.input, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose: ([date]) => {
    selectedDate = date;
    validateSelectedDate();
  },
});

selectors.buttonStart.addEventListener("click", startTimer);

function toggleButton(disabled) {
  selectors.buttonStart.disabled = !disabled;
}

function validateSelectedDate() {
  toggleButton(selectedDate > new Date());
  if (!selectors.buttonStart.disabled) alert("Please choose a date in the future");
}

function startTimer() {
  toggleButton(false);
  selectors.input.disabled = true;
  timerId = setInterval(() => {
    const timeDiff = selectedDate - new Date();
    if (timeDiff <= 0) {
      clearInterval(timerId);
      selectors.input.disabled = false;
      return;
    }
    const { days, hours, minutes, seconds } = convertMilliseconds(timeDiff);
    displayTime(days, hours, minutes, seconds);
  }, 1000);
}

const convertMilliseconds = (ms) => {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
};

const addLeadingZero = (value) => value.toString().padStart(2, "0");

const displayTime = (days, hours, minutes, seconds) => {
  selectors.tableDays.textContent = addLeadingZero(days);
  selectors.tableHours.textContent = addLeadingZero(hours);
  selectors.tableMinutes.textContent = addLeadingZero(minutes);
  selectors.tableSeconds.textContent = addLeadingZero(seconds);
};
