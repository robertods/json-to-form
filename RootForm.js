import { render } from './utilities.js';
import Form from './fields/Form.js';

export default function (root, props, initialState, schema=false) {
  
  let state = { ...initialState };
  let dataSchema = false;

  const actions = {
    handleFieldChange(e) {
      const property = e.detail.property;
      state = property ? { ...state, [property]: e.detail.value } : { ...state, ...e.detail.value };
      this.update(state);
      
      let errors = [];
      if(schema){
        //dataSchema = new Schema(schema);
        //errors = dataSchema.validate(state);
        ////validate(state, schema);
      }
      const event = new CustomEvent("form-changed", {
        bubbles: true,
        detail: {
          name: props.name || "unknown",
          value: state,
          //errors
        }
      });
      root.dispatchEvent(event);

    },
    eventDispatch(eventName, path, property, idx) {
      let register = path ? getRegister(state, path) : null;
      root.dispatchEvent(new CustomEvent(eventName, {
        bubbles: true,
        detail: {
          path,
          state,
          register,
          property,
          idx
        }
      }));
    }
  }

  const update = async function(state) {
    const rootForm = await Form(props, state, actions);
    render(rootForm, root);
  }

  const addEventListener = function(...params) {
    root.addEventListener(...params);
  }

  actions.update = update;
  update(state);

  return { 
    update,
    addEventListener 
  };
}

export function getRegister(state, path) {
  let pathParts = path.split('>');
  return pathParts.reduce((ref,prop) => ref[prop], state);
}
