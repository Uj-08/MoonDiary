const toggleButton = document.getElementsByClassName("toggle-button")[0];
const navbarLinks = [
  document.getElementsByClassName("nav__links")[0],
  document.getElementsByClassName("nav__social")[0],
];

toggleButton.addEventListener("click", () => {
  navbarLinks.forEach((element) => {
    element.classList.toggle("active");
    // console.log(event)
  });
});

// toggleButton.addEventListener("click", () => {
//   navbarLinks.forEach((element) => {
//     if (element.classList.contains("active")) {
//       element.classList.remove("active");
//     } else {
//       element.classList.add("active");
//     }
//   });
// });

const navbar = document.getElementById("navbar");
let lastScroll = window.scrollY;
window.addEventListener("scroll", () => {
  if (lastScroll < window.scrollY) {
    // console.log("We are going down");
    navbar.classList.add("hidden");
  } else {
    // console.log("We are going up");
    navbar.classList.remove("hidden");
  }
  lastScroll = window.scrollY;
});
