import React, {Component} from 'react';

/**
 * Bookmark component
 */
class Bookmark extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: null
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
   * click event
   * @param e
   */
  onClickHandle(e) {
    e.preventDefault();
    e.stopPropagation();
    this.setNewState('open', !this.state.open);
  }

  /**
   * render method
   * @returns {JSX.Element}
   */
  render() {
    return (
      <div className={'bookmark ' + (this.state.open === true ? 'open' : this.state.open === false ? 'close' : '')}>
        <div className={'handle'} onClick={(e) => {this.onClickHandle(e);}} />
        {this.props.title && <div className={'title'}>{this.props.title}</div>}
        {this.props.text}
      </div>
    )
  }

}

export default Bookmark;
