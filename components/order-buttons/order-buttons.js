customElements.define(
  "order-buttons",
  class extends HTMLElement {
    connectedCallback() {
      this.innerHTML = `<div class="ItemButtons">
        <button class="sizeButton sizeButton1">Normaal<br>(12 personen)</button>
        <button class="sizeButton sizeButton2">Klein<br>(4-6 personen)</button>
    </div>`;
      this.querySelector("sizeButton1").onclick = (evt) => {
        // todo dispatch Event to show Large pie choices
        //this.dispatch("sizeButton1")
      };
      this.querySelector("sizeButton2").onclick = (evt) => {
        //this.dispatch("sizeButton2")
      };
    }
  }
);
