import React, {Component} from 'react';

/**
 * Back component
 */
class Back extends Component {
  /**
   * constructor
   * @param props
   */
  constructor(props) {
    super(props);
    this.state = {
      submenuOpen: false
    }
  }

  /**
   * click event
   * @param e
   */
  onClick(e) {
    e.stopPropagation();
    e.preventDefault();
    if (this.props.callback) {
      this.props.callback();
    }
  }

  /**
   * render method
   * @returns {JSX.Element}
   */
  render() {
    return (
      <button className={'back-button'} title={'zurück'} onClick={(e) => {this.onClick(e);}} />
    )
  }

}

export default Back;
