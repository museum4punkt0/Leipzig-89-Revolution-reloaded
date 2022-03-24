import React, {Component} from 'react';

/**
 * Push component
 */
class Push extends Component {
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
      <div ref={this.props.pushRef} className={'push-notification show'}>
        {this.props.title}
      </div>
    )
  }

}

export default Push;
