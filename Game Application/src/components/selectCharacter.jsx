import React, {Component} from 'react';
import Button from "./Button";
import Menu from "./Menu";

/**
 * Select Character component
 */
class SelectCharacter extends Component {
  /**
   * constructor
   * @param data
   */
  constructor(data) {
    super();
    this.state = {
      classNames: ['select-character-view'],
      degree: '0deg',
      animateDegree: '0deg',
      time: '0.2s',
      currentSelect: 0,
      characters: [],
      ... data.data
    };
    window.rnt.socket.selectCharacter(this.state.characters[this.state.currentSelect].character);


    this.wheel = React.createRef();
    this.characterWheel = React.createRef();

    window.setTimeout(() => {
      const start = (e) => {
        this.wheelX = this.getXCoordinate(e);
        this.startDegree = parseInt(this.state.degree);
      };

      const move = (e) => {
        if (!this.isTouchDevice() && !this.wheelX) {
          return;
        }

        const differenceX = Math.round((this.getXCoordinate(e) - this.wheelX) / 4);
        this.setNewState('degree', (this.startDegree + differenceX) + 'deg');
      };

      const end = (e) => {
        const clientX = this.getXCoordinate(e);

        const differenceX = Math.round((clientX - this.wheelX) / 4);
        let degree = Math.round((this.startDegree + differenceX) / 51.43) * 51.43;

        // go to next / prev if actions was a click
        if (differenceX < 4 && differenceX >= 0 && (clientX >= (window.innerWidth / 2))) {
          degree -= 51.43;
        }
        if (differenceX > -4 && differenceX <= 0 && (clientX <= (window.innerWidth / 2))) {
          degree += 51.43;
        }

        this.wheel.current.classList.add('animate');
        this.setNewState('animateDegree',  degree + 'deg');
        this.characterWheel.current.classList.add('animate');
        const select = Math.round((degree % 360) / 51.43);
        if (select > 0) {
          this.setNewState('currentSelect', 7 - select);
        } else {
          this.setNewState('currentSelect',  Math.abs(select));
        }
        window.rnt.socket.selectCharacter(this.state.characters[this.state.currentSelect].character);
        this.wheelX = null;
      };

      if (this.isTouchDevice()) {
        this.wheel.current.addEventListener('touchstart', start);
        this.wheel.current.addEventListener('touchmove', move);
        this.wheel.current.addEventListener('touchend', end);
        this.characterWheel.current.addEventListener('touchstart', start);
        this.characterWheel.current.addEventListener('touchmove', move);
        this.characterWheel.current.addEventListener('touchend', end);
      } else {
        this.wheel.current.addEventListener('mousemove', move);
        this.wheel.current.addEventListener('mousedown', start);
        this.wheel.current.addEventListener('mouseup', end);
        this.characterWheel.current.addEventListener('mousemove', move);
        this.characterWheel.current.addEventListener('mousedown', start);
        this.characterWheel.current.addEventListener('mouseup', end);
      }

      this.wheel.current.addEventListener('animationend', () => {
        this.setNewState('degree',  this.state.animateDegree);
        this.wheel.current.classList.remove('animate');
      });

      this.characterWheel.current.addEventListener('animationend', () => {
        this.characterWheel.current.classList.remove('animate');
      });
    }, 100);
  }

  /**
   * get x coordinate
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
   * set reference
   * @param reference
   */
  setReference(reference) {
    this.reference = reference;
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
   * select character
   * @param e
   */
  onSelectCharacter(e) {
    e.stopPropagation();
    e.preventDefault();
    window.rnt.eventMgr.releaseEvent('onCharacterSelected', null, this.state.characters[this.state.currentSelect].character);
  }

  /**
   * render component
   * @returns {JSX.Element}
   */
  render() {
    return (
      <div className={this.state.classNames.join(' ')}>
        <div className={'inner'}>
          <Menu />
          <h2>{window.rnt.lang.get('X0029')}</h2>
          <div className={'character-wheel'}>
            <div className={'character-wheel-rotate'} ref={this.characterWheel} style={{'--animateWheelDegree': this.state.animateDegree, '--wheelDegree': this.state.degree, '--time': this.state.time}} />
          </div>
          <div className={'title'}>{this.state.characters[this.state.currentSelect].name}</div>
          <Button title={window.rnt.lang.get('X0030')} onClick={this.onSelectCharacter.bind(this)} />
          <div className={'wheel-container'}>
            <div className={'wheel'} ref={this.wheel} style={{'--animateWheelDegree': this.state.animateDegree, '--wheelDegree': this.state.degree, '--time': this.state.time}}>
              <ul>
                {
                  this.state.characters.map((character, i) => (
                    <li className={'item-1'} key={i} style={{backgroundImage: `url('${window.rnt.imagePath}${character.item}')`}}></li>
                  ))
                }
              </ul>
            </div>

          </div>
        </div>
      </div>
    )
  }

}

export default SelectCharacter;