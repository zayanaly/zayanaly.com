(function () {
  const root = document.documentElement;
  const toggle = document.querySelector('[data-theme-toggle]');
  const themeColor = document.querySelector('meta[name="theme-color"]');
  const media = window.matchMedia('(prefers-color-scheme: dark)');

  const resolvedTheme = () => root.dataset.theme || (media.matches ? 'dark' : 'light');

  function syncThemeControl() {
    const current = resolvedTheme();
    const next = current === 'dark' ? 'light' : 'dark';
    if (toggle) {
      toggle.setAttribute('aria-label', `Use ${next} theme`);
      toggle.setAttribute('title', `Use ${next} theme`);
      const label = toggle.querySelector('[data-theme-label]');
      if (label) label.textContent = `Use ${next} theme`;
    }
    if (themeColor) themeColor.setAttribute('content', current === 'dark' ? '#141210' : '#f4f0e8');
  }

  if (toggle) {
    toggle.addEventListener('click', () => {
      const next = resolvedTheme() === 'dark' ? 'light' : 'dark';
      root.dataset.theme = next;
      try {
        window.localStorage.setItem('zayan-theme', next);
      } catch (_) {
        // Theme switching still works for the current page.
      }
      syncThemeControl();
    });
  }

  media.addEventListener?.('change', () => {
    if (!root.dataset.theme) syncThemeControl();
  });

  document.querySelectorAll('[data-year]').forEach((element) => {
    element.textContent = String(new Date().getFullYear());
  });

  syncThemeControl();
})();
