import Swiper from "swiper";

export default class GlonassSlider {
  constructor() {
    this.sliderMainSelector = document.querySelector(".js--glonass-slider");
    this.sliderThumbsSelector = document.querySelector(
      ".js--glonass-slider-thumbs"
    );
    this.init();
  }
  init() {
    const sliderThumbs = new Swiper(this.sliderThumbsSelector, {
      slidesPerView: 4,
    });

    new Swiper(this.sliderMainSelector, {
      slidesPerView: 1,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
    });
  }
}
