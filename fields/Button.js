import { html } from '../utilities.js';

export default function Button(props, state, actions){

  const { label="Action", handleClick, icon=false, layout=false } = props;

  const renderButton = () => {
    return (icon ? html`
      <i class="fa ${icon} j2f__icon j2f__btn" @click=${handleClick} title="${label}"></i>
    `:html`
      <button class="j2f__btn" @click=${handleClick}>${label}</buttton>
    `);
  }

  return html`
    ${layout=="row"? html`
      <td>${renderButton()}</td>
    `:html`
      ${renderButton()}
    `}
  `;

}