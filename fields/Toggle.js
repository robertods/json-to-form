import { html, changed } from '../utilities.js';

export default function Toggle(props, state, parent){

  const { property, layout="", invert=false } = props;

  const handleChange = e => {
    e.target.classList.toggle('fa-toggle-on');
    let newState = e.target.classList.contains('fa-toggle-on');
    newState = invert ? !newState : newState;

    changed(parent, property, newState);
  }

  let on = invert ? !state : state;

  let toggle = html`<i class="fa ${on ? 'fa-toggle-on' : 'fa-toggle-off' } fa-2x j2f__toggle" @click=${handleChange}></i>`;

  return html`
    ${layout == "row" ? html`
      <td>
        ${toggle}
      </td>
    `:html`
      <label class="j2f__label">
        ${props.label || property}
        ${toggle}
      </label>
    `}
    
  `;

}