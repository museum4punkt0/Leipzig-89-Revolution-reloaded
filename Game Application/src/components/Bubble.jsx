import React, {Component} from 'react';

/**
 * Bubble component
 */
class Bubble extends Component {
  /**
   * constructor
   * @param props
   */
  constructor(props) {
    super(props);
  }

  /**
   * render component
   * @returns {JSX.Element}
   */
  render() {
    return (
      <div className={'bubble ' + this.props.position + (this.props.align === 'center' ? 'center ' : '') + (this.props.class? this.props.class : '')}>
        {this.props.title && <div className={'title'}>{this.props.title}</div>}
        {this.props.headline ? <><b>{this.props.headline}</b><br/><br/></> : ''}
        {this.props.text}
      </div>
    )
  }

}

export default Bubble;
