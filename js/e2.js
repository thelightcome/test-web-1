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

  $(window).on("onContentLoaded", scrollHandle);

  $(window).on("scroll", scrollHandle);

  function scrollHandle() {
    currentValue = $(window).scrollTop();
    shift = currentValue - overflowTop;
    prevScrollVal = currentValue;

    if (shift < 0 && item !== 0) {
      sliderWrapper.css('transform', 'translateY(0px)');
      setSlide(0);
    } else if (shift + height > maxValue * height && item !== maxValue - 1) {
      sliderWrapper.css('transform', 'translateY(' + (maxValue - 1) * height + 'px)');
      setSlide(maxValue - 1);
    }
    else if (shift > 0 && shift <= (maxValue - 1) * height) {
      sliderWrapper.css('transform', 'translateY(' + shift + 'px)');
      let setItem = Math.floor(shift / (height - height / maxValue));
      setSlide(setItem);
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