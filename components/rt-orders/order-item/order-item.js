// ================================================================
// get BaseClass from PARENT directory name
// get component name from directory name
let [BaseClass, componentName] = import.meta.url.split("/").slice(-3);
// ================================================================

customElements.define(
  componentName,
  class extends customElements.get(BaseClass) {
    // ---------------------------------------------------------------- connectedCallback
    connectedCallback(count = this.count) {
      this.style.display = "block";
      if (count > 10 || count < 1) count = 0;
      this.setAttribute("count", count);
      
      // attr is the correct value
      let button = (x, id, ibtn) =>
      `<button id="${id}" class="${ibtn}" onclick="this.parentNode.count${x}">${x[0]}</button>`;
      this.innerHTML =
      button(
        "--",
        "min",
        "minus"
        ) /* comment out this line to remove minus button*/ +
        button("++", "plus", "plusus") +
        `<count> ${count} </count>` +
        (count ? " " + this.$(this.cost) : "") +
        ` ${this.Attr("title")} ` +
        ` ${this.$(this.price)} `;
      // if count = 0 hide min button
      //  ${count || ""}  ${this.$(this.price)} ` +
      // subtotal if count>0
      setTimeout(() => this.closest("order-forms").total); // trigger total update
    }
    // ---------------------------------------------------------------- count
    get count() {
      return ~~this.getAttribute("count");
    }
    set count(p) {
      this.connectedCallback(p);
    }
    // ---------------------------------------------------------------- price
    get price() {
      return this.pricelist("price", this.count);
    }
    // ---------------------------------------------------------------- cost
    get cost() {
      return this.count * this.price;
    }
    // ----------------------------------------------------------------
  }
);
