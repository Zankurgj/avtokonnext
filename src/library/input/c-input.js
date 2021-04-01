import Inputmask from "inputmask";

export default class CInput {
    constructor(){
        this.maskedOnputs = [];
        this.initMask();
    }
    initMask(){
        const mask = document.querySelectorAll('[data-phone]');
        for (let i =0; i<mask.length; i++) {
            let element = mask[i];
            const im = new Inputmask("+7 (999)-999-99-99");
            im.mask(element);
            this.maskedOnputs.push(im);
        }
    }
}