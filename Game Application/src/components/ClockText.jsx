import React, {Component} from 'react';

/**
 * Clock text component
 */
class ClockText extends Component {
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
      <div className={'clock-text'}>
        {this.props.title}
      </div>
    )
  }

}

export default ClockText;
