import Swiper from 'swiper';

export default class Sliders {
    constructor(){
        this.sliders = [];
        this.sliderContainer = document.querySelectorAll('.js-slider');
        for(let i=0; i<this.sliderContainer.length; i++){
            const element = this.sliderContainer[i];
           this.initSlider(element);
        }
    }
    initSlider(el){
        const wrapper = el.parentElement.parentElement;

        wrapper.classList.add('state_first-slide');

        function cleanSlideState(container){
            container.classList.remove('state_first-slide');
            container.classList.remove('state_last-slide');
        }

        const slidesToShow = parseInt(el.getAttribute('data-slides-count'));
        const count = slidesToShow? slidesToShow : '4';
        this.sliders.push(
            new Swiper (el, {
                loop: false,
                slidesPerView: count,
                spaceBetween: 30,
                setWrapperSize: true,
                autoHeight: true,
                navigation: {
                    nextEl: el.querySelector('.js-slider-next'),
                    prevEl: el.querySelector('.js-slider-prev'),
                },
                on: {
                    slideChange :function(){
                        cleanSlideState(wrapper);
                    },
                    reachBeginning: function () {
                        setTimeout(()=>{
                            wrapper.classList.add('state_first-slide');
                        },100);
                    },
                    reachEnd: function () {
                        setTimeout(()=>{
                            wrapper.classList.add('state_last-slide');
                        },100);
                    },
                },
                breakpoints: {
                    1600: {
                        slidesPerView: count,
                        spaceBetween: 30,
                    },
                    768:{
                        slidesPerView: 2,
                        spaceBetween: 30,
                    },
                    425: {
                        slidesPerView: 1,
                        spaceBetween: 30,
                    }
                }
            })
        );
    }
}
