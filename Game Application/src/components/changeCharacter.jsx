import React, {Component} from 'react';
import Button from "./Button";
import Menu from "./Menu";

/**
 * Change character component
 */
class ChangeCharacter extends Component {
  /**
   * constructor
   * @param data
   */
  constructor(data) {
    super();

    this.state = {
      classNames: ['character-change'],
      ... data.data,
      character: data.data.character || [],
      selection: null
    };
  }

  /**
   * update component
   * @param data
   */
  update(data) {
    const state = this.state;

    if (data.headline) {
      state.headline = data.headline;
    }

    (data.character || []).forEach((character) => {
      state.character.push(character);
    });
    this.setState(state);

    if (data && data.callback) {
      data.callback();
    }
  }

  /**
   * save reference
   * @param reference
   */
  setReference(reference) {
    this.reference = reference;
  }

  /**
   * on select character
   * @param e
   * @param character
   */
  onSelectCharacter(e, character) {
    e.stopPropagation();
    e.preventDefault();
    this.setState({
      selection: character
    });
  }

  /**
   * on click ok
   * @param e
   */
  onClickOk(e) {
    e.stopPropagation();
    e.preventDefault();
    if (!this.state.character[this.state.selection]) {
      return;
    }
    window.rnt.socket.startGame(this.state.character[this.state.selection].key);
    window.rnt.eventMgr.releaseEvent('onNextCharacter', null, this.state.character[this.state.selection].key);
  }

  /**
   * on click cancel
   * @param e
   */
  onClickCancel(e) {
    e.stopPropagation();
    e.preventDefault();
    const gameTime = Date.now() - window.rnt.gameStart;

    window.rnt.actions.storeStatistic({
      keyword: "gameTime",
      value: gameTime,
      type: "number"
    });

    window.rnt.eventMgr.releaseEvent('cancelNextCharacter', null, null);
  }

  /**
   * render component
   * @returns {JSX.Element}
   */
  render() {
    return (
      <div className={this.state.classNames.join(' ')}>
        <Menu />
        <h2>{window.rnt.lang.get(this.state.headline)}</h2>

        {this.state.character.length >= 2 && this.state.character.map((character, i) => (
          <div className={'figur-' + (i + 1) + (this.state.selection === i ? ' selected': '')} key={i} style={{backgroundImage: `url('${window.rnt.imagePath}${character.src}')`}} onClick={(e) => {this.onSelectCharacter(e, i);}}>
            <div className={'title'}>{window.rnt.lang.get(character.title)}</div>
          </div>
        ))}

        <div className={'button ok' + (this.state.selection !== null ? '' : ' inactive')} onClick={(e) => {this.onClickOk(e);}}>
          <Button title={window.rnt.lang.get('X0003')} />
        </div>
        <div className={'button cancel'} onClick={(e) => {this.onClickCancel(e);}}>
          <Button title={window.rnt.lang.get('X0169')} invert={true} />
        </div>
      </div>
    )
  }

}

export default ChangeCharacter;