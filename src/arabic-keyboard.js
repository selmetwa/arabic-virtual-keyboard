import { LitElement, html } from 'https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js';

class ArabicKeyboard extends LitElement {
  render() {
    return html `
      <div>Arabic Keyboard</div>
    `;
  }
}

customElements.define('arabic-keyboard', ArabicKeyboard);