const style = `
#container {
  width: 100%;
  box-sizing: border-box;

  font-family: Verdana, sans-serif;
  font-weight: 100;
  font-size: 8pt;
  padding: 5px 20px 5px 20px;
  cursor: default;

  display: flex;
}
#container:hover {
  background: rgba(0, 0, 0, 0.2);
}
.spacer {
  min-width: 15px;
  flex-grow: 1;
}`;

const body = `
<div id=container>
  <slot name=text></slot>
  <div class=spacer></div>
  <slot name=shortcut></slot>
</div>`;

window.customElements.define("mm-context-menu-item", class extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    if (this.shadowRoot)
      return;

    const shadow = this.attachShadow({ mode: 'open' });
    shadow.innerHTML = `
      <style>${style}</style>
      <body>${body}</body>`;
  }
});

