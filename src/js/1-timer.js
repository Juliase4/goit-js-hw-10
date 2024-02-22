// Описаний у документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';

// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

const inputEl = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('button');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minsEl = document.querySelector('[data-minutes]');
const secsEl = document.querySelector('[data-seconds]');

let userSelectedDate = '';
startBtn.disabled = true;

const options = {
  enableTime: true, // Включити можливість вибору часу
  time_24hr: true, // Використовувати 24-годинний формат часу
  defaultDate: new Date(), // Встановити поточну дату як дефолтну
  minuteIncrement: 1, // Інкремент для вибору хвилин
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];

    // Валідація та дії для кнопки "Start"
    if (userSelectedDate < new Date())
      userSelectedDate = selectedDates[0].getTime();
    const currentDateTimestamp = Date.now();
    if (userSelectedDate <= currentDateTimestamp) {
      iziToast.error({
        color: 'red',
        message: 'Please choose a date in the future',
        position: 'topRight',
        progressBarColor: 'rgb(255, 0, 0)',
        timeout: 3000,
      });
      startBtn.disabled = true;
    } else {
      startBtn.disabled = false;
    }
  },
};

flatpickr('#datetime-picker', options);

startBtn.addEventListener('click', onStartBtn);

let interval;

function onStartBtn() {
  interval = setInterval(() => {
    const ms = userSelectedDate - Date.now();
    if (ms <= 0) {
      clearInterval(interval);
      return;
    }
    updateClockFace(convertMs(ms));
  }, 1000);
  startBtn.disabled = true;
  inputEl.setAttribute('disabled', 'true');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function updateClockFace({ days, hours, minutes, seconds }) {
  daysEl.textContent = `${addLeadingZero(days)}`;
  hoursEl.textContent = `${addLeadingZero(hours)}`;
  minsEl.textContent = `${addLeadingZero(minutes)}`;
  secsEl.textContent = `${addLeadingZero(seconds)}`;
}
