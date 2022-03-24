import {renderToDIV} from "../util/react.util";
import React from 'react';
import ReactDOM from 'react-dom';

class DefaultController {

  /**
   * constructor
   */
  constructor() {}

  /**
   * render component
   * @param overlay
   * @returns {null|*}
   */
  render(overlay) {
    const reactEl = <this.component data={this.data} />;
    const result = renderToDIV(reactEl, (overlay ? 'overlay': 'page'));
    this.widget = result[0];
    this.componentInterface = result[1];
    this.componentInterface.setReference(this);
    this.componentInterface._isMounted = true;

    if (this.afterRender && typeof this.afterRender === 'function') {
      this.afterRender();
    }

    return this.widget;
  }

  /**
   * dispose component
   */
  dispose() {
    this.componentInterface._isMounted = false;
    ReactDOM.unmountComponentAtNode(this.widget);
    const parentNode = this.widget && this.widget.parentNode;
    if (parentNode) {
      parentNode.removeChild(this.widget);
    }
    this.widget = null;

    if (this.afterDispose && typeof this.afterDispose === 'function') {
      this.afterDispose();
    }
  }

}

export default DefaultController;