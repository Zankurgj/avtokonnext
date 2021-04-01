export default class Stages {
    constructor(){
        this.blockHeight = 0;
        this.allHeight = 0;
        this.list = document.querySelector('.js-stages-list');
        if(this.list){
            this.items = this.list.querySelectorAll('.js-stages-item');
            this.showMoreButton = document.querySelector('.js-stage-more');
            this.init();
        }
    }
    init(){
       this.hide();
        this.showMoreButton.addEventListener('click',(e)=>{
            e.preventDefault();
            if(this.list.classList.contains('state_show')){
                this.hide();
                this.list.classList.remove('state_show');
            } else {
                this.show();
                this.list.classList.add('state_show');
            }

        },false);
        window.addEventListener('resize',()=>{
            this.hide();
        })
    }
    show(){
        this.list.style.height = `${this.allHeight}px`;
        for (let i=0;i < this.items.length; i++ ) {
            const item = this.items[i];
            item.classList.remove('state_hidden');
        }
        this.showMoreButton.querySelector('span').innerText = 'Свернуть';
    }
    hide(){
        this.blockHeight = 0;
        this.allHeight = 0;
        for (let i=0;i < this.items.length; i++ ) {
            const item = this.items[i];
            if (i>6) {
                item.classList.add('state_hidden');
            } else {
                this.blockHeight += item.clientHeight/2;
            }
            this.allHeight += item.clientHeight/2;
        }
        this.list.style.height = `${this.blockHeight}px`;
        this.showMoreButton.querySelector('span').innerText = 'Развернуть';
    }
}