import React from 'react';
import ReactDOM from 'react-dom';

/**
 * render an react element to a div container
 * @param {object} reactEl
 * @param {boolean} overlay
 * @returns {HTMLDivElement}
 */
export function renderToDIV(reactEl, className) {
  const el = document.createElement('div');;
  el.className = className;
  const component = ReactDOM.render(reactEl, el);
  return [el, component];
}