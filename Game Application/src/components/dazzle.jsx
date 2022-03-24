import React, {Component} from 'react';
import navigationMgr from "../navigationMgr";

/**
 * Dazzle component
 */
class Dazzle extends Component {
  /**
   * constructor
   */
  constructor() {
    super();

    this.state = {
      classNames: ['dazzle']
    };

    window.setTimeout(() => {
      navigationMgr.disposeComponent(this.reference);
    }, 1000);
  }

  /**
   * set reference
   * @param reference
   */
  setReference(reference) {
    this.reference = reference;
  }

  /**
   * render component
   * @returns {JSX.Element}
   */
  render() {
    return (
      <div className={this.state.classNames.join(' ')} />
    )
  }

}

export default Dazzle;