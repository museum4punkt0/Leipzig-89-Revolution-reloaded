import React, {Component} from 'react';

/**
 * Answer button class
 */
class AnswerButton extends Component {
  /**
   * constructor
   * @param props
   */
  constructor(props) {
    super(props);
    this.state = {
      answerProgress: this.props.buttonType === 'timeout' ? 100 : 0,
      clicks: 0
    }
    this.button = React.createRef();


    window.setTimeout(() => {
      if (this.isTouchDevice()) {
        this.button.current.addEventListener('touchstart', this.onTouchStart.bind(this));
        this.button.current.addEventListener('touchend', this.onTouchEnd.bind(this));
      } else {
        this.button.current.addEventListener('mousedown', this.onTouchStart.bind(this));
        this.button.current.addEventListener('mouseup', this.onTouchEnd.bind(this));
      }
    }, 100);

    if (this.props.buttonType === 'timeout') {
      this.totalTimeout = window.setTimeout(() => {
        window.clearInterval(this.activeInterval);
        this.setState({
          answerProgress: 0
        });
        // time is running out -> callback
        if (this.props.callback) {
          this.props.callback(true);
        }
      }, this.props.timeout);
      this.activeInterval = window.setInterval(() => {
        this.setState({
          answerProgress: Math.max(0, this.state.answerProgress - 0.5)
        });
      }, this.props.timeout / 200);

    }
  }

  /**
   * button click event
   * @param e
   */
  onClickButton(e) {
    e.stopPropagation();
    if (this.props.buttonType !== 'click') {
      return;
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
   * touch start event
   * @param e
   */
  onTouchStart(e) {
    e.stopPropagation();
    this.performLongpress(true);
  }

  /**
   * touch end event
   * @param e
   */
  onTouchEnd(e) {
    e.stopPropagation();
    this.performLongpress(false);

    if (this.props.buttonType === 'timeout' && this.state.answerProgress > 0) {
      window.clearInterval(this.activeInterval);
      window.clearTimeout(this.totalTimeout);
      if (this.props.callback) {
        this.props.callback();
      }
    }

    if (this.props.buttonType === 'click') {
      this.setState({
        answerProgress: this.state.answerProgress + (100 / this.props.buttonNumber),
        clicks: this.state.clicks + 1
      });

      if (this.state.clicks === this.props.buttonNumber) {
        if (this.props.callback) {
          this.props.callback();
        }
      }
    }
  }

  /**
   * perform longpress
   * @param positive
   * @returns {*}
   */
  performLongpress(positive) {
    if (this.props.buttonType !== 'longpress') {
      return;
    }

    if (this.longPressFinished) {
      if (this.props.callback) {
        return this.props.callback();
      }
    }

    if (this.longpress) {
      window.clearInterval(this.longpress);
      this.longpress = null;
    }

    if ((!positive && this.state.answerProgress === 0)) {
      return;
    }

    this.longpress = window.setInterval(() => {
      const progress = (positive ? this.state.answerProgress + 1 : this.state.answerProgress - 1);
      this.setNewState('answerProgress', progress);

      if (positive && progress === 100 || !positive && progress === 0) {
        window.clearInterval(this.longpress);
        this.longpress = null;
      }

      if (positive && progress === 100) {
        this.longPressFinished = true;
      }
    }, this.props.buttonTime / 100);
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
   * render method
   * @returns {JSX.Element}
   */
  render() {
    return (
      <button className={'answer-button' + (this.props.invert ? ' invert' : '')} ref={this.button} onClick={(e) => {this.onClickButton(e);}}>
        <div className={'progress'} style={{'--answerProgress': this.state.answerProgress + '%'}} />
        <div className={'text'}>
          {this.props.title}
        </div>
      </button>
    )
  }

}

export default AnswerButton;
