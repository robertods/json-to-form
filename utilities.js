import { html, render } from 'https://unpkg.com/lit-html@1.0.0/lit-html.js';
//import { unsafeHTML } from 'https://unpkg.com/lit-html@1.0.0/directives/unsafe-html.js';

//import validate from 'https://cdn.skypack.dev/jsonschema';
//import Schema from 'https://cdn.skypack.dev/validate';
//import { Schema } from 'https://unpkg.com/valivar';

export async function fetchJson(url) {
  let response = await fetch(url);
  let content;
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  } else {
    content = await response.json();
  }
  return content;
}

export function changed(parent, property, value) {
  parent.handleFieldChange({
    detail: {
      property,
      value
    }
  });
}

export { html, render };