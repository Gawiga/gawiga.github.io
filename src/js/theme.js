(function() {
  var themeToggle = document.getElementById('theme-toggle');
  if (!themeToggle) {
    return;
  }

  var root = document.documentElement;
  var activeTheme = root.getAttribute('data-theme') === 'light' ? 'light' : 'dark';

  function updateThemeToggle() {
    themeToggle.setAttribute('aria-pressed', String(activeTheme === 'light'));
    themeToggle.title = activeTheme === 'dark' ? 'Ativar tema claro' : 'Ativar tema escuro';
  }

  updateThemeToggle();
  themeToggle.addEventListener('click', function() {
    activeTheme = activeTheme === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', activeTheme);
    updateThemeToggle();

    try {
      localStorage.setItem('gawiga-theme', activeTheme);
    } catch (error) {}
  });
})();