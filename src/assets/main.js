import  "./icon"
import 'nodelist-foreach-polyfill';
import "fetch-polyfill";
import "../modules/lightbox/light-box"

import MobileMenu from "../modules/header/header";
import MainSlider from "../modules/main-slider/main-slider";
import Slider from "../modules/slider/slider";
import CInput from "../library/input/c-input";
import AjaxForm from "../modules/call-form/form";
import Stages from "../modules/stages/stages";
import Rating from "../library/rating/rating";
import ProductDetail from "../modules/product-detail/product-detail";
import CollapseBlock from "../library/collapse-block/collapse-block";
import Tabs from "../library/tabs/tabs";
import Modal from "../modules/modal/modal";
import ContactsMap from  "../modules/contacts-map/contacts-map";
import PercentageBlock from "../library/percentage-block/percentage-block";
import Stickyfill from 'stickyfill';


let global = {};
global.stickyfill = Stickyfill();
global.stickyEl = document.querySelectorAll('.js-sticky');
for (let i =0; i<global.stickyEl.length; i++) {
    const el = global.stickyEl[i];
    global.stickyfill.add(el);
}
global.mobileMenu = new MobileMenu();
global.mainSlider = new MainSlider();
global.sliders = new Slider();
global.inputs = new CInput();
global.ajaxForms = [];
global.ajaxFormsEl = document.querySelectorAll('.js-ajax-form');
for (let i =0; i<global.ajaxFormsEl.length; i++) {
    const form = global.ajaxFormsEl[i];
    global.ajaxForms.push(new AjaxForm(form));
}
global.stagesBlock = new Stages();
global.ratings = [];
global.ratingBlocks = document.querySelectorAll('.js-rating');
for (let i =0; i<global.ratingBlocks.length; i++) {
    const ratingItem = global.ratingBlocks[i];
    global.ratings.push(new Rating(ratingItem));
}
global.productDetail = new ProductDetail();
global.collapse = new CollapseBlock();
global.tabs = new Tabs();

global.modals =[];
global.modalFormsElements = document.querySelectorAll('[data-modal]');
global.modalFormsElements.forEach(modal => {
    global.modals.push(new Modal(modal));
});

global.contacts = new ContactsMap();

global.percentElements = document.querySelectorAll('.js-percentage-block');
global.percentage = [];
if(global.percentElements){
    global.percentElements.forEach((percentElement) => {
        global.percentage.push(new PercentageBlock(percentElement));
    });
}
