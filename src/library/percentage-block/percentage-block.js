export default class PercentageBlock {
    constructor(el){
        this.container = el;
        this.output = this.container.querySelector('.js-percentage-block-percent');
        this.value = parseFloat(this.container.getAttribute('data-num'));
        this.speed = 1000;
        this.frames = 60;
        this.delay = 1000/this.frames;
        this.iterator = this.getIterator();
        this.init();
    }
    getIterator(){
        return this.value / (this.speed / this.delay);
    }
    init(){
        const intersectionObserver = new IntersectionObserver(entries => {
            if (entries[0].intersectionRatio <= 0) {
                return;
            }
            this.startCounter();
        });
        intersectionObserver.observe(this.container);
    }
    startCounter(){
        console.log('start');
        const timer = setInterval(tick,this.delay);
        const k = this.iterator;
        const valueElement = this.output;
        const value = this.value;
        var i =0;
        function tick() {
            if(i>=value){
                clearInterval(timer);
                i = value;
            } else {
                i+=k;
            }
            valueElement.innerHTML = String(parseInt(i, 10));
        }
    }
}