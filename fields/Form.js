import { html } from '../utilities.js';

import Form from './Form.js';
import Text from './Text.js';
import Number from './Number.js';
import Hidden from './Hidden.js';
import Enum from './Enum.js';
import Toggle from './Toggle.js';
import Crud from './Crud.js';
import Label from './Label.js';
import Button from './Button.js';

const components = {
  Form,
  Text, 
  Number,
  Hidden,
  Enum,
  Toggle,
  Crud,
  Label,
  Button
};

export default async function (props, state, parent, idx=false, ) {

  let { layout="", permissions={}, property, label=false } = props;
  const { edit=false, del=false } = permissions;
  layout = layout.toLowerCase();

  const actions = {
    handleFieldChange(e) {
      let newState = { ...state, [e.detail.property]: e.detail.value };
      parent.handleFieldChange({
        detail: {
          property,
          value: newState,
          idx
        }
      });
    },
    eventDispatch(eventName, breadpath, idForm, idx) {
      property && (breadpath = breadpath.includes('>') ? `${property}>${breadpath}` : `${property}>${idx}`);
      parent.eventDispatch(eventName, breadpath, idForm, idx);
    }
  }

  const createEventDispatch = (eventName, idx) => e => parent.eventDispatch(eventName, property, property, idx);

  const removeItem = idx => e => {
    parent.removeItem({
      detail: {
        property,
        value: null,
        idx
      }
    });
  }

  const createFields = async (fields, state, actions) => {
    const fieldsComponents = [];
    for(var i=0; i < fields.length; i++){
      const { component:type, property } = fields[i];
      layout == "row" && (fields[i].layout = "row");
      type == "Button" && (fields[i].handleClick = createEventDispatch(fields[i].eventName, idx) );
      fieldsComponents[i] = await components[type](fields[i], state[property] || '', actions);
    }
    let btnProps = { icon: 'fa-times', label: 'Remove', handleClick: removeItem(idx)};
    layout == "row" && (btnProps.layout = "row");
    del && (fieldsComponents[i] = await Button(btnProps));
    return fieldsComponents;
  };
  
  const fields = await createFields(props.fields, state, actions);
  const overlay = state._disabled ? html`<div class="j2f__overlay"></div>` : '';

  return html`
    ${layout == "row" ? html`
      <tr class="j2f__form ${state._disabled ? 'j2f__overlay' : ''}">
        ${fields}
      </tr>
    ` : html`
      <div class="j2f__form">
        <h2>${label || property}</h2>
        <div>
          ${overlay}
          ${fields}
        </div>
      </div>
    `}
  `;
}