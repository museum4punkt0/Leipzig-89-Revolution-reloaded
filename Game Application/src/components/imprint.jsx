import React, {Component} from 'react';
import navigationMgr from "../navigationMgr";
import Back from "./Back";

/**
 * Imprint component
 */
class Imprint extends Component {
  /**
   * constructor
   */
  constructor() {
    super();

    this.state = {
      classNames: ['imprint']
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
   * click back
   */
  onClickBack() {
    navigationMgr.disposeComponent(this.reference);
  }

  /**
   * render component
   * @returns {JSX.Element}
   */
  render() {
    return (
      <div className={this.state.classNames.join(' ')}>
        <Back callback={this.onClickBack.bind(this)} />
        <h2>
          Leipzig ‚89<br/>
          Revolution Reloaded
        </h2>
        <div className={'text-center'}>Ein Spiel des Deutschen Historischen Museums</div>
        <div className={'address'}>
          Deutsches Historisches Museum<br/>
          Unter den Linden 2<br/>
          10117 Berlin<br/><br/>

          {
            window.rnt.tabletMode ? <>dhm.de</> : <a href={'https://www.dhm.de'} target={'_blank'}>dhm.de</a>
          }

        </div>
        <hr/>
        <div className={'implementation'}>Umsetzung mit Playing History</div>
        <div className={'link'}>
          {
            window.rnt.tabletMode ? <>playinghistory.de</> : <a href={'https://www.playinghistory.de'} target={'_blank'}>playinghistory.de</a>
          }
        </div>
        <div className={'logo-section'}>
          <img src={'./img/logo-dhm.png'} className={'logo1'} />
          <img src={'./img/logo-ph.png'} className={'logo2'} />
        </div>
        <div className={'promotion'}>
          Gefördert von
        </div>
        <div className={'logo-section2'}>
          <img src={'./img/logo-museum4punkt0.png'} className={'logo1'} />
        </div>
        <br/>
      </div>
    )
  }

}

export default Imprint;