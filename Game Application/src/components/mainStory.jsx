import React, {Component} from 'react';
import Bubble from "./Bubble.jsx";
import Bookmark from "./Bookmark.jsx";
import Push from "./Push.jsx";
import AnswerButton from "./AnwerButton";
import Menu from "./Menu";

/**
 * Main story component
 */
class MainStory extends Component {
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
      classNames: ['main-story'],
      steps: steps,
      showAnswer: false,
      currentOverlay: data.data.textOverlays && data.data.textOverlays[0] || {},
      overlayCount: 0,
      currentSlide: 0,
      animateLeft: 0,
      slideLeft: 0,
      tx: data.data.textOverlays && data.data.textOverlays[0].zoomImage && data.data.textOverlays[0].zoomImage.x || 0,
      ty: data.data.textOverlays && data.data.textOverlays[0].zoomImage && data.data.textOverlays[0].zoomImage.y || 0,
      zoom: data.data.textOverlays && data.data.textOverlays[0].zoomImage && data.data.textOverlays[0].zoomImage.zoom || 100,
      ... data.data
    };

    this.slider = React.createRef();
    this.frame = React.createRef();
    this.pushRef = React.createRef();

    if (this.state.decision) {
      this.startSlider();
    }

    window.setTimeout(() => {
      this.animateFrame();
    }, 100);
  }

  /**
   * start slider
   */
  startSlider() {
    window.setTimeout(() => {
      const start = (e) => {
        this.touchX = this.getXCoordinate(e);
        this.startX = this.state.slideLeft;
        this.slideMax = (this.state.decision.answers.length - 1) * -100;
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
        this.setNewState('currentSlide',Math.min(this.state.decision.answers.length , Math.max( 0, Math.abs(Math.round(left / 100)))));
        this.setNewState('animateLeft', Math.round(left / 100) * 100);
        this.touchX = null;
        this.slider.current.classList.add('animate');
      };
      this.slider.current.addEventListener('animationend', () => {
        this.setNewState('slideLeft',  this.state.animateLeft);
        this.slider.current.classList.remove('animate');
      });

      if (this.isTouchDevice()) {
        this.slider.current.ontouchstart = start.bind(this);
        this.slider.current.ontouchmove = move.bind(this);
        this.slider.current.ontouchend = end.bind(this);
      } else {
        this.slider.current.onmousemove = move.bind(this);
        this.slider.current.onmousedown = start.bind(this);
        this.slider.current.onmouseup = end.bind(this);
      }

      this.setNewState('showAnswer', true);
    }, 50);
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
   * animate frame
   */
  animateFrame() {
    this.frame.current.addEventListener('animationend', () => {
      this.frame.current.style.backgroundPosition = `${this.state.tx}vw ${this.state.ty}vw`;
      this.frame.current.style.backgroundSize = `${this.state.zoom}% auto`;
      this.frame.current.classList.remove('animate');
      window.setTimeout(() => {
        this.blockNextOverlay = false;
      }, 300);
    });
  }

  /**
   * show next overlay
   * @param e
   */
  onShowNextOverlay(e) {
    const target = e.target || e.srcElement;
    if (target.classList.contains('handle')) {
      return;
    }

    e.preventDefault();
    e.stopPropagation();
    // return in answer case
    if (this.state.decision || this.blockNextOverlay) {
      return;
    }

    const isRightSide = e && (e.pageX || this.getXCoordinate(e)) > (window.innerWidth / 3);

    const overlayCount = isRightSide ? this.state.overlayCount + 1 : this.state.overlayCount - 1;

    const next = () => {
      // if next overlay exists
      if (this.state.textOverlays && this.state.textOverlays[overlayCount]) {
        this.setNewState('currentOverlay', this.state.textOverlays[overlayCount]);
        this.setNewState('overlayCount', overlayCount);
        if (this.state.textOverlays[overlayCount].zoomImage) {
          this.setNewState('tx', this.state.textOverlays[overlayCount].zoomImage.x);
          this.setNewState('ty', this.state.textOverlays[overlayCount].zoomImage.y);
          this.setNewState('zoom', this.state.textOverlays[overlayCount].zoomImage.zoom);
          this.frame.current.classList.add('animate');
          this.blockNextOverlay = true;
        }
        return;
      }

      if (isRightSide) {
        window.rnt.eventMgr.releaseEvent('nextChapter', null, null);
      } else {
        window.rnt.eventMgr.releaseEvent('previousChapter', null, null);
      }
    }

    if (this.pushRef.current) {
      this.pushRef.current.classList.remove('show');
      this.pushRef.current.classList.add('hide');
      window.setTimeout(() => {
        next();
      }, 500);
    } else {
      next();
    }
  }

  /**
   * update the current frame
   * @param data
   */
  update(data) {
    const steps = {
      steps: []
    };

    for (let i = 0; i < data.maxFrame; i++) {
      steps.steps.push('');
    }

    const state = {... data, ... steps};

    state.classNames = this.state.classNames;
    state.currentSlide = 0;
    state.animateLeft = 0;
    state.slideLeft = 0;


    state.currentOverlay = data.textOverlays && data.textOverlays[0] || {};
    state.overlayCount = 0;
    state.tx = data.textOverlays && data.textOverlays[0].zoomImage && data.textOverlays[0].zoomImage.x || 0;
    state.ty = data.textOverlays && data.textOverlays[0].zoomImage && data.textOverlays[0].zoomImage.y || 0;
    state.zoom = data.textOverlays && data.textOverlays[0].zoomImage && data.textOverlays[0].zoomImage.zoom || 100;

    this.frame.current.style.backgroundPosition = `${state.tx}vw ${state.ty}vw`;
    this.frame.current.style.backgroundSize = `${state.zoom}% auto`;
    this.setState(state);

    if (state.decision) {
      this.startSlider();
    } else {
      this.setState({decision: null, showAnswer: false});
    }

    // call callback if set
    if (data.callback) {
      data.callback();
    }
  }

  /**
   * submit the answer
   */
  onSubmitAnswer(timeout) {
    window.rnt.eventMgr.releaseEvent('answerSelected', this.state.character, timeout ? '' : this.state.decision.answers[this.state.currentSlide].key);
    this.setNewState('showAnswer', false);
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
      <div className={this.state.classNames.join(' ') + (this.state.theme ? ' ' + this.state.theme : '')} ref={this.frame} style={{backgroundImage: `url('${window.rnt.imagePath}${this.state.src}')`,'--animatePosition': `${this.state.tx}vw ${this.state.ty}vw`, '--animateSize': `${this.state.zoom}% auto`}} onTouchEnd={(e) => {this.onShowNextOverlay(e);}} onClick={(e) => {this.onShowNextOverlay(e);}}>
        <ul className={'progress'}>
          {
            this.state.steps.map((item, i) => (
              <li className={(i === (this.state.currentFrame - 1) ? 'active' : '')} key={i} style={{width: (Math.floor(100 / this.state.maxFrame) - 2) + '%'}}></li>
            ))
          }
        </ul>
        {this.state.menu && <Menu />}
        {this.state.currentOverlay.type === 'narrator' ?
          <Bubble
            text={window.rnt.lang.get(this.state.currentOverlay.text)}
            position={'top'}
          /> : ''
        }

        {this.state.currentOverlay.infobox ?
          <Bookmark text={window.rnt.lang.get(this.state.currentOverlay.infobox)} /> : ''
        }

        {this.state.currentOverlay.type === 'dialogue' ?
          <Bubble
          title={window.rnt.lang.get(this.state.currentOverlay.dialogueName)}
          text={window.rnt.lang.get(this.state.currentOverlay.text)}
          position={'bottom'}
        /> : ''
        }

        {this.state.currentOverlay.type === 'outro' ?
          <>
            <div className={'outro title'}>{window.rnt.lang.get(this.state.currentOverlay.title)}</div>
            <div className={'outro text'}>{window.rnt.lang.get(this.state.currentOverlay.text)}</div>
          </> : ''
        }

        {this.state.headline ?
            <div className={'headline'}>{window.rnt.lang.get(this.state.headline)}</div> : ''
        }

        {this.state.currentOverlay.type === 'notification' ?
        <Push pushRef={this.pushRef} title={window.rnt.lang.get(this.state.currentOverlay.text)} /> : ''
        }


        {this.state.decision ?
          <>
            <div className={'slider'}>
              <div className={'inner'} style={{width: (this.state.decision.answers.length * 100) + 'vw', marginLeft: this.state.slideLeft + 'vw', '--animateLeft': this.state.animateLeft + 'vw'}}  ref={this.slider}>
                {
                  this.state.decision.answers.map((answer, i) => (
                    <div className={'item'} key={i}>
                      <Bubble
                        class={'answer'}
                        headline={window.rnt.lang.get(answer.headline)}
                        text={window.rnt.lang.get(answer.text)}
                        align={'center'}
                        position={''}
                      />
                    </div>
                  ))
                }
              </div>
            </div>
            <div className={'slider-navigation'}>
              {
                this.state.decision.answers.map((slide, i) => (
                  <div className={'item' + (this.state.currentSlide === i ? ' active' : '')} key={i} ></div>
                ))
              }
            </div>

            {this.state.showAnswer && <AnswerButton title={window.rnt.lang.get(this.state.decision.buttonText)} buttonType={this.state.decision.buttonType} buttonNumber={this.state.decision.buttonNumber} buttonTime={this.state.decision.buttonTime} timeout={this.state.decision.timeout} callback={this.onSubmitAnswer.bind(this)} />}
          </>
          : ''
        }

        {
          this.state.nextButton && <div className={'next'} onClick={(e) => {this.onShowNextOverlay(e);}}></div>
        }
      </div>
    )
  }

}

export default MainStory;