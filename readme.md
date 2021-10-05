# JSON-to-FORM (j2f)
Version 1.1.0

## Usage

```html
  <div id="app"></div>

  <link rel="stylesheet" href="./font-awesome/4.7.0/css/font-awesome.css"./>
  <link rel="stylesheet" href="./json-to-form/styles.css">
```

```javascript
import createJsonForm from './json-to-form/RootForm.js';

let elem = document.getElementById("app");
let ui = {};
let state = {};

const myForm = createJsonForm(elem, ui, state);

myForm.addEventListener('form-changed', e => {
  console.log("Event: ", e);
  let newState = {};
  myForm.update(newState);
});

```
By Rob DS

## License
[MIT](https://choosealicense.com/licenses/mit/)