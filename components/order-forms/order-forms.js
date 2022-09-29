customElements.define(
  "order-forms",
  class extends OrdersHTMLElement {
    get total() {
      let itemCount = 0;
      let itemSummary = "Besteld:\n";
      let totalCost = [...this.querySelectorAll("order-items")].reduce(
        (total, item) => {
          let { count, cost } = item;
          if (cost) {
            itemCount += count;
            itemSummary += `${count}-${item.getAttribute("id")} € ${cost} `;
          }
          return (total += cost);
        },
        0
      );
      this.setAttribute("count", itemCount);
      itemSummary += `Totaal: ${totalCost}`;
      // put summary in <textarea> or any other class labeled element
      let summaryTextarea = this.querySelector(".itemSummary");
      if (summaryTextarea.nodeName == "TEXTAREA")
        summaryTextarea.value = itemSummary;
      else if (summaryTextarea) summaryTextarea.innerHTML = itemSummary;
      else console.warn("No .itemSummary defined");

      // DISCOUNT EXPERIMENT
      // 50:.9,100,.8
      // total>50?.9:total>100?.8:1
      // `total`
      // <order-discount total="50" discount="90%"></order-discount>
      //console.log(eval("total>50?.9:total>100?.8:1"));
      //if(total>10) total = total *.8;
      //total = this.pricelist("discount", itemcount, total);

      let totalElement = this.querySelector(".orderTotal");
      if (totalElement) totalElement.innerHTML = this.$(totalCost);
      else console.warn("No .orderTotal defined");
      return totalCost;
    }
  }
);
