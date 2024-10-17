    // Check for saved theme in localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      document.documentElement.setAttribute('data-theme', savedTheme);
      document.getElementById('theme-icon').className = savedTheme === 'dark' ? 'fa fa-moon' : 'fa fa-sun';
    }

    document.getElementById('theme-toggle').addEventListener('click', function() {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      document.getElementById('theme-icon').className = newTheme === 'dark' ? 'fa fa-moon' : 'fa fa-sun';
    });