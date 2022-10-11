// ================================================================
// get BaseClass from PARENT directory name
// get component name from directory name
let [BaseClass, componentName] = import.meta.url.split("/").slice(-3);
// ================================================================

// ================================================================
customElements.define(
  componentName,
  class extends HTMLElement {
    // ---------------------------------------------------------------- Attr
    Attr(name, defaultValue = "") {
      return this.getAttribute(name) || defaultValue;
    }
    // ---------------------------------------------------------------- $
    // format value as Euro NL currency string
    $(value) {
      return Intl.NumberFormat("nl-NL", {
        style: "currency",
        currency: "eur",
      }).format(value);
    }
    // ---------------------------------------------------------------- getTemplate
    getTemplate(template_id = this.nodeName) {
      return document.getElementById(template_id).content.cloneNode(true);
    }
    // ---------------------------------------------------------------- pricelist
    pricelist(atr, cnt, discountTotal = false) {
      let p = this.Attr(atr).split(",");
      let prices = new Array(11).fill(discountTotal || p[p.length - 1]); // lowestprice
      p.map((v, i) => (prices[i + 1] = v)); // Arrays start 0; overwrite prices Array with defined prices
      return prices[cnt] * (discountTotal || 0.01); // percentage or /100
    }
    // ----------------------------------------------------------------
    $dispatch({
      name = "order", // EventName
      detail = {}, // event.detail
      // override options PER option:
      bubbles = true, // default, bubbles up the DOM
      composed = true, // default, escape shadowRoots
      cancelable = true, // default, cancelable event bubbling
      // optional overwrite whole options settings, or use already specified options
      options = {
        bubbles,
        composed,
        cancelable,
      },
      eventbus = this, // default dispatch from current this element or use something like eventbus:document
      once = false, // default .dispatchEvent option to execute a Listener once
      silent = false, // default log to console, so each dispatch can be execute quietly with silent:true
    }) {
      console.warn("%c EventName:", "background:yellow", name, [detail]);
      eventbus.dispatchEvent(
        new CustomEvent(name, {
          ...options, //
          detail,
        }),
        once // default false
      );
    }

    // ----------------------------------------------------------------
  }
);
console.log("Loaded: BaseClass", BaseClass);
