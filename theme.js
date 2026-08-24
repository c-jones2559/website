(function () {
  const STORAGE_KEY = 'theme-preference';

  function getThemePreference() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'dark' || saved === 'light') {
      return saved;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark-mode');
    } else {
      document.documentElement.classList.remove('dark-mode');
    }
    updateToggleButtons(theme);
  }

  function updateToggleButtons(theme) {
    const buttons = document.querySelectorAll('.theme-toggle-btn');
    const isDark = theme === 'dark';
    buttons.forEach((btn) => {
      btn.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
      btn.setAttribute('title', isDark ? 'Switch to light mode' : 'Switch to dark mode');
      const icon = btn.querySelector('.theme-icon');
      const text = btn.querySelector('.theme-text');
      if (icon && text) {
        icon.textContent = isDark ? '☀️' : '🌙';
        text.textContent = isDark ? 'Light' : 'Dark';
      } else {
        btn.innerHTML = isDark
          ? '<span class="theme-icon">☀️</span> <span class="theme-text">Light</span>'
          : '<span class="theme-icon">🌙</span> <span class="theme-text">Dark</span>';
      }
    });
  }

  function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme') || getThemePreference();
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    localStorage.setItem(STORAGE_KEY, newTheme);
    applyTheme(newTheme);
  }

  // Apply immediately on script load
  const initialTheme = getThemePreference();
  applyTheme(initialTheme);

  // Bind to buttons once DOM is available
  function initButtons() {
    const buttons = document.querySelectorAll('.theme-toggle-btn');
    buttons.forEach((btn) => {
      btn.removeEventListener('click', toggleTheme);
      btn.addEventListener('click', toggleTheme);
    });
    updateToggleButtons(document.documentElement.getAttribute('data-theme') || getThemePreference());
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initButtons);
  } else {
    initButtons();
  }

  // Watch for system preference changes if no manual preference is saved
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem(STORAGE_KEY)) {
      applyTheme(e.matches ? 'dark' : 'light');
    }
  });

  window.toggleTheme = toggleTheme;
})();
