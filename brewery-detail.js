import { LitElement, html } from "https://unpkg.com/lit-element?module";

class BreweryDetail extends LitElement {
  static get properties() {
    return {
      name: { type: String },
      type: { type: String },
      city: { type: String },
    };
  }

  render() {
    return html`
      <h3>${this.name}</h3>
      <p>brewery type: ${this.type}</p>
      <p>city: ${this.city}</p>
    `;
  }
}

customElements.define("brewery-detail", BreweryDetail);
