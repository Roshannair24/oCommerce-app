customElements.define('product-card-v2', class extends HTMLElement {
  connectedCallback() {
    var img = this.querySelector('.pc__img'), add = this.querySelector('[data-pc-add]'),
        price = this.querySelector('[data-pc-price-now]'), link = this.querySelector('[data-pc-link]'),
        sws = this.querySelectorAll('[data-pc-swatch]');

    sws.forEach(sw => sw.onclick = () => {
      sws.forEach(s => s.classList.toggle('is-selected', s === sw));
      if (sw.dataset.image) { img.removeAttribute('srcset'); img.src = sw.dataset.image; }
      price.textContent = sw.dataset.price;
      link.href = sw.dataset.url;
      if (add) add.dataset.variantId = sw.dataset.variantId;
    });

    if (add) add.onclick = async () => {
      add.disabled = true;
      var r = await fetch('/cart/add.js', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: +add.dataset.variantId, quantity: 1 })
      }).catch(() => ({ ok: false }));
      add.textContent = r.ok ? '✓' : '!';
      setTimeout(() => { add.textContent = '+'; add.disabled = false; }, 1200);
    };
  }
});