import React, {Component} from 'react';
import navigationMgr from "../navigationMgr";
import Menu from "./Menu";
import Button from "./Button";

/**
 * Map component
 */
class Map extends Component {
  /**
   * constructor
   * @param data
   */
  constructor(data) {
    super();

    this.state = {
      classNames: ['map-overview scroller'],
      selected: data.data.character,
      buildingOverlay: null,
      selectedObj: data.data.options.filter((obj) => {return obj.character === data.data.character}).pop(),
      ... data.data
    };
    window.rnt.socket.selectCharacter(data.data.character);
  }

  /**
   * set reference
   * @param reference
   */
  setReference(reference) {
    this.reference = reference;
  }

  /**
   * click map
   * @param e
   */
  onClickMap(e) {
    e.preventDefault();
    e.stopPropagation();
    if (this.state.isPage) {
      return;
    }
    //navigationMgr.disposeComponent(this.reference);
  }

  /**
   * change character
   * @param e
   * @param newCharacter
   */
  onChangeCharacter(e, newCharacter) {
    e.preventDefault();
    e.stopPropagation();
    if (newCharacter === this.state.selected) {
      return;
    }
    this.setNewState('selected', newCharacter);
    this.setNewState('selectedObj', this.state.options.filter((obj) => {return obj.character === newCharacter}).pop());
    window.rnt.socket.selectCharacter(this.state.selectedObj.character);
  }

  /**
   * close character bubble
   * @param e
   */
  onCloseCharacterBubble(e) {
    e.preventDefault();
    e.stopPropagation();
    this.setNewState('selected', this.state.character);
    this.setNewState('selectedObj', this.state.options.filter((obj) => {return obj.character === this.state.character}).pop());
    window.rnt.socket.selectCharacter(this.state.character);
  }

  /**
   * open building detail
   * @param e
   * @param building
   * @param text
   */
  onOpenBuildingDetail(e, building, text) {
    e.preventDefault();
    e.stopPropagation();
    this.setNewState('buildingOverlay', {
      title: building,
      text: text
    });
  }

  /**
   * close building detail
   * @param e
   */
  onCloseBuildingDetail(e) {
    e.preventDefault();
    e.stopPropagation();
    this.setNewState('buildingOverlay', null);
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
   * select character
   * @param e
   */
  onSelectCharacter(e) {
    e.preventDefault();
    e.stopPropagation();
    window.rnt.socket.startGame(this.state.selectedObj.character);
    window.rnt.eventMgr.releaseEvent('characterSelectedOnMap', this.state.character, this.state.selectedObj.key);
    navigationMgr.disposeComponent(this.reference, 500);
  }

  /**
   * render component
   * @returns {JSX.Element}
   */
  render() {
    return (
      <div className={this.state.classNames.join(' ')} onClick={(e) => {this.onClickMap(e);}}>
        <div className={'inner'}>
          {this.state.isPage ? <Menu /> : ''}
          <div className={'text'}>{window.rnt.lang.get(this.state.headline)}</div>
          <div className={'building-sz'} onClick={(e) => {this.onOpenBuildingDetail(e, window.rnt.lang.get('X0128'), window.rnt.lang.get('X0129'));}}>{window.rnt.lang.get('X0128')}</div>
          <div className={'building-hbf'} onClick={(e) => {this.onOpenBuildingDetail(e, window.rnt.lang.get('X0130'), window.rnt.lang.get('X0131'));}}>{window.rnt.lang.get('X0130')}</div>
          <div className={'building-nlk'} onClick={(e) => {this.onOpenBuildingDetail(e, window.rnt.lang.get('X0124'), window.rnt.lang.get('X0125'));}}>{window.rnt.lang.get('X0124')}</div>
          <div className={'building-gwh'} onClick={(e) => {this.onOpenBuildingDetail(e, window.rnt.lang.get('X0126'), window.rnt.lang.get('X0127'));}}>{window.rnt.lang.get('X0126')}</div>
          {
            this.state.options.map((option, i) => (
              <div className={'character-' + option.imageType + (this.state.character === option.character ? ' selected' : '') + (option.arrow ? ' arrow-' + option.arrow : '' )} key={i} style={{backgroundImage: `url('${window.rnt.imagePath}${option.src}')`, left: option.x + 'vw', top: option.y + 'vw'}} onClick={(e) => {this.onChangeCharacter(e, option.character);}} />
            ))
          }
          {this.state.selected === this.state.character && this.state.selectedObj && this.state.selectedObj.buttonText ?
            <Button title={window.rnt.lang.get(this.state.selectedObj.buttonText)} onClick={this.onSelectCharacter.bind(this)} /> : ''
          }
          {this.state.buildingOverlay ?
          <div className={'building-detail'} onClick={(e) => {this.onCloseBuildingDetail(e);}}>
            <div className={'map-bubble'}>
              <div className={'title'}>{this.state.buildingOverlay.title}</div>
              <div className={'close'} />
              {this.state.buildingOverlay.text}
            </div>
          </div> : '' }
          {this.state.selected !== this.state.character ?
            <div className={'building-detail'}>
              <div className={'map-bubble next-chapter'}>
                <div className={'character-large selected'}>
                  <div className={'character'} style={{backgroundImage: `url('${window.rnt.imagePath}${this.state.selectedObj.src}')`}} />
                </div>
                <div className={'close'} onClick={(e) => {this.onCloseCharacterBubble(e);}} />
                {this.state.selectedObj ? window.rnt.lang.get(this.state.selectedObj.popupText) : ''}
                {this.state.selectedObj && this.state.selectedObj.buttonText ? <Button title={window.rnt.lang.get(this.state.selectedObj.buttonText)} onClick={this.onSelectCharacter.bind(this)} /> : '' }
              </div>
            </div> : ''
          }
        </div>
      </div>
    )
  }

}

export default Map;