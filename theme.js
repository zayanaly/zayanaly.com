(function () {
  try {
    const savedTheme = window.localStorage.getItem('zayan-theme');
    if (savedTheme === 'light' || savedTheme === 'dark') {
      document.documentElement.dataset.theme = savedTheme;
    }
  } catch (_) {
    // The site still follows the system theme when storage is unavailable.
  }
})();
