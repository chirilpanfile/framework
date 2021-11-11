const navLink = document.querySelectorAll(".ab-nav-link");
document.querySelector(".ab-hamburger").addEventListener("click", function() {
    document.querySelector(".ab-hamburger").classList.toggle("active");
    document.querySelector(".ab-nav-menu").classList.toggle("active");
});
navLink.forEach(n => n.addEventListener("click", function() {
    document.querySelector(".ab-hamburger").classList.remove("active");
    document.querySelector(".ab-nav-menu").classList.remove("active");
}));

