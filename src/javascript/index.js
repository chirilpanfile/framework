"use strict";

document.addEventListener("DOMContentLoaded", () => {
  console.log("MADE BY PANFILE KIRILL");
  console.log("Abstract Framework");
  console.log("v 1.0.0");
  document.getElementById("burger").addEventListener("click", toggleMenu);
  document.getElementById("overlay").addEventListener("click", toggleMenu);
  function toggleMenu() {
    document.getElementById("navbar").classList.toggle("active");
    document.getElementById("overlay").classList.toggle("active");
    document.getElementById("burger").classList.toggle("ab-burger-active");
  }
  document.getElementById("navbar").addEventListener("click", (e) => {
    if (e.target.hasAttribute("data-toggle") && window.innerWidth <= 992) {
      e.preventDefault();
      const menuItemHasChildren = e.target.parentElement;
      if (menuItemHasChildren.classList.contains("active")) {
        collapseSubMenu();
      } else {
        if (
          document
            .getElementById("navbar")
            .querySelector(".menu-item-child.active")
        ) {
          collapseSubMenu();
        }
        menuItemHasChildren.classList.add("active");
        const subMenu = menuItemHasChildren.querySelector(".ab-sub-menu");
        subMenu.style.maxHeight = subMenu.scrollHeight + "px";
      }
    }
  });
  function collapseSubMenu() {
    document
      .getElementById("navbar")
      .querySelector(".ab-menu-item-child.active .ab-sub-menu")
      .removeAttribute("style");
    document
      .getElementById("navbar")
      .querySelector(".ab-menu-item-child.active")
      .classList.remove("active");
  }
  window.addEventListener("resize", () => {
    if (this.innerWidth > 992) {
      if (document.getElementById("navbar").classList.contains("active")) {
        toggleMenu();
      }

      if (
        document
          .getElementById("navbar")
          .querySelector(".ab-menu-item-child.active")
      ) {
        collapseSubMenu();
      }
    }
  });
  document.querySelectorAll(".ab-carousel").forEach((carousel) => {
    insertNumbers(carousel);
    carousel.querySelector(".prev").addEventListener("click", (e) => {
      minusItem(carousel);
    });
    carousel.querySelector(".next").addEventListener("click", (e) => {
      plusItem(carousel);
    });
    showItems(carousel, 0);
  });

  function insertNumbers(carousel) {
    const length = carousel.querySelectorAll(".ab-carousel-item").length;
    for (let index = 0; index < length; index++) {
      const number = document.createElement("div");
      number.classList.add("numberText");
      number.innerText = index + 1 + " / " + length;
      carousel.querySelectorAll(".ab-carousel-item")[index].append(number);
    }
  }
  function plusItem(carousel) {
    let item = currentItem(carousel);
    carousel
      .querySelectorAll(".ab-carousel-item")
      [item].nextElementSibling.classList.contains("ab-carousel-item")
      ? showItems(carousel, item + 1)
      : showItems(carousel, 0);
  }

  function minusItem(carousel) {
    let item = currentItem(carousel);
    carousel.querySelectorAll(".ab-carousel-item")[item]
      .previousElementSibling != null
      ? showItems(carousel, item - 1)
      : showItems(
          carousel,
          carousel.querySelectorAll(".ab-carousel-item").length - 1
        );
  }

  function currentItem(carousel) {
    console.log(carousel);
    return [...carousel.querySelectorAll(".ab-carousel-item")].findIndex(
      (item) => item.style.display == "block"
    );
  }

  function showItems(carousel, item) {
    if (
      carousel.querySelectorAll(".ab-carousel-item")[currentItem(carousel)] !=
      undefined
    )
      carousel.querySelectorAll(".ab-carousel-item")[
        currentItem(carousel)
      ].style.display = "none";
    carousel.querySelectorAll(".ab-carousel-item")[item].style.display =
      "block";
  }
});
