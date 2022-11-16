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
  const linkList = $('.list__el');
  const bgColors = $('.swiper-slide').map((_, e) => {
    return e.getAttribute('data-background');
  });

  const maxValue = linkList.length;
  const HEIGHT_DEL = 2.5;
  let overflowTop = overflow.offset().top;
  let height = sliderWrapper.height();
  let distHeight = height / HEIGHT_DEL;
  let overflowHeight = (maxValue) * distHeight + height;
  overflow.css('height', overflowHeight + 'px');

  let item = 0;
  let currentValue, shift;
  let duration = 500;
  let endPoint = maxValue * distHeight;
  let position = 'absolute';


  $(window).on("resize", () => {
    overflowTop = overflow.offset().top;
    height = sliderWrapper.height();
    distHeight = height / HEIGHT_DEL;
    overflowHeight = (maxValue) * distHeight + height;
    overflow.css('height', overflowHeight + 'px');
    endPoint = maxValue * distHeight;
    scrollHandle();
  });

  $(document).ready(function () {
    scrollHandle();
    if (item === 0) {
      linkList[item].classList.add('active-el');
      sliderWrapper.css("background-color", bgColors[item]);
      newSlider.slideTo(item, duration);
    }
  });

  $(window).on("scroll", scrollHandle);

  function scrollHandle() {
    currentValue = $(window).scrollTop();
    shift = currentValue - overflowTop;

    if (shift > 0 && shift < endPoint) {
      if (position === 'absolute') {
        position = 'fixed';
        sliderWrapper.css('position', position);
        sliderWrapper.css('top', '0px');
      }
      let setItem = Math.floor(shift / distHeight);
      setSlide(setItem);
    } else {
      if (position === 'fixed') {
        position = 'absolute';
        sliderWrapper.css('position', position);
      }
      if (shift < 0) {
        setSlide(0);
        sliderWrapper.css('top', '0px');
      } else if (shift >= endPoint) {
        setSlide(maxValue - 1);
        sliderWrapper.css('top', endPoint + 'px');
      }
    }
  }

  function setSlide(i) {
    if (i !== item) {
      linkList.removeClass('active-el');
      if (linkList[i]) {
        linkList[i].classList.add('active-el');
        sliderWrapper.css("background-color", bgColors[i]);
        newSlider.slideTo(i, duration);
        item = i;
      }
    }
  }
}())