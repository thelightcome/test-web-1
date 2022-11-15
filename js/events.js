window.addEventListener("scroll", checkScroll);
document.addEventListener("DOMContentLoaded", checkScroll);

const body = document.querySelector(".body");
const wrapper = document.querySelector(".wrapper");
const slider = document.querySelector(".main__slider");
const sliderParent = document.querySelector(".slider__image-wrapper");

const list = document.querySelectorAll(".list__el");

function offset(el) {
  var rect = el.getBoundingClientRect(),
  scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
  scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
}

function checkScroll() {
  let scrollPos = window.scrollY;
  let elPos = offset(slider).top;
  if (scrollPos >= elPos - 50 && scrollPos <= elPos + 50) {
    slider.classList.remove("hidden");
    sliderParent.classList.remove("hidden");
    body.style.cssText = "overflow: hidden";
    //portfolio.style.cssText = `margin-bottom: 100vh;`;

    let activeSlide = document.querySelector(".swiper-slide-active");
    let background = activeSlide.getAttribute("data-background");
    slider.style.cssText = "background-color: " + background + ";";

    for (let i = 0; i < list.length; i++) {
      const el = list[i];
      el.classList.remove("active-el");
    }
    var active = document.querySelector(".swiper-slide-active");
    var slides = [...document.querySelectorAll(".slider__image")];
    var index = slides.indexOf(active);
    list[index].classList.add("active-el");
  } else if (scrollPos - 300 > elPos || scrollPos < elPos + slider.offsetHeight - 300) {
    slider.classList.remove("fixed-el");
    slider.classList.add("hidden");
  } else {
    slider.classList.add("hidden");
    //sliderParent.classList.add("hidden");
  }

  //console.log(scrollPos);
}

const portfolio = document.querySelector("main__portfolio");
const firstSlide = document.getElementById("slide1");
const lastSlide = document.getElementById("slide6");

function onEntry(entry) {
  entry.forEach(change => {
      if (change.isIntersecting) {
        slider.classList.add("fixed-el");
        var activeSlide = document.querySelector('.swiper-slide-active');
        var background = activeSlide.getAttribute('data-background');
        slider.style.cssText = "background-color: " + background + ";"

        var active = slider.querySelector(".swiper-slide-active");
        var slides = [...document.querySelectorAll(".slider__image")];
        var index = slides.indexOf(active);
        for (let i = 0; i < list.length; i++) {
          const el = list[i];
          el.classList.remove("active-el");
        }
        list[index].classList.add("active-el");

        var slides = [...document.querySelectorAll(".slider__image")];
        let hash = document.getElementById('firstSlide');
        let firstEl = slides.indexOf(hash);
        var lastEl = slides.length;
        if (!slider.classList.contains("hidden")) {
          if(lastEl === index + 1 || firstEl === index) {
              slider.classList.add("hidden");
              body.style.cssText = "overflow: auto; overflow-x: hidden;";
              //sliderParent.classList.add("hidden");
              slider.scrollIntoView({ block: "center", behavior: "auto" });
              let elPos = offset(slider).top;
              window.scrollTo(0, elPos);
          }
        }
      } else {
        body.style.cssText = "overflow: auto";
        for (let i = 0; i < list.length; i++) {
          const el = list[i];
          el.classList.remove("active-el");
        }
      }
      if (lastSlide.classList.contains("active-el")) {
        slider.classList.remove("fixed-el");
      }
      if (firstSlide.classList.contains("active-el")) {
        slider.classList.remove("fixed-el");
      }
  });
}

let options = {
  threshold: [0.9],
};

let observer = new IntersectionObserver(onEntry, options);
let elements = document.querySelectorAll(".slider__image");
for (let elm of elements) {
  observer.observe(elm);
}