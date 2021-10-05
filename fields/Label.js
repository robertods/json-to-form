import { html } from '../utilities.js';

export default function Label(props, state, parent){

  return html`
  <div class="j2f__label" style="font-size: 12px;">${state}</div>
  `;

}