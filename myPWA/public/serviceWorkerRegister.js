if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./serviceWorker.js')
    .then(() => console.log('SW registered'))
    .catch(err => console.warn('SW failed', err));
}