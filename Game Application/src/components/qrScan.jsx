import React, {Component} from 'react';
import Button from "./Button";
import navigationMgr from "../navigationMgr";
import Menu from "./Menu";
import regeneratorRuntime from "regenerator-runtime";
import QrScanner from 'qr-scanner';

/**
 * QrScan component
 */
class QrScan extends Component {
  /**
   * constructor
   */
  constructor() {
    super();

    this.state = {
      classNames: ['qr-view', 'scroller'],
      insertCode: false
    };

    this.videoEl = React.createRef();
    this.inputEl = React.createRef();

    window.rnt.sound = true;
    window.setTimeout(() => {
      this.qrScanner = new QrScanner(this.videoEl.current, (result) => {
        if (result && result.data.indexOf('091089') !== -1) {
          this.qrScanner.stop();
          window.rnt.playCode = '091089';
          window.rnt.sound = false;
          window.rnt.socket.connect();
          window.rnt.eventMgr.releaseEvent('QrCodeInsideMuseum', null, null);
          navigationMgr.disposeComponent(this.reference, 500);
        }
      }, { returnDetailedScanResult: true });
    }, 100);
  }

  /**
   * set reference
   * @param reference
   */
  setReference(reference) {
    this.reference = reference;
  }

  /**
   * outside of museum
   * @param e
   */
  onClickOutsideMuseum(e) {
    e.stopPropagation();
    e.preventDefault();
    window.rnt.eventMgr.releaseEvent('QrCodeOutsideMuseum', null, null);
    navigationMgr.disposeComponent(this.reference, 500);
  }

  /**
   * inside of museum
   * @param e
   */
  onClickInsideMuseum(e) {
    e.stopPropagation();
    e.preventDefault();
    this.qrScanner.start();
  }

  /**
   * enter code
   * @param e
   */
  onClickEnterCode(e) {
    e.stopPropagation();
    e.preventDefault();
    this.setState({
      insertCode: true
    });
    window.setTimeout(() => {
      this.inputEl.current.focus();
    }, 100);
  }

  /**
   * input code
   * @param e
   */
  onInputCode(e) {
    e.stopPropagation();
    e.preventDefault();
    const target = e.target || e.srcElement;
    if (target.value.indexOf('091089') === 0) {
      if (this.qrScanner) {
        this.qrScanner.stop();
      }
      window.rnt.playCode = '091089';
      window.rnt.sound = false;
      window.rnt.socket.connect();
      window.rnt.eventMgr.releaseEvent('QrCodeInsideMuseum', null, null);
      navigationMgr.disposeComponent(this.reference, 500);
    }
  }

  /**
   * render component
   * @returns {JSX.Element}
   */
  render() {
    return (
      <div className={this.state.classNames.join(' ')}>
        <Menu />
        <h2>{window.rnt.lang.get('X0010')}</h2>
        <div className={'qr-placeholder'} onClick={(e) => {this.onClickInsideMuseum(e);}}>
          <video className={'camera'} ref={this.videoEl} />
        </div>
        <div className={'button'} onClick={(e) => {this.onClickInsideMuseum(e);}}>
          <Button title={window.rnt.lang.get('X0011')} />
        </div>
        <div className={'button'}>
          {!this.state.insertCode ?
            <Button title={window.rnt.lang.get('X0013')} onClick={(e) => {this.onClickEnterCode(e);}} /> :
            <input type={'text'} ref={this.inputEl} className={'code-input'} onInput={(e) => {this.onInputCode(e);}} />
          }
        </div>
        <div className={'button'} onClick={(e) => {this.onClickOutsideMuseum(e);}}>
          <Button title={window.rnt.lang.get('X0012')} invert={true} />
        </div>
      </div>
    )
  }

}

export default QrScan;