import React, {Component} from 'react';
import Menu from "./Menu";
import navigationMgr from "../navigationMgr";

/**
 * Story End component
 */
class StoryEnd extends Component {
  /**
   * constructor
   * @param data
   */
  constructor(data) {
    super();

    this.state = {
      classNames: ['story-end'],
      src: data.data.src,
      text: data.data.text,
      text1: data.data.text1
    };

    if (window.rnt.sound && data.data.sound) {
      this.audio = new Audio( window.rnt.imagePath + 'sounds/' + data.data.sound);
      this.audio.play();
    }

    window.rnt.socket.artefactShown(data.data.text);
  }

  /**
   * set reference
   * @param reference
   */
  setReference(reference) {
    this.reference = reference;
  }

  /**
   * on click
   * @param e
   */
  onClick(e) {
    e.preventDefault();
    e.stopPropagation();
    if (this.audio) {
      this.audio.pause();
      delete this.audio;
    }
    window.rnt.eventMgr.releaseEvent('StoryEndNext', null, null);
    navigationMgr.disposeComponent(this.reference, 500);
  }

  /**
   * render component
   * @returns {JSX.Element}
   */
  render() {
    return (
      <div className={this.state.classNames.join(' ')}>
        <Menu />
        <div className={'main-image'} style={{backgroundImage: `url('${window.rnt.imagePath}${this.state.src}')`}}></div>
        <div className={'text'}>
          {window.rnt.lang.get(this.state.text)}
        </div>
        <div className={'text1'}>
          {window.rnt.lang.get(this.state.text1)}
        </div>
        <div className={'next'} onClick={(e) => {this.onClick(e);}}></div>
      </div>
    )
  }

}

export default StoryEnd;