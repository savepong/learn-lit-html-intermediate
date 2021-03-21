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

    const totalVisited = this.breweries.filter((b) => b.visited).length;
    const totalNotVisited = this.breweries.length - totalVisited;

    return html`
      <h1>Breweries App</h1>

      <h2>Breweries</h2>
      <p>(${totalVisited} visited and ${totalNotVisited} still to go)</p>
      <ul>
        ${this.breweries.map(
          (brewery) => html`
            <li>
              <brewery-detail
                .name=${brewery.name}
                .type=${brewery.type}
                .city=${brewery.city}
                .visited=${brewery.visited}
                @toggle-visited-status=${() =>
                  this._toggleVisitedStatus(brewery)}
              ></brewery-detail>
            </li>
          `
        )}
      </ul>
    `;
  }

  _toggleVisitedStatus(breweryToUpdate) {
    this.breweries = this.breweries.map((brewery) => {
      return brewery === breweryToUpdate
        ? { ...brewery, visited: !brewery.visited }
        : brewery;
    });
  }
}

customElements.define("brewery-app", BreweryApp);
