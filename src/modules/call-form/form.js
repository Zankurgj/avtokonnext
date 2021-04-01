export default class AjaxForm {
    constructor(form){
        this.form = form;

        this.initForm(this.form);
        this.form.setAttribute('novalidate','');

    }
    sendForm(){
        const formData = this.serialize(this.form);
        this.form.classList.add('state_loading');
        fetch(this.form.getAttribute('action'), {
            method: this.form.getAttribute('method'),
            body: formData
        }).then(res => {
            return res.json();
        }).then(response =>{
            if(response.sucess){
                this.showMessage(response.message);
                this.form.classList.remove('state_loading');
            }
        }).catch(e =>{
            console.error('send-error');
            this.form.classList.remove('state_loading');
            this.showMessage('e')
        });
    }
    initForm(){
        this.form.addEventListener('submit',  (e) => {
            e.stopPropagation();
            e.preventDefault();
            if(this.validate(this.form)){
                this.sendForm(this.form);
            }
        },false);
        this.formThemeButtons = document.querySelectorAll('[data-form-theme]');
        if(this.formThemeButtons){
            this.formThemeButtons.forEach(button=>{
                button.addEventListener('click',(event) => {
                    const clickedButton = event.currentTarget;
                    const formTheme = this.form.querySelector('[data-theme]');
                    if(formTheme){
                        formTheme.value = clickedButton.getAttribute('data-form-theme');
                    }
                })
            })
        }
    }
    serialize(form) {
        return new FormData(form);
    }
    validate(form){
        let valid = true;
        const phoneField = form.querySelector('[data-phone]');
        const requiredField = form.querySelectorAll('[required]');
        phoneField.parentElement.classList.remove('state_error');
        requiredField.forEach(field => {
           field.parentElement.classList.remove('state_error');
           if(!field.value){
               valid = false;
               setTimeout(()=>{
                   field.parentElement.classList.add('state_error');
               },200);
           }
        });


        let value = phoneField.value;
        if (phoneField.inputmask){
            value = phoneField.inputmask.unmaskedvalue();
        }

        if (!(value && (String(value).length >= 10)) ) {
            phoneField.parentElement.classList.remove('state_error');
            valid = false;
            setTimeout(()=>{
                phoneField.parentElement.classList.add('state_error');
            },200);
        }

        return valid;
    }
    showMessage(text){
        const mess = this.createMessage(text);
        this.form.appendChild(mess);
        setTimeout(()=>{
            this.form.removeChild(mess)
        },5000);
    }
    createMessage(text){
        const message =document.createElement('div');
        message.classList.add('form-message');
        message.innerHTML = text;
        return message;
    }
}