import { html, changed } from '../utilities.js';

export default function Text(props, state, parent){

  const { property, layout } = props;
  
  const handleChange = e => changed(parent, property, e.target.value);

  const inputDom = html`<input type="text" class="j2f__box" @input=${handleChange} .value="${state}"  title="${state}" />`;

  return html`
    ${layout=="row"? html`
        <td class="j2f__label">
          ${inputDom}
        </td>
      `: html`
      <label class="j2f__label">
        ${props.label || property}
        ${inputDom}
      </label>
      `
    }
  `;

}