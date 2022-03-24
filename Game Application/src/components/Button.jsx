import React, {Component} from 'react';

/**
 * Button Component
 */
class Button extends Component {
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
   * render component
   * @returns {JSX.Element}
   */
  render() {
    return (
      <button className={'default-button' + (this.props.invert ? ' invert' : '')} onClick={this.props.onClick}>
        {this.props.title}
      </button>
    )
  }

}

export default Button;
