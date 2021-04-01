import Swiper from 'swiper';

export default class MainSlider {
    constructor(){
        this.slider = document.querySelector('.js-main-slider');
        this.init();
    }
    init(){
        new Swiper (this.slider, {
            loop: true,
            setWrapperSize: true,
            pagination: {
                el: '.js-main-slider-dots',
            },
            navigation: {
                nextEl: '#main-slider-next',
                prevEl: '#main-slider-prev',
            },
            autoplay: {
                delay: 4000,
            },
        });
        const sliderWrapper = document.body.querySelector('.main-slider__wrapper');
        if(sliderWrapper){
            window.addEventListener('scroll', function () {
                if(window.pageYOffset  > 100){
                    sliderWrapper.classList.add('state_scroll');
                } else{
                    sliderWrapper.classList.remove('state_scroll');
                }

            });
        }

    }
}
