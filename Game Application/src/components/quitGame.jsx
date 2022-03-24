import React, {Component} from 'react';
import Button from "./Button";
import navigationMgr from "../navigationMgr";

/**
 * Quit Game component
 */
class QuitGame extends Component {
  /**
   * constructor
   * @param data
   */
  constructor(data) {
    super();

    this.state = {
      classNames: ['quit-game']
    };
  }

  /**
   * set reference
   * @param reference
   */
  setReference(reference) {
    this.reference = reference;
  }

  /**
   * click ok
   * @param e
   */
  onClickOk(e) {
    e.stopPropagation();
    e.preventDefault();
    document.location.href = '';
  }

  /**
   * click cancel
   * @param e
   */
  onClickCancel(e) {
    e.stopPropagation();
    e.preventDefault();
    navigationMgr.disposeComponent(this.reference);
  }

  /**
   * render component
   * @returns {JSX.Element}
   */
  render() {
    return (
      <div className={this.state.classNames.join(' ')}>
        <h2>{window.rnt.lang.get('X0132')}</h2>
        <div className={'button ok'} onClick={(e) => {this.onClickOk(e);}}>
          <Button title={window.rnt.lang.get('X0133')} />
        </div>
        <div className={'button cancel'} onClick={(e) => {this.onClickCancel(e);}}>
          <Button title={window.rnt.lang.get('X0134')} invert={true} />
        </div>
      </div>
    )
  }

}

export default QuitGame;