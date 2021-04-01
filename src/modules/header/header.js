

export default class MobileMenu{
    constructor(){
        this.button = document.querySelector('.js-mobile-menu-button');
        this.menu = document.querySelector('.js-mobile-menu-container');
        this.events();
    }
    events(){
        this.button.addEventListener('click',() => {
            if(this.button.classList.contains('menu_active')){
                this.hideMenu();
            } else {
                this.showMenu();
            }
        }, false);
        const headerWrapper = document.body.querySelector('.header');
        if(headerWrapper){
            window.addEventListener('scroll', function () {
                if(window.pageYOffset  > 5){
                    headerWrapper.classList.add('state_scroll');
                } else{
                    headerWrapper.classList.remove('state_scroll');
                }

            });
        }
    }
    showMenu(){
         this.button.classList.add('menu_active');
         this.menu.classList.add('state_active');
    }
    hideMenu(){
        this.button.classList.remove('menu_active');
        this.menu.classList.remove('state_active');
    }
}
