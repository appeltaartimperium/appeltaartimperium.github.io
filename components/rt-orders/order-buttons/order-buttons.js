// ================================================================
// get BaseClass from PARENT directory name
// get component name from directory name
let [BaseClass, componentName] = import.meta.url.split("/").slice(-3);
// ================================================================

customElements.define(
  componentName,
  class extends customElements.get(BaseClass) {
    connectedCallback() {
      this.style.width = "100%";
      this.style.display = "flex";
      this.style.justifyContent = "space-evenly";
      this.innerHTML =
        /* css */ `ItemButtons{}` +
        /*html*/ `<div class="ItemButtons"></div>` +
        /*html*/ `<button class="sizeButton sizeButton1">Normaal<br>(12 personen)</button>` +
        /*html*/ `<button class="sizeButton sizeButton2">Klein<br>(4-6 personen)</button>` +
        /*html*/ `</div>`;
      this.querySelector(".sizeButton1").onclick = (evt) => {
        // todo dispatch Event to show Large pie choices
        //this.dispatch("sizeButton1")
      };
      this.querySelector(".sizeButton2").onclick = (evt) => {
        //this.dispatch("sizeButton2")
      };
    }
  }
);

export default function () {
  console.warn(666);
}
