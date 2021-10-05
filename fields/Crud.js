import { html, changed } from '../utilities.js';
import Form from './Form.js';

export default async function (props, state, parent) {

  let { permissions={}, formTypes=[], endpointTypes="", layout="list", property } = props;
  layout = layout.toLowerCase();
  const { add=true, edit=true, del=true } = permissions;

  const actions = {
    handleFieldChange(e) {
      let newState = [ ...state ];
      newState[e.detail.idx] = e.detail.value;
      changed(parent, property, newState);
    },
    removeItem(e) {
      let newState = [ ...state ];
      newState = newState.filter((item,index) => index != e.detail.idx);
      changed(parent, property, newState);
    },
    eventDispatch(eventName, breadpath, idForm, idx) {
      property && (breadpath = breadpath.includes('>') ? `${property}>${breadpath}` : `${property}>${idx}`);
      parent.eventDispatch(eventName, breadpath, idForm, idx);
    }
  }

  const addRegister = function(e){
    let newState = [ ...state ];
    newState[state.length] = props.formItem.fields.reduce((r,f) => {
      if(!f.property) return r;  // for buttons
      const initialState = "initialState" in f ? f.initialState : null;
      r[f.property] = initialState;
      return r;
    }, {});
    changed(parent, property, newState);
  }

  const formTypespropss = {};
  for(var i=0; i < formTypes.length; i++){
    formTypespropss[formTypes[i]] = await fetchJson(endpointTypes + '/' + formTypes[i]);
  }

  const createRegisters = async (items, actions) => {
    const registers = [];
    for(var i=0; i < items.length; i++){
      let formProps = props.formItem || formTypespropss[items[i]._type];
      layout == "grid" && (formProps.layout = "row") && (formProps.permissions = {del,edit});
      registers[i] = await Form(formProps, items[i], actions, i);
    }
    return registers;
  };


  //const fields = await createFields(props.fields, state, actions);
  const titles = layout == "grid" && state.length ? props.formItem.fields.map(f => f.component == "Hidden" ? '' : html`<th>${f.label || f.property}</th>`) : '';
  const registers = await createRegisters(state, actions);
  const plusButton = html`<i class="fa fa-plus j2f__icon" style="margin-left: 7px;" @click=${addRegister}></i>`;

  return html`
    <div class="j2f__crud j2f__scrollbox">
      <h3> ${props.label || property}</h3>
      ${layout == "grid" ? html`
        <table class="j2f__table">
          <thead><tr>${titles}</tr></thead>
          <tbody>${registers}</tbody>
        </table>
        ${add ? plusButton : ''}
      ` : html`
        ${add ? plusButton : ''}
        <ul>${registers}</ul>
      `}
    </div>
  `;

  // ${del ? html`<th></th>`:''}
}