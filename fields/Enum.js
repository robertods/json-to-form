import { html, changed } from '../utilities.js';

export default function Enum(props, state, parent){

  const { property, layout, options=[] } = props;
  
  const handleChange = e => {
    changed(parent, property, e.target.value);
  }

  let select = html`
    <select class="j2f__box" @change=${handleChange} .value="${state}"  title="${state}" />  
      ${options.map(opt => html`<option .value="${opt.value}" .selected=${opt.value==state} >${opt.text}</option>`)}
    </select>
  `;

  return html`
    ${layout=="row"? html`
        <td class="j2f__label">
          ${select}
        </td>
      `: html`
        <label class="j2f__label">
          ${props.label || property}
          ${select}
        </label>
      `
    }
  `;
}