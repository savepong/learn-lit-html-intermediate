import { LitElement, html } from "https://unpkg.com/lit-element?module";

class BreweryDetail extends LitElement {
  static get properties() {
    return {
      name: { type: String },
      type: { type: String },
      city: { type: String },
      visited: { type: Boolean },
    };
  }

  render() {
    return html`
      <h3>${this.name} (${this.visited ? "visited" : "not-visited"})</h3>
      <p>brewery type: ${this.type}</p>
      <p>city: ${this.city}</p>
      <button @click=${this._toggleVisitedStatus}>
        Mark as ${this.visited ? "not-visited" : "visited"}
      </button>
    `;
  }

  _toggleVisitedStatus() {
    this.visited = !this.visited;
  }
}

customElements.define("brewery-detail", BreweryDetail);
