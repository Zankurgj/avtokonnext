export default class Rating {
    constructor(el) {
        this.container = el;
        this.stars = [];
        this.rating = 0;
        this.ratingInput = null;
        this.init();
        this.render();
    }

    init() {
        this.ratingInput = this.container.querySelector('.js-rating-input');
        const stars = this.container.querySelectorAll('.js-rating-star');
        const rating = parseFloat(String(this.ratingInput.value).replace(',','.'));
        this.rating = rating ? rating : 0;
        for (let i = 0; i < stars.length; i++) {
            const star = stars[i];
            star.value = i+1;
            this.stars.push({
                starEl: star,
                starDecimalTl: star.querySelector('.js-rating-decimal')
            });
        }
        if(!this.container.getAttribute('readonly')){
            this.initEvents();
        }
    }
    initEvents(){
        for (let i = 0; i < this.stars.length; i++) {
            const star = this.stars[i];
            star.starEl.addEventListener('click',(e)=>{
                const currentStar = e.currentTarget;
                this.rating = currentStar.value;
                this.ratingInput.value = currentStar.value;
                this.ratingInput.dispatchEvent(new Event('change'));
            },false);
            star.starEl.addEventListener('mouseenter',(e)=>{
                const currentStar = e.currentTarget;
                const hoverRating = currentStar.value;
                this.render(hoverRating,1)
            },false);
            star.starEl.addEventListener('mouseleave',(e)=>{
                this.render();
            },false);
        }
        this.ratingInput.addEventListener('change',() => {
            this.render();
        },false)
    }

    render(rating,type) {
        const parts = rating? this.getRatingParts(rating) : this.getRatingParts(this.rating);
        for(let i=0; i<this.stars.length;i++){
            const star = this.stars[i];
            star.starDecimalTl.style.width = '0';
            if(type === 1){
                star.starDecimalTl.style.opacity = '0.5';
            } else {
                star.starDecimalTl.style.opacity = '';
            }
        }
        for(let i=0; i<parts[0];i++){
            const star = this.stars[i];
            star.starDecimalTl.style.width = '100%';
        }
        if(parts[0]<this.stars.length){
            const lastStar = this.stars[parts[0]];
            lastStar.starDecimalTl.style.width = `${parts[1]*10}%`
        }
    }

    getRatingParts(rating) {
        console.log(String(rating).indexOf('.') + 1);
        if (String(rating).indexOf('.') + 1) {
            return String(rating).split('.').map((part) => {
                return parseInt(part);
            })
        } else {
            return [
                parseInt(rating),
                0
            ];


        }
    }
}