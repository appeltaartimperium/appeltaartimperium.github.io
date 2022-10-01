// BaseClass used by all Web Components

// ================================================================
class OrdersHTMLElement extends HTMLElement {
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
  // ---------------------------------------------------------------- pricelist
  pricelist(atr, cnt, discountTotal = false) {
    let p = this.Attr(atr).split(",");
    let prices = new Array(11).fill(discountTotal || p[p.length - 1]); // lowestprice
    p.map((v, i) => (prices[i + 1] = v)); // Arrays start 0; overwrite prices Array with defined prices
    return prices[cnt] * (discountTotal || 0.01); // percentage or /100
  }
}
