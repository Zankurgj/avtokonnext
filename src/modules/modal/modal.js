export default class Modal {
    constructor(modal){
        this.modal = modal;
        this.showButtons = document.querySelectorAll(`[data-show-modal=${modal.getAttribute('id')}]`);
        this.bg = this.createBg();
        this.closeButton = this.createCloseButton();
        this.modalContent = this.modal.querySelector('.js-modal-content');
        this.modalContent.appendChild(this.closeButton);
        this.events();
    }
    createBg(){
        const bg = document.createElement('div');
        bg.classList.add('modal__bg');
        return bg;
    }
    createCloseButton(){
        let closeButton = this.modal.querySelector('[rel=close]');
        if(closeButton){
            return closeButton;
        }
        closeButton = document.createElement('div');
        closeButton.setAttribute('rel','close');
        return closeButton;
    }
    showModal(){
        this.bodyNoScroll();
        this.bg = this.modal.appendChild(this.bg);
        this.modal.classList.add('state_show');
    }
    closeModal(){
        this.modal.classList.add('state_hide');
        setTimeout(()=>{
            this.modal.classList.remove('state_show');
            this.modal.classList.remove('state_hide');
            this.bg = this.modal.removeChild(this.bg);
            this.bodyNoScroll();
        },600)
    }
    events(){
       this.bg.addEventListener('click',() => {
           this.closeModal();
       },false);
       this.closeButton.addEventListener('click',() => {
           this.closeModal();
       },false);
       this.showButtons.forEach(button => {
           button.addEventListener('click', () => {
               this.showModal();
           },false);
       })
    }
    bodyNoScroll() {
        const body = document.body;
        if(!window.scrollPos){
            window.scrollPos = pageYOffset;
        }
        this.div = document.createElement('div');
        this.div.style.overflowY = 'scroll';
        this.div.style.width =  '50px';
        this.div.style.height = '50px';
        this.div.style.visibility = 'hidden';
        body.appendChild(this.div);
        const scrollWidth = this.div.offsetWidth - this.div.clientWidth;
        body.removeChild(this.div);
        delete this.div;
        if(body.classList.contains('modal_show')){
            body.classList.remove('modal_show');
            body.attributes.removeNamedItem('style');
            window.scrollTo(0,window.scrollPos);
            window.scrollPos = null;
        } else {
            body.setAttribute('style','padding-right: '+scrollWidth+'px; top:'+-1*window.scrollPos+'px;');
            document.body.style.position = 'fixed';
            body.classList.add('modal_show');
        }
    }
}