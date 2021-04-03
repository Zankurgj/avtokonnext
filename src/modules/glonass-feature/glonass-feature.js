import inView from "in-view";

export default class glonassInView {
  constructor() {
    this.defaultState = "top";
    this.state = this.defaultState;
    this.init();
  }
  init() {
    this.setState();
    inView.threshold(0.5);
    inView("[data-view]").on("enter", (el) => {
      this.state = el.dataset.view;
      this.setState();
    });
  }
  setState() {
    if (this.state === "top") {
      document.querySelector(".js--head-top").classList.add("show");
      document.querySelector(".js--head-bottom").classList.remove("show");
    } else {
      document.querySelector(".js--head-top").classList.remove("show");
      document.querySelector(".js--head-bottom").classList.add("show");
    }
  }
}
