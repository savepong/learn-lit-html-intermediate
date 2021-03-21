import { LitElement, html } from "https://unpkg.com/lit-element?module";
import "./brewery-detail.js";

class BreweryApp extends LitElement {
  static get properties() {
    return {
      loading: { type: Boolean },
      breweries: { type: Array },
    };
  }

  connectedCallback() {
    super.connectedCallback();

    if (!this.breweries) {
      this.fetchBreweries();
    }
  }

  async fetchBreweries() {
    this.loading = true;
    const response = await fetch("https://api.openbrewerydb.org/breweries");
    const jsonResponse = await response.json();
    this.breweries = jsonResponse;
    this.loading = false;
  }

  render() {
    if (this.loading) {
      return html` <p>Loading...</p>`;
    }

    return html`<pre>${JSON.stringify(this.breweries, null, 2)}</pre>`;
  }
}

customElements.define("brewery-app", BreweryApp);