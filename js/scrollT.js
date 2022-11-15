(function () {
  const overflow = $('.overflow');
  const sliderWrapper = $('.slider-wrapper');
  const height = sliderWrapper.height();
  const linkList = $('.list__el');
  const maxValue = linkList.length;

  overflow.css('height', maxValue * height + 'px');

  ScrollTrigger.create({
    trigger: ".overflow",
    start: "top top",
    end: "bottom bottom",
    onToggle: self => console.log("toggled, isActive:", self.isActive),
    onUpdate: self => {
      console.log("progress:", self.progress.toFixed(3), "direction:", self.direction, "velocity", self.getVelocity());
    }
  });
}());