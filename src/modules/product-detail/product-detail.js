export default class ProductDetail {
    constructor(){
        this.container = document.querySelector('.js-product-detail');
        if(this.container){
            this.headerContainer = this.container.querySelector('.js-product-detail-header');
            this.header = this.container.querySelector('.js-product-detail-title');
            this.headerTextEl = this.header.querySelectorAll('[data-block]');
            this.props = this.container.querySelectorAll('.js-product-props');
            this.setPriceTrigger = this.container.querySelector('[data-set-price]');
            this.prices=[];
            this.init();
        }
    }
    init(){
        for(let i=0; i<this.props.length; i++){
            const el = this.props[i];
            this.watch(el);
        }
        if(this.setPriceTrigger){
            this.prices = this.setPriceTrigger.getAttribute('data-set-price').split('|');
            this.setPriceTrigger.querySelector('input').addEventListener('change',(e)=>{
                const result = this.container.querySelector('.js-set-price');
                if(result){
                    const check = e.currentTarget;
                    if(check.checked){
                        result.innerHTML = this.prices[1];
                    } else {
                        result.innerHTML = this.prices[0];
                    }
                }

            })
        }
        this.scrollWatch();
    }
    scrollWatch(){
        const self = this;
        if ( !window.requestAnimationFrame ) {
            window.requestAnimationFrame = ( function() {
                return window.webkitRequestAnimationFrame ||
                    window.mozRequestAnimationFrame ||
                    window.oRequestAnimationFrame ||
                    window.msRequestAnimationFrame ||
                    function( /* function FrameRequestCallback */ callback, /* DOMElement Element */ element ) {
                        window.setTimeout( callback, 1000 / 60 );
                    };
            } )();
        }

        function tick() {
            if(window.pageYOffset > 100){
                self.headerContainer.classList.add('state_scroll');
            } else {
                self.headerContainer.classList.remove('state_scroll');
            }
            requestAnimationFrame(tick)
        }
        tick();
    }
    watch(el){
        const intersectionObserver = new IntersectionObserver(entries => {
            const entry = entries[0];

                if (entry.intersectionRatio > 0) {
                    console.log(entry);
                    this.header.classList.remove('state_show');
                    this.hideAll();
                    if(entry.target.getAttribute('data-title')){
                        if(entry.isIntersecting){
                            const titleNum = entry.target.getAttribute('data-title');
                            this.header.classList.add('state_show');
                            this.hideAll();
                            this.header.querySelector(`[data-block="${titleNum}"]`).classList.add('state_show');
                        }
                    } else {
                        this.header.classList.remove('state_show');
                        this.hideAll();
                    }
                }

        }, );
        intersectionObserver.observe(el);
    }
    hideAll(){
        this.headerTextEl.forEach(title=>{
            title.classList.remove('state_show');
        })
    }
}
