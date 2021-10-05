import { html, changed } from '../utilities.js';

export default function Number(props, state, parent){

  const { property, layout } = props;
  const step = props.step || 1;
  const isInt = typeof step === 'number' && isFinite(step) && Math.floor(step) === step;

  const handleChange = e => changed(property, isInt ? parseInt(e.target.value) : parseFloat(e.target.value) );
  
  const inputDom = html`<input type="number" class="j2f__box" @input=${handleChange} step="${props.step}" .value="${state}"  title="${state}" />`;

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