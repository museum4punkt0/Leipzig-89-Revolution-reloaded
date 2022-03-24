import React, {Component} from 'react';
const io = require("socket.io-client");
import ARTEFACTS from '../artefacts';
import DEFAULT_CHARACTER from '../defaultCharacter';

const CLOCK_SPEED = 50; // ms

const INSTRUCTION_MIN = 15000; // ms
const INSTRUCTION_MAX = 20000; // ms
const CHARACTER_MIN = 15000; // ms
const CHARACTER_MAX = 20000; // ms
const DEMOVERLAUF_MIN = 5000; // ms
const DEMOVERLAUF_MAX = 7000; // ms
const STEP_BETWEEN_TIME_MIN = 5000; // ms
const STEP_BETWEEN_TIME_MAX = 10000; // ms

/**
 * main beamer component
 */
class Index extends Component {
  constructor() {
    super();
    //Initial State
    this.state = {
      nextStep: 'clock',
      characters: [...DEFAULT_CHARACTER],
      clock: {
        minute: 0,
        hour: 0
      },
      shortArrowFrom: -30.5,
      shortArrow: -30.5,
      shortArrowTime: 0,
      instructionTime: 0,
      demoverlaufTime: 0,
      characterTime: 0,
      sound: true,
      donutState: 100,
      currentArtefact: null
    };

    this.instructionRef = React.createRef();
    this.shortArrow = React.createRef();
    this.character0 = React.createRef();
    this.character1 = React.createRef();
    this.character2 = React.createRef();
    this.character3 = React.createRef();
    this.character4 = React.createRef();
    this.character5 = React.createRef();
    this.character6 = React.createRef();

    this.demoverlauf1 = React.createRef();
    this.demoverlauf2 = React.createRef();
    this.demoverlauf3 = React.createRef();
    this.demoverlauf4 = React.createRef();
    this.demoverlauf5 = React.createRef();
    this.demoverlauf6 = React.createRef();
    this.innerHistorical = React.createRef();
    this.nextStep();


    this.connection = io.connect("{{socket-url}}");

    this.connection.on("connect", () => {
      this.connection.emit('beamer-register', '{{beamer-token}}');
    });

    this.connection.on("client-update", (data) => {
      const state = this.state;
      // reset old data
      state.characters.forEach((character) => {
        character.number = 0;
        character.filled = false;
      });

      data.forEach((client) => {
        state.characters.forEach((character) => {
          if(character.character === client.currentCharacter) {
            character.number ++;
            if (!client.started) {
              character.filled = true;
            }
          }
        });
      });

      this.setState(state);
    });

      this.connection.on("new-artefact", (data) => {
        if (ARTEFACTS[data] && !this.state.currentArtefact) {
          this.setNewState('donutState', 100);
          this.setNewState('currentArtefact', ARTEFACTS[data]);
          if (this.audio && ARTEFACTS[data].sound) {
            window.setTimeout(() => {this.audio.volume = 0.9;}, 50);
            window.setTimeout(() => {this.audio.volume = 0.8;}, 100);
            window.setTimeout(() => {this.audio.volume = 0.7;}, 150);
            window.setTimeout(() => {this.audio.volume = 0.6;}, 200);
            window.setTimeout(() => {this.audio.volume = 0.5;}, 250);
            window.setTimeout(() => {this.audio.volume = 0.4;}, 300);
            window.setTimeout(() => {this.audio.volume = 0.3;}, 350);
            window.setTimeout(() => {this.audio.volume = 0.2;}, 400);
            window.setTimeout(() => {
              this.audio.volume = 0.2;
              this.artefactSound = new Audio( './img/sounds/' + ARTEFACTS[data].sound);
              this.artefactSound.play().then(() => {
                this.animateDonut = window.setInterval(() => {
                  this.setNewState('donutState', this.state.donutState - 0.125);
                  if (this.state.donutState <= 0) {
                    window.clearInterval(this.animateDonut);
                  }
                }, ((this.artefactSound.duration * 1000) / 800));
              });

              this.artefactSound.addEventListener("ended", () => {
                this.innerHistorical.current.classList.remove('show');
                this.innerHistorical.current.classList.add('hide');
                window.setTimeout(() => {
                  this.setNewState('currentArtefact', null);
                }, 500);
                window.setTimeout(() => {this.audio.volume = 0.3;}, 50);
                window.setTimeout(() => {this.audio.volume = 0.4;}, 100);
                window.setTimeout(() => {this.audio.volume = 0.5;}, 150);
                window.setTimeout(() => {this.audio.volume = 0.6;}, 200);
                window.setTimeout(() => {this.audio.volume = 0.7;}, 250);
                window.setTimeout(() => {this.audio.volume = 0.8;}, 300);
                window.setTimeout(() => {this.audio.volume = 0.9;}, 350);
                window.setTimeout(() => {this.audio.volume = 1;}, 400);
              });

              }, 400);
          } else {
            this.animateDonut = window.setInterval(() => {
              this.setNewState('donutState', this.state.donutState - 0.125);
              if (this.state.donutState <= 0) {
                window.clearInterval(this.animateDonut);
                this.innerHistorical.current.classList.remove('show');
                this.innerHistorical.current.classList.add('hide');
                window.setTimeout(() => {
                  this.setNewState('currentArtefact', null);
                }, 500);
              }
            }, ((15000) / 800));

          }
        }
      });


    this.audio = new Audio( './img/sounds/DHM_ATMO.mp3');
    this.audio.loop = true;
    this.audio.play()
    document.getElementById('magic').onclick = () => {
      this.audio.play();
      document.getElementById('magic').onclick = null;
    }
  }

  /**
   * manage time
   */
  manageTime() {
    if (!this.animateTime) {
      const diffMin = 45 / CLOCK_SPEED;
      const diffHour = 3.75 / CLOCK_SPEED;

      this.animateTime = window.setInterval(() => {
        let minute = this.state.clock.minute + diffMin;
        let hour = this.state.clock.hour + diffHour;

        if (minute > 360) {
          minute -= 360;
        }
        if (hour > 360) {
          hour -= 360;
        }

        this.setState({
          clock: {
            minute: minute,
            hour: hour
          }
        })
      }, CLOCK_SPEED);
    }
  }

  /**
   * show instruction
   */
  showInstance(ref, nextStepTime) {
    ref.current.onanimationend = () => {
      ref.current.classList.remove('animate');
      /* set timeout for next step */
      if (!nextStepTime) {
        return window.setTimeout(() => {
          this.nextStep();
        }, this.rand(STEP_BETWEEN_TIME_MIN, STEP_BETWEEN_TIME_MAX));
      }
    };

    // do not wait for end of animation
    if (nextStepTime) {
      window.setTimeout(() => {
        this.nextStep();
      }, nextStepTime);
    }

    ref.current.classList.add('animate');
  }

  /**
   * manage small arrow
   * @param deg
   */
  manageSmallArrow(deg) {
    this.setState({
      shortArrow: deg
    });

    this.shortArrow.current.onanimationend = () => {
      this.setNewState('shortArrowFrom', deg);
      this.shortArrow.current.classList.remove('animate');
    };

    window.setTimeout(() => {
      this.shortArrow.current.classList.add('animate');
    }, 100);
  }

  /**
   * show small arrow
   * @param deg
   */
  showSmallArrow() {
    this.setState({
      shortArrowFrom: -30.5,
      shortArrow: -30.5
    })

    this.shortArrow.current.onanimationend = () => {
      this.shortArrow.current.classList.add('shown');
      this.shortArrow.current.classList.remove('visible');
    };

    window.setTimeout(() => {
      this.shortArrow.current.classList.add('visible');
    }, 100);
  }

  /**
   * remove the small arrow
   * @param deg
   */
  removeSmallArrow(timeout) {
    return window.setTimeout(() => {

      this.shortArrow.current.onanimationend = () => {
        this.shortArrow.current.classList.remove('invisible');
        this.shortArrow.current.onanimationend = null;
      };

      this.shortArrow.current.classList.remove('visible');
      this.shortArrow.current.classList.remove('animate');
      this.shortArrow.current.classList.add('invisible');
      this.shortArrow.current.classList.remove('shown');

    }, timeout);
  }

  /**
   * process next step
   * @returns
   */
  nextStep() {
    /* start time */
    if (this.state.nextStep === 'clock') {
      this.setState({
        nextStep: 'instruction'
      });
      this.manageTime();
      /* set timeout for next step */
      return window.setTimeout(() => {
        this.nextStep();
      }, this.rand(STEP_BETWEEN_TIME_MIN, STEP_BETWEEN_TIME_MAX));
    }

    /* show instruction */
    if (this.state.nextStep === 'instruction') {
      this.setState({
        nextStep: 'character0',
        instructionTime: this.rand(INSTRUCTION_MIN, INSTRUCTION_MAX)
      });
      return this.showInstance(this.instructionRef);
    }

    /* show character #0 */
    if (this.state.nextStep === 'character0') {
      const time = this.rand(CHARACTER_MIN, CHARACTER_MAX);
      this.setState({
        nextStep: 'character1',
        characterTime: time,
        shortArrowTime: time * 0.2
      });
      this.showSmallArrow();
      return this.showInstance(this.character0, time * 0.6);
    }

    /* show character #1 */
    if (this.state.nextStep === 'character1') {
      this.setState({
        nextStep: 'character2'
      });
      this.manageSmallArrow(-1.5);
      return this.showInstance(this.character1, this.state.characterTime * 0.6);
    }

    /* show character #2 */
    if (this.state.nextStep === 'character2') {
      this.setState({
        nextStep: 'character3'
      });
      this.manageSmallArrow(30.5);
      return this.showInstance(this.character2, this.state.characterTime * 0.6);
    }

    /* show character #3 */
    if (this.state.nextStep === 'character3') {
      this.setState({
        nextStep: 'character4'
      });
      this.manageSmallArrow(59.5);
      return this.showInstance(this.character3, this.state.characterTime * 0.6);
    }

    /* show character #4 */
    if (this.state.nextStep === 'character4') {
      this.setState({
        nextStep: 'character5'
      });
      this.manageSmallArrow(88.5);
      return this.showInstance(this.character4, this.state.characterTime * 0.6);
    }

    /* show character #5 */
    if (this.state.nextStep === 'character5') {
      this.setState({
        nextStep: 'character6'
      });
      this.manageSmallArrow(120.5);
      return this.showInstance(this.character5, this.state.characterTime * 0.6);
    }

    /* show character #6 */
    if (this.state.nextStep === 'character6') {
      this.setState({
        nextStep: 'demoverlauf1'
      });
      this.manageSmallArrow(149.5);
      this.removeSmallArrow(this.state.characterTime * 0.6);
      return this.showInstance(this.character6);
    }

    /* show demoverlauf #1 */
    if (this.state.nextStep === 'demoverlauf1') {
      const time = this.rand(DEMOVERLAUF_MIN, DEMOVERLAUF_MAX);
      this.setState({
        nextStep: 'demoverlauf2',
        demoverlaufTime: time
      });
      return this.showInstance(this.demoverlauf1, time * 0.6);
    }

    /* show demoverlauf #2 */
    if (this.state.nextStep === 'demoverlauf2') {
      this.setState({
        nextStep: 'demoverlauf3'
      });
      return this.showInstance(this.demoverlauf2, this.state.demoverlaufTime * 0.6);
    }

    /* show demoverlauf #3 */
    if (this.state.nextStep === 'demoverlauf3') {
      this.setState({
        nextStep: 'demoverlauf4'
      });
      return this.showInstance(this.demoverlauf3, this.state.demoverlaufTime * 0.6);
    }

    /* show demoverlauf #4 */
    if (this.state.nextStep === 'demoverlauf4') {
      this.setState({
        nextStep: 'demoverlauf5'
      });
      return this.showInstance(this.demoverlauf4, this.state.demoverlaufTime * 0.6);
    }

    /* show demoverlauf #5 */
    if (this.state.nextStep === 'demoverlauf5') {
      this.setState({
        nextStep: 'demoverlauf6'
      });
      return this.showInstance(this.demoverlauf5, this.state.demoverlaufTime * 0.6);
    }

    /* show demoverlauf #6 */
    if (this.state.nextStep === 'demoverlauf6') {
      this.setState({
        nextStep: 'instruction'
      });
      return this.showInstance(this.demoverlauf6);
    }

  }

  /**
   * create random number
   * @param min
   * @param max
   * @returns {number}
   */
  rand(min, max) {
    return Math.round(Math.random() * (max - min) + min);
  }

  /**
   * set the reference
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

  render() {
    return (
      <div className={'dial' + (this.state.currentArtefact ? ' with-artefact ' + this.state.currentArtefact.character : '')}>

        <div className={'dial-hours'} />
        <div className={'pointer-hour'} style={{'--hourDegree': this.state.clock.hour + 'deg'}} />
        <div className={'pointer-minute'} style={{'--minuteDegree': this.state.clock.minute + 'deg'}} />

        <div className={'instruction'} ref={this.instructionRef} style={{'--time': this.state.instructionTime + 'ms'}} />
        <div className={'character0'} ref={this.character0} style={{'--time': this.state.characterTime + 'ms'}} />
        <div className={'character1'} ref={this.character1} style={{'--time': this.state.characterTime + 'ms'}} />
        <div className={'character2'} ref={this.character2} style={{'--time': this.state.characterTime + 'ms'}} />
        <div className={'character3'} ref={this.character3} style={{'--time': this.state.characterTime + 'ms'}} />
        <div className={'character4'} ref={this.character4} style={{'--time': this.state.characterTime + 'ms'}} />
        <div className={'character5'} ref={this.character5} style={{'--time': this.state.characterTime + 'ms'}} />
        <div className={'character6'} ref={this.character6} style={{'--time': this.state.characterTime + 'ms'}} />


        <div className={'demoverlauf1'} ref={this.demoverlauf1} style={{'--time': this.state.demoverlaufTime + 'ms'}} />
        <div className={'demoverlauf2'} ref={this.demoverlauf2} style={{'--time': this.state.demoverlaufTime + 'ms'}} />
        <div className={'demoverlauf3'} ref={this.demoverlauf3} style={{'--time': this.state.demoverlaufTime + 'ms'}} />
        <div className={'demoverlauf4'} ref={this.demoverlauf4} style={{'--time': this.state.demoverlaufTime + 'ms'}} />
        <div className={'demoverlauf5'} ref={this.demoverlauf5} style={{'--time': this.state.demoverlaufTime + 'ms'}} />
        <div className={'demoverlauf6'} ref={this.demoverlauf6} style={{'--time': this.state.demoverlaufTime + 'ms'}} />

        {this.state.currentArtefact &&
        <div ref={this.innerHistorical} className={'inner historical show'}>
          <svg width="200%" height="200%" viewBox="0 0 30 56.1" className="donut">
            <circle className="donut-segment" cx="29" cy="14" r="15.91549430918954"
                    fill="#5D5D95" strokeWidth="32" strokeDasharray={(100 - this.state.donutState) + ' ' + this.state.donutState} strokeDashoffset={this.state.currentArtefact.donutOffset} />
          </svg>
          <div className={'historical-artefact'} style={{backgroundImage: `url('./img/hist/${this.state.currentArtefact.image}')`}} />
          <div className={'inner-circle'} />
          <div className={'outer-circle'} />
          <div className={'arrow large'} style={{transform: 'rotate(' + this.state.currentArtefact.chevron + 'deg)'}}>
            <div className={'character-small'} style={{backgroundImage: `url('./img/projektion/${this.state.currentArtefact.characterImage}')`, transform: 'rotate(' + (this.state.currentArtefact.chevron * -1) + 'deg)'}} />
          </div>
        </div>
        }



        <div className={'arrow'} ref={this.shortArrow} style={{'--degree': this.state.shortArrow + 'deg', '--time': this.state.shortArrowTime + 'ms', transform: `rotate(${this.state.shortArrowFrom}deg)`}} />
        {this.state.characters.map((character, i) => (
          <div key={i} className={`number item-${i + 1}` + (character.filled ? ' filled' : '')}>{(character.number > 9 ? <>9 <small>+</small></> : character.number)}</div>
        ))}

      </div>
    )
  }

}

export default Index;