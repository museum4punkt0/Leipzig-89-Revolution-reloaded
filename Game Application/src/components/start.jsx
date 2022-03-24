import React, {Component} from 'react';
import Button from "./Button";
import Menu from "./Menu";
import navigationMgr from "../navigationMgr";

/**
 * Start component
 */
class Start extends Component {
  /**
   * constructor
   */
  constructor() {
    super();

    this.state = {
      classNames: ['start-view']
    };

    if (document.location.search.indexOf('09111091089') !== -1) {
      window.rnt.tabletMode = true;
    }
  }

  /**
   * set reference
   * @param reference
   */
  setReference(reference) {
    this.reference = reference;
  }

  /**
   * on click
   * @param e
   */
  onClick(e) {
    e.stopPropagation();
    e.preventDefault();
    if (document.location.search.indexOf('091089') !== -1) {
      window.rnt.playCode = '091089';
      window.rnt.sound = false;
      window.rnt.socket.connect();
      window.rnt.eventMgr.releaseEvent('TabletMuseum', null, null);
      navigationMgr.disposeComponent(this.reference, 500);
      return;
    }
    window.rnt.eventMgr.releaseEvent('onClickStart', null, null);
  }

  /**
   * open data protection
   * @param e
   */
  onOpenDataProtection(e) {
    e.stopPropagation();
    e.preventDefault();
    navigationMgr.navigateTo('dataprotection', true, {});
  }

  /**
   * render component
   * @returns {JSX.Element}
   */
  render() {
    return (
      <div className={this.state.classNames.join(' ')}>
        <div className={'title-image'}>
          <Menu />
          <h1><img src={'../img/start-title.png'} alt={'Leipzig 89 - Revolution Reloaded'} /></h1>
          <div className={'button'} onClick={(e) => {this.onClick(e);}}>
            <Button title={window.rnt.lang.get('X0003')} />
          </div>
          <div className={'language'}>DE</div>
          <div className={'more'} onClick={this.onOpenDataProtection}>{window.rnt.lang.get('X0006')}</div>
        </div>
      </div>
    )
  }

}

export default Start;