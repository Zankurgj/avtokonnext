export default class CollapseBlock {
    constructor(){
        this.collapse = [];
        this.containers = document.querySelectorAll('.js-collapse-block');
        if(this.containers){
            this.init();
        }
    }
    init(){
        for(let i=0; i<this.containers.length; i++){
            const container = this.containers[i];
            this.collapse.push(new CollapseItem(container));
        }
    }
}

class CollapseItem {
    constructor(el){
        this.contaner = el.querySelector('.js-collapse-block-content');
        this.collapseLength = parseInt(el.getAttribute('data-collapse-length'));
        this.button = el.querySelector('.js-collapse-button');
        this.items = el.querySelectorAll('.js-collapse-block-item');
        this.itemHeight = 0;
        this.allHeight = 0;
        this.init();
        window.addEventListener('resize',()=>{
            this.init();
        },false)
    }
    init(){
        this.itemHeight = 0;
        this.allHeight = 0;
        this.contaner.style.maxHeight='';
        this.contaner.classList.add('state_no-transition');
        let position= null;
        for(let i=0; i<this.items.length; i++){
            const collapseItem = this.items[i];
            if(collapseItem.getBoundingClientRect().top !== position){
                if(i<this.collapseLength){
                    this.itemHeight += collapseItem.offsetHeight + 30;
                }
                position= collapseItem.getBoundingClientRect().top;
                this.allHeight += collapseItem.offsetHeight + 30;
            }
        }
        this.contaner.classList.remove('state_no-transition');
        this.hide();
        this.button.addEventListener('click',(e)=>{
            e.preventDefault();
            const textBlock = this.button.querySelector('span');
            if(this.contaner.classList.contains('state_show')){
                this.hide();
                textBlock.innerText = 'Показать еще';

            } else {
                this.show();
                textBlock.innerText = 'Скрыть';
            }
        },false)
    }
    hide(){
        this.contaner.classList.remove('state_show');
        this.contaner.style.maxHeight = `${this.itemHeight}px`;
    }
    show(){
        this.contaner.classList.add('state_show');
        this.contaner.style.maxHeight = `${this.allHeight}px`;
    }
}