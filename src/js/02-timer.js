import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";


const refs = {
  inputDate: document.querySelector('#datetime-picker'),
  btnStart: document.querySelector('[data-start]'),
  tableDay: document.querySelector('[data-days]'),
  tableHours: document.querySelector('[data-hours]'),
  tableMinutes: document.querySelector('[data-minutes]'),
  tableSeconds: document.querySelector('[data-seconds]'),
}

let choseDate = null;
let timerId = null;

switchBtn(false);

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        choseDate = selectedDates[0]
        checkDate();
    },
  };

flatpickr(refs.inputDate, options);

refs.btnStart.addEventListener('click', startTimer);


function switchBtn(boolean) {
  refs.btnStart.disabled = !boolean;
}

function checkDate() {
  if(choseDate > new Date) {
    switchBtn(true);
  } else {
    alert("Please choose a date in the future")
  }
}

function startTimer() {
  
  switchBtn(false);
  refs.inputDate.disabled = true;

  timerId = setInterval(() => {
    let timeDiff = choseDate - new Date;
    if(timeDiff <= 0) {
      clearInterval(timerId);
      refs.inputDate.disabled = false;
      return
    }
    const convertMsDate = convertMs(timeDiff);
    showTime(convertMsDate);

  }, 1000);
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
    return { days, hours, minutes, seconds };
} 
 
function showTime({days, hours, minutes, seconds}) {
    refs.tableDay.textContent = addLeadingZero(days);
    refs.tableHours.textContent = addLeadingZero(hours);
    refs.tableMinutes.textContent = addLeadingZero(minutes);
    refs.tableSeconds.textContent = addLeadingZero(seconds);
}