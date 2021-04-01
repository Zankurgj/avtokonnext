export default class SearchForm{
    constructor(){
        this.form = document.querySelector('.js-search-form');
        this.button = this.form.querySelector('.js-search-button');
        this.events();
    }
    events(){
        this.button.addEventListener('click',(e) => {
            if(this.form.classList.contains('state_active')){
               this.hideForm();
            } else {
               this.showForm();
            }
        }, false);
    }
    showForm(){
        this.button.classList.add('state_close');
        this.form.classList.add('state_active');
    }
    hideForm(){
        this.button.classList.remove('state_close');
        this.form.classList.remove('state_active');
    }
}