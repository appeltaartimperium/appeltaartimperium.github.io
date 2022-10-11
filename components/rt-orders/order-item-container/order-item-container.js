// ================================================================
// get BaseClass from PARENT directory name
// get component name from directory name
let [BaseClass, componentName] = import.meta.url.split("/").slice(-3);
// ================================================================

customElements.define(
  componentName,
  class extends customElements.get(BaseClass) {
    static get observedAttributes() {
      return ["piesize"];
    }
    constructor() {
      super().attachShadow({ mode: "open" }).append(this.getTemplate());
    }
    connectedCallback() {
      setTimeout(() => {
        this.setPieSize();
      });
      this.addEventListener("piesize", (evt) => {
        //! reset small/large orders to 0
        this.setAttribute("piesize", evt.detail);
      });
    }
    setPieSize(size = this.getAttribute("piesize")) {
      // size = large || small
      let style = this.shadowRoot.querySelector("#piesize");
      style.innerHTML = `slot[name="${size}pie"] {display:initial!important}`;
    }
    attributeChangedCallback(name, oldValue, newValue) {
      if (name === "piesize") {
        this.setPieSize(newValue);
      }
    }
  }
);
