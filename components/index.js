// BaseClass used by all Web Components
class OrdersHTMLElement extends HTMLElement {
  $(v) {
    return Intl.NumberFormat("nl-NL", {
      style: "currency",
      currency: "eur",
    }).format(v);
  }
  pricelist(atr, cnt, discountTotal = false) {
    let p = this.Attr(atr).split(",");
    let prices = new Array(11).fill(discountTotal || p[p.length - 1]); // lowestprice
    p.map((v, i) => (prices[i + 1] = v)); // Arrays start 0; overwrite prices Array with defined prices
    return prices[cnt] * (discountTotal || 0.01); // percentage or /100
  }
  Attr(n) {
    return this.getAttribute(n) || "";
  }
}

export {} from "./order-forms";
export {} from "./order-items";
