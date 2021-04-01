export default class Tabs {
    constructor(){
        this.container=document.querySelector('.js-tabs');
        if(this.container){
            this.tabs = this.container.querySelectorAll('.js-tabs-link');
            this.items = document.querySelectorAll('[data-category-id]');
            this.id =  this.container.querySelector('.js-tabs-link.state_active').getAttribute('data-id');
            this.init();

        }
    }
    init(){
        this.filter(this.id);
        this.tabs.forEach(tab=>{
            tab.addEventListener('click',(e)=>{
                const currentTab = e.currentTarget;
                this.id = currentTab.getAttribute('data-id');
                this.filter(this.id);
                this.tabs.forEach(t=>{
                   t.classList.remove('state_active');
                });
                currentTab.classList.add('state_active');
                this.setDiv(currentTab);
                history.pushState({}, currentTab.innerText, currentTab.getAttribute('data-href'));
            })
        });
        this.createDiv();
        this.setDiv(this.container.querySelector('.js-tabs-link.state_active'));
    }
    setDiv(el){
        const left = el.offsetLeft;
        const width = el.offsetWidth;
        this.div.style.left = `${left}px`;
        this.div.style.width =`${width}px`;
    }
    createDiv(){
        this.div = document.createElement('li');
        this.div.classList.add('tabs__div');
        this.container.appendChild(this.div);
    }
    filter(id){
        this.items.forEach(element=>{
            if(id==='all'){
                element.classList.remove('state_hidden');
            } else{
                if(element.getAttribute('data-category-id')===id){
                    element.classList.remove('state_hidden');
                } else {
                    element.classList.add('state_hidden');
                }
            }
        });
    }
}