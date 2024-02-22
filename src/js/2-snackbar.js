// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

form.addEventListener('submit', createNotification);

function createNotification(event) {
  event.preventDefault();
  const delay = form.delay.value;
  const state = form.state.value;

  const promise = new Promise((resolve, reject) => {
    if (state === 'fulfilled') {
      setTimeout(() => resolve(delay), delay);
    } else if (state === 'rejected') {
      setTimeout(() => reject(delay), delay);
    }
  });

  // Registering promise callbacks
  promise
    .then(delay => {
      iziToast.success({
        message: `✅ Fulfilled promise in ${delay}ms`,
        color: 'green',
        progressBarColor: 'rgb(181,234,124)',
        position: 'topRight',
      });
    })
    .catch(delay => {
      iziToast.error({
        color: 'red',
        message: `❌ Rejected promise in ${delay}ms`,
        position: 'topRight',
        progressBarColor: 'rgb(255,190,190)',
      });
    });

  form.delay.value = '';
}
