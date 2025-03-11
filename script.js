const menuIcon = document.querySelector('#menu-icon');
const navLinks = document.querySelector('.nav-links');
const darkModeToggle = document.querySelector('#dark-mode-toggle');

menuIcon.onclick = () => {
  navLinks.classList.toggle('active');
};

function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
}

function toggleDarkMode() {
  let isDark = document.body.classList.toggle('dark-mode');
  localStorage.setItem('darkMode', isDark ? 'enabled' : 'disabled');

  darkModeToggle.textContent = isDark ? 'Light Mode' : 'Dark Mode';
}

// On page load
document.addEventListener('DOMContentLoaded', (event) => {
  if (localStorage.getItem('darkMode') === 'enabled') {
    document.body.classList.add('dark-mode');
  }
});
