import React, {Component} from 'react';
import navigationMgr from "../navigationMgr";
import Button from "./Button";
import Menu from "./Menu";
import Back from "./Back";
import Bubble from "./Bubble";

/**
 * Character detail component
 */
class CharacterDetail extends Component {
  /**
   * constructor
   * @param data
   */
  constructor(data) {
    super();

    this.state = {
      classNames: ['character-detail-view', 'scroller'],
      menuVisible: !!navigationMgr.getComponent('bottomToolbar'),
      currentSlide: 0,
      slideLeft: 0,
      animateLeft: 0,
      ... data.data
    };


    this.slider = React.createRef();

    window.setTimeout(() => {
      const start = (e) => {
        this.touchX = this.getXCoordinate(e);
        this.startX = this.state.slideLeft;
        this.slideMax = (this.state.slides.length - 1) * -100
      };

      const move = (e) => {
        if (!this.isTouchDevice() && !this.touchX) {
          return;
        }

        const differenceX = (this.getXCoordinate(e) - this.touchX) / 2;
        const left = Math.max(Math.min( 0, this.startX + differenceX), this.slideMax);
        this.setNewState('currentSlide', Math.abs(Math.round(left / 100)));
        this.setNewState('slideLeft', left);
      };

      const end = (e) => {
        const differenceX = (this.getXCoordinate(e) - this.touchX) / 2;
        const left = Math.max(Math.min( 0, this.startX + differenceX), this.slideMax);
        this.setNewState('currentSlide', Math.abs(Math.round(left / 100)));
        this.slider.current.classList.add('animate');
        this.setNewState('animateLeft', Math.round(left / 100) * 100);
        this.touchX = null;
      };

      this.slider.current.addEventListener('animationend', () => {
        this.setNewState('slideLeft',  this.state.animateLeft);
        this.slider.current.classList.remove('animate');
      });

      if (this.isTouchDevice()) {
        this.slider.current.addEventListener('touchstart', start);
        this.slider.current.addEventListener('touchmove', move);
        this.slider.current.addEventListener('touchend', end);
      } else {
        this.slider.current.addEventListener('mousemove', move);
        this.slider.current.addEventListener('mousedown', start);
        this.slider.current.addEventListener('mouseup', end);
      }

    }, 100);
  }

  /**
   * store reference
   * @param reference
   */
  setReference(reference) {
    this.reference = reference;
  }

  /**
   * return x coordinate
   * @param e
   * @returns {number|number|*}
   */
  getXCoordinate(e) {
    if (this.isTouchDevice()) {
      const touchObj = e && e.changedTouches && e.changedTouches[0];
      return parseInt(touchObj && touchObj.clientX) || 0;
    } else {
      return e.pageX;
    }
  }

  /**
   * check if device is touch device
   * @returns {boolean}
   */
  isTouchDevice() {
    return (('ontouchstart' in window) ||
      (navigator.maxTouchPoints > 0) ||
      (navigator.msMaxTouchPoints > 0));
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
   * start game
   * @param e
   */
  onStartGame(e) {
    e.stopPropagation();
    e.preventDefault();

    window.rnt.actions.storeStatistic({
      keyword: "Sprache",
      value: window.rnt.lang.appLocale,
      type: "string"
    });

    window.rnt.gameStart = Date.now();

    window.rnt.socket.startGame(this.state.character);
    window.rnt.eventMgr.releaseEvent('onCharacterConfirmed', null, null);
    navigationMgr.disposeComponent(this.reference, 500);
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
        {!this.state.menuVisible && <Menu />}
        {!this.state.menuVisible && <Back callback={this.onClickBack.bind(this)} />}
        <div className={'title'}>{window.rnt.lang.get(this.state.name)}</div>
        <div className={'slider'} style={{backgroundImage: `url('${window.rnt.imagePath}${this.state.src}')`}}>
          <div className={'inner'} style={{width: (this.state.slides.length * 100) + 'vw', marginLeft: this.state.slideLeft + 'vw', '--animateLeft': this.state.animateLeft + 'vw'}}  ref={this.slider}>
            {
              this.state.slides.map((slide, i) => (
                <div className={'item'} key={i}>
                  <Bubble
                    title={window.rnt.lang.get(slide.title)}
                    text={window.rnt.lang.get(slide.text)}
                    position={''}
                  />
                </div>
              ))
            }
          </div>
        </div>
        <div className={'slider-navigation'}>
          {
            this.state.slides.map((slide, i) => (
              <div className={'item' + (this.state.currentSlide === i ? ' active' : '')} key={i} />
            ))
          }
        </div>
        <div className={'default-text'}>
          {window.rnt.lang.get(this.state.description)}
        </div>
        <div className={'title2'}>{window.rnt.lang.get(this.state.object.title)}</div>
        <div className={'title-image'} style={{backgroundImage: `url('${window.rnt.imagePath}${this.state.object.src}')`}} />
        <div className={'default-text'}>
          {window.rnt.lang.get(this.state.object.description)}
        </div>

        {this.state.object && this.state.object.facts && <>
          <div className={'list-title'}>{window.rnt.lang.get('X0038')}</div>
          <ul>
            {
              this.state.object.facts.map((fact, i) => (
                <li key={i}>{window.rnt.lang.get(fact.text)}</li>
              ))
            }
          </ul>
        </>
        }

        {!this.state.menuVisible && <Button title={window.rnt.lang.get(this.state.button)} onClick={this.onStartGame.bind(this)} />}
        {this.state.menuVisible && <div className={'bottom-space'} />}

      </div>
    )
  }

}

export default CharacterDetail;