import React, {Component} from 'react';

/**
 * Menu component
 */
class Menu extends Component {
  /**
   * constructor
   * @param props
   */
  constructor(props) {
    super(props);
    this.state = {
      currentLang: window.rnt.lang.appLocale
    }
    this.menu = React.createRef();
  }

  /**
   * set reference
   * @param reference
   */
  setReference(reference) {
    this.reference = reference;
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
   * open menu
   * @param e
   */
  onOpenMenu(e) {
    e.preventDefault();
    e.stopPropagation();
    this.menu.current.classList.remove('close');
    this.menu.current.classList.add('open');
  }

  /**
   * close menu
   * @param e
   */
  onCloseMenu(e) {
    e.preventDefault();
    e.stopPropagation();
    this.menu.current.classList.remove('open');
    this.menu.current.classList.add('close');
  }

  /**
   * switch language
   * @param e
   * @param newLanguage
   */
  onSwitchLang(e, newLanguage) {
    e.preventDefault();
    e.stopPropagation();
    window.rnt.lang.changeTo(newLanguage);
    this.setState({
      currentLang: newLanguage
    });
  }

  /**
   * open infos
   * @param e
   */
  onOpenInfos(e) {
    e.stopPropagation();
    e.preventDefault();
    navigationMgr.navigateTo('infos', true, {});
  }

  /**
   * open imprint
   * @param e
   */
  onOpenImprint(e) {
    e.stopPropagation();
    e.preventDefault();
    navigationMgr.navigateTo('imprint', true, {});
  }

  /**
   * render component
   * @returns {JSX.Element}
   */
  render() {
    return (
      <>
        <div className={'default-menu'} onClick={(e) => {this.onOpenMenu(e);}} />
        <div className={'main-menu'} ref={this.menu}>
          <div className={'close'} onClick={(e) => {this.onCloseMenu(e);}} />
          <div className={'lang de' + (this.state.currentLang === 'de_DE' ? ' selected' : '')} onClick={(e) => {this.onSwitchLang(e, 'de_DE');}}>DE</div>
          <div className={'lang en' + (this.state.currentLang === 'en_US' ? ' selected' : '')} onClick={(e) => {this.onSwitchLang(e, 'en_US');}}>EN</div>
          <div className={'menu-text'}>Das Game ist ein Prototyp, der vom Deutschen Historischen Museum im Rahmen des Verbundprojekts museum4punkt0 entwickelt wurde.
            <br/><br/>
            Teste mit uns das Spiel und hilf uns mit deinem Feedback die Anwendung weiterzuentwickeln.</div>
          <div className={'infos'} onClick={this.onOpenInfos}>Rechtsnachweise<br/>
            und weitere Infos</div>
          <div className={'imprint'} onClick={this.onOpenImprint}>Impressum</div>
        </div>
      </>
    )
  }

}

export default Menu;
