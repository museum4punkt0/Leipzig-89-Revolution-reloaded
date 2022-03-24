import React, {Component} from 'react';
import navigationMgr from "../navigationMgr";
import ClockText from "./ClockText";

/**
 * Bottom toolbar component
 */
class BottomToolbar extends Component {
  /**
   * constructor
   * @param data
   */
  constructor(data) {
    super(data);
    const timeSplit = data.data.time.split(':');
    const timeFromSplit = data.data.timeFrom ? data.data.timeFrom.split(':') : ['0', '0'];

    this.state = {
      submenuOpen: false,
      mapActive: null,
      characterActive: null,
      minute: ((timeSplit[1] * 6) + (timeSplit[0] * 360)) + 'deg',
      hour: ((timeSplit[0] * 30) - 90) + 'deg',
      minuteFrom: ((timeFromSplit[1] * 6) + (timeFromSplit[0] * 360)) + 'deg',
      hourFrom: ((timeFromSplit[0] * 30) - 90) + 'deg',
      progress: Math.round((((timeSplit[0] * 60) + (timeSplit[1] * 1)) * 100) / 1440) + '%',
      progressFrom: Math.round((((timeFromSplit[0] * 60) + (timeFromSplit[1] * 1)) * 100) / 1440) + '%',
      duration:  '1s',
      sound: !!window.rnt.sound,
      language: window.rnt.lang.appLocale,
      clockTextVisible: false,
      ... data.data
    }

    this.minuteRef = React.createRef();
    this.hourRef = React.createRef();
    this.progressRef = React.createRef();

    window.setTimeout(() => {
      this.minuteRef.current.addEventListener('animationend', () => {
        this.setNewState('minuteFrom',  this.state.minute);
        this.minuteRef.current.classList.remove('animate');
      });
      this.hourRef.current.addEventListener('animationend', () => {
        this.setNewState('hourFrom',  this.state.hour);
        this.hourRef.current.classList.remove('animate');
      });

      this.minuteRef.current.classList.add('animate');
      this.hourRef.current.classList.add('animate');
      this.progressRef.current.classList.add('animate');
    }, 100);
  }

  /**
   * store reference
   * @param reference
   */
  setReference(reference) {
    this.reference = reference;

    this.reference.widget.addEventListener('touchstart', (e) => {
      const target = e.target || e.srcElement;

      if (this.state.submenuOpen && target.classList.contains('overlay')) {
        e.preventDefault();
        e.stopPropagation();
        this.onToggleSubmenu(e, false);
      }
    });
  }

  /**
   * update component
   * @param data
   */
  update(data) {
    const state = {...this.state, ... data};

    if (data.time) {
      if (data.timeFrom) {
        const timeFromSplit = data.timeFrom.split(':');
        state.minuteFrom = ((timeFromSplit[1] * 6) + (timeFromSplit[0] * 360)) + 'deg';
        state.hourFrom = ((timeFromSplit[0] * 30) - 90) + 'deg';
        state.progressFrom = Math.round((((timeFromSplit[0] * 60) + (timeFromSplit[1] * 1)) * 100) / 1440) + '%';
      } else {
        state.progressFrom = state.progress;
      }

      const timeSplit = data.time.split(':');
      state.minute = ((timeSplit[1] * 6) + (timeSplit[0] * 360)) + 'deg';
      state.hour = ((timeSplit[0] * 30) - 90) + 'deg';
      state.duration = '1s';
    }

    this.setState(state);
    window.setTimeout(() => {
      this.minuteRef.current.classList.add('animate');
      this.hourRef.current.classList.add('animate');
      this.progressRef.current.classList.add('animate');
    }, 100);

    if (data && data.callback) {
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
   * toggle submenu
   * @param e
   * @param state
   */
  onToggleSubmenu(e, state) {
    e.preventDefault();
    e.stopPropagation();
    if (this.state.characterActive) {
      this.onShowCharacterDetail(e);
    }
    if (this.state.mapActive) {
      this.onToggleMap(e);
    }

    if (this.state.clockTextVisible) {
      this.onClickClock(e);
    }

    this.setNewState('submenuOpen', state);

    if (state) {
      this.reference.widget.classList.remove('small');
    } else {
      this.reference.widget.classList.add('small');
    }
  }

  /**
   * toggle map
   * @param e
   */
  onToggleMap(e) {
    e.preventDefault();
    e.stopPropagation();
    if (this.state.characterActive) {
      this.onShowCharacterDetail(e);
    }
    if (this.state.submenuOpen) {
      this.onToggleSubmenu(e, false);
    }

    if (this.state.clockTextVisible) {
      this.onClickClock(e);
    }

    this.setNewState('mapActive', !this.state.mapActive);

    if (this.state.mapActive) {
      navigationMgr.navigateTo('map', true, this.state.map);
    } else {
      const map = navigationMgr.getComponent('map');
      if (map) {
        navigationMgr.disposeComponent(map);
      }
    }
  }

  /**
   * navigate to home
   * @param e
   */
  onClickHome(e) {
    e.preventDefault();
    e.stopPropagation();
    navigationMgr.navigateTo('quitGame', true, {});
  }

  /**
   * toggle speaker
   * @param e
   */
  onToggleSpeaker(e) {
    e.preventDefault();
    e.stopPropagation();
    window.rnt.sound = !window.rnt.sound;
    this.setNewState('sound', window.rnt.sound);
  }

  /**
   * toggle language
   * @param e
   */
  onToggleLanguage(e) {
    e.preventDefault();
    e.stopPropagation();
    if (this.state.language === 'de_DE') {
      window.rnt.lang.changeTo('en_US');
    } else {
      window.rnt.lang.changeTo('de_DE');
    }

    this.setNewState('language', window.rnt.lang.appLocale);
  }

  /**
   * show character detail
   * @param e
   */
  onShowCharacterDetail(e) {
    e.preventDefault();
    e.stopPropagation();

    if (this.state.mapActive) {
      this.onToggleMap(e);
    }
    if (this.state.submenuOpen) {
      this.onToggleSubmenu(e, false);
    }

    if (this.state.clockTextVisible) {
      this.onClickClock(e);
    }

    this.setNewState('characterActive', !this.state.characterActive);
    if (this.state.characterActive) {
      switch(this.state.map.character) {
        case 'egon': window.rnt.eventMgr.releaseEvent('onShowCharacterEgon', null, null); break;
        case 'kurt': window.rnt.eventMgr.releaseEvent('onShowCharacterKurt', null, null); break;
        case 'almut': window.rnt.eventMgr.releaseEvent('onShowCharacterAlmut', null, null); break;
        case 'thomas': window.rnt.eventMgr.releaseEvent('onShowCharacterThomas', null, null); break;
        case 'hannes': window.rnt.eventMgr.releaseEvent('onShowCharacterHannes', null, null); break;
        case 'frauke': window.rnt.eventMgr.releaseEvent('onShowCharacterFrauke', null, null); break;
        case 'sabine': window.rnt.eventMgr.releaseEvent('onShowCharacterSabine', null, null); break;
      }
    } else {
      const map = navigationMgr.getComponent('characterDetail');
      if (map) {
        navigationMgr.disposeComponent(map);
      }
    }
  }

  /**
   * click clock
   * @param e
   */
  onClickClock(e) {
    e.preventDefault();
    e.stopPropagation();

    if (!this.state.clockTextVisible) {
      if (this.state.mapActive) {
        this.onToggleMap(e);
      }
      if (this.state.submenuOpen) {
        this.onToggleSubmenu(e, false);
      }
      if (this.state.characterActive) {
        this.onShowCharacterDetail(e);
      }
    }

    this.setNewState('clockTextVisible', !this.state.clockTextVisible);
  }

  /**
   * render method
   * @returns {JSX.Element}
   */
  render() {
    return (
      <footer>
        <div className={'time-progress-container'}>
          <div className={'progress'} ref={this.progressRef} style={{width: this.state.progressFrom, '--toolbarProgress': this.state.progress, '--toolbarTime': this.state.duration}}></div>
        </div>
        <ul className={'toolbar-items'}>
          <li className={'menu'} onClick={(e) => {this.onToggleSubmenu(e, true);}}>
            {this.state.submenuOpen &&
            <div className={'sub-menu'}>
              <ul className={'sub-menu-items'}>
                <li className={'home'} onClick={(e) => {this.onClickHome(e);}} />
                <li className={'speaker' + (this.state.sound ? '' : ' deactivated')} onClick={(e) => {this.onToggleSpeaker(e);}} />
                <li className={'language ' + window.rnt.lang.appLocale} onClick={(e) => {this.onToggleLanguage(e);}} />
              </ul>
              <div className={'close-menu'} onClick={(e) => {this.onToggleSubmenu(e, false);}}>
                <div className={'close-button'} />
              </div>
            </div>
            }
          </li>
          <li className={'clock' + (this.state.clockTextVisible === true ? ' active' : this.state.clockTextVisible === false ? ' inactive' : '')} onClick={(e) => {this.onClickClock(e);}}>
            {this.state.clockTextVisible && this.state.timeText && <ClockText title={window.rnt.lang.get(this.state.timeText)} />}
            <div className={'dial'}>
              <div className={'minute'} ref={this.minuteRef} style={{transform: `rotate(${this.state.minuteFrom})`, '--degree': this.state.minute, '--time': this.state.duration}} />
              <div className={'hour'} ref={this.hourRef} style={{transform: `rotate(${this.state.hourFrom})`, '--degree': this.state.hour, '--time': this.state.duration}} />
            </div>
          </li>

          <li className={'map' + (this.state.mapActive === true ? ' active' : this.state.mapActive === false ? ' inactive' : '')} onClick={(e) => {this.onToggleMap(e);}}>
            <div className={'icon'} />
          </li>
          <li className={'character' + (this.state.characterActive === true ? ' active' : this.state.characterActive === false ? ' inactive' : '')} onClick={(e) => {this.onShowCharacterDetail(e);}}>
            <div className={'icon'} style={{backgroundImage: `url('${window.rnt.imagePath}${this.state.src}')`}} />
          </li>
        </ul>
      </footer>
    )
  }

}

export default BottomToolbar;
