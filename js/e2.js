(function () {
  const newSlider = new Swiper('.slider__image-wrapper', {
    direction: 'vertical',

    keyboard: {
      enebled: true,
      pageUpDown: true,
      onlyInViewport: true,
    },

    mousewheel: {
      sensitivity: 10,
      releaseOnEdges: true,
      eventsTarget: ".slider-wrapper"
    },

    hashNavigation: {
      watchState: true,
    }
  });

  const overflow = $('.overflow');
  const sliderWrapper = $('.slider-wrapper');
  const height = sliderWrapper.height();
  const linkList = $('.list__el');
  const maxValue = linkList.length;

  overflow.css('height', maxValue * height + 'px');

  let overflowTop = overflow.offset().top;

  let item = 0;
  let prevScrollVal = $(window).scrollTop();
  let currentValue, shift;
  let duration = 500;
  let endPoint = (maxValue - 1) * height;

  $(window).on("onContentLoaded", scrollHandle);

  $(window).on("scroll", scrollHandle);

  function scrollHandle() {
    currentValue = $(window).scrollTop();
    shift = currentValue - overflowTop;
    prevScrollVal = currentValue;

    if (shift > 0 && shift < endPoint) {
      sliderWrapper.css('position', 'fixed');
      sliderWrapper.css('top', '0px');
      let setItem = Math.floor(shift / height);
      setSlide(setItem);
    } else {
      sliderWrapper.css('position', 'absolute');
      if (shift < 0) {
        setSlide(0);
        sliderWrapper.css('top', '0px');
      } else if (shift > endPoint) {
        setSlide(maxValue - 1);
        console.log(endPoint)
        sliderWrapper.css('top', endPoint + 'px');
      }
    }
  }

  function setSlide(i) {
    if (i !== item) {
      linkList.removeClass('active-el');
      linkList[i] && linkList[i].classList.add('active-el');
      let activeSlide = document.querySelector(".swiper-slide-active");
      let background = activeSlide.getAttribute("data-background");
      sliderWrapper.css("background-color", background);
      newSlider.slideTo(i, duration);
      item = i;
    }
  }
}())