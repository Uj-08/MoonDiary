const toggleButton = document.getElementsByClassName('toggle-button')[0];
const navbarLinks = [document.getElementsByClassName('nav__links')[0], document.getElementsByClassName('nav__social')[0]]

toggleButton.addEventListener('click', () => {
  navbarLinks.forEach(element => {
    element.classList.toggle('active')
    // console.log(event)
  });
});