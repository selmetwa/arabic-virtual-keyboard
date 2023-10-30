import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js';

class ButtonGroup extends LitElement {
  static get properties() {
    return {
      buttons: { type: Array },
      buttonType: { type: String },
      handleClick: { type: Function },
      handleKeyChange: { type: Function },
    };
  }

  static styles = css `
    .button_group {
      display: grid;
      grid-template-columns: repeat(var(--columns), 1fr);
      gap: var(--gap);

      .button_wrapper {
        display: flex;
        flex-direction: column;
        text-align: center;

        .label {
          direction: ltr;
        }
      }
    }

    .rtl {
      margin-top: 10px;
      direction: rtl;
    }

    .button {
      font-size: var(--font-size);
    }
  `;

  render() {
    return html `
      <h3>${this.buttonType}</h3>
      <div class="button_group ${this.buttonType === 'number' ? 'ltr' : 'rtl' }">
        ${this.buttons.map((button) => (
          html`
          <div class="button_wrapper">
            <label class="label">${button.label}</label>
            <button
              value="${this.buttonType}_${button.en}"
              type="button"
              class="button"
              title="${button.title}"
              @click="${this.handleClick}"
            >
              ${button.ar}
            </button>
        </div>
          `
        ))}
      </div>
    `;
  }
}

customElements.define('button-group', ButtonGroup);