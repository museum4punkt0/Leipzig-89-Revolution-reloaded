import React, {Component} from 'react';
import navigationMgr from "../navigationMgr";
import Menu from "./Menu";

/**
 * Intro component
 */
class Intro extends Component {
  /**
   * constructor
   * @param data
   */
  constructor(data) {
    super();

    const steps = [];

    for (let i = 0; i < data.data.maxFrame; i++) {
      steps.push('');
    }

    this.state = {
      classNames: ['intro-view'],
      steps: steps,
      ... data.data
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
   * update state data
   * @param data
   */
  update(data) {
    const steps = [];
    for (let i = 0; i < data.maxFrame; i++) {
      steps.push('');
    }

    const state = {... this.state, ...steps, ... data}
    this.setState(state);

    // call callback if set
    if (data.callback) {
      data.callback();
    }
  }

  /**
   * set new state for a property
   * @param property
   * @param value
   */
  setNewState(property, value) {
    const state = this.state;
    state[property] = value;
    this.setState(state);
  }

  /**
   * click next
   * @param e
   */
  onClickNext(e) {
    e.stopPropagation();
    e.preventDefault();
    if (this.state.currentFrame === this.state.steps.length) {
      window.rnt.eventMgr.releaseEvent('explanationFinished', null, null);
      navigationMgr.disposeComponent(this.reference, 500);
    } else {
      window.rnt.eventMgr.releaseEvent('nextIntro', null, null);
    }
  }

  /**
   * click previous
   * @param e
   */
  onClickPrevious(e) {
    e.stopPropagation();
    e.preventDefault();
    if (this.state.currentFrame > 0) {
      window.rnt.eventMgr.releaseEvent('previousIntro', null, null);
    }
  }

  /**
   * render component
   * @returns {JSX.Element}
   */
  render() {
    return (
      <div className={this.state.classNames.join(' ')} style={{backgroundImage: `url('${window.rnt.imagePath}${this.state.src}')`}}>
        <Menu />
        <ul className={'progress'}>
          {
            this.state.steps.map((item, i) => (
              <li className={(i === (this.state.currentFrame - 1) ? 'active' : '')} key={i} style={{width: (Math.floor(100 / this.state.maxFrame) - 2) + '%'}} />
            ))
          }
        </ul>
        <div className={'text-box'}>
          {window.rnt.lang.get(this.state.text)}
        </div>
        <div className={'button'} onClick={(e) => {this.onClick(e);}} />
        <div className={'click-right'} onClick={(e) => {this.onClickNext(e);}} />
        <div className={'click-left'} onClick={(e) => {this.onClickPrevious(e);}} />
        <div className={'next'} onClick={(e) => {this.onClickNext(e);}} />
        <div className={'back'}>zurück</div>
        <div className={'language'}>DE</div>
        <div className={'skip'}>Überspringen</div>
      </div>
    )
  }

}

export default Intro;