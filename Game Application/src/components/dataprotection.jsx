import React, {Component} from 'react';
import navigationMgr from "../navigationMgr";
import Back from "./Back";

/**
 * Dataprotection component
 */
class Dataprotection extends Component {
  /**
   * constructor
   */
  constructor() {
    super();

    this.state = {
      classNames: ['dataprotection']
    };

  }

  /**
   * store reference
   * @param reference
   */
  setReference(reference) {
    this.reference = reference;
  }

  /**
   * click back
   */
  onClickBack() {
    navigationMgr.disposeComponent(this.reference);
  }

  /**
   * render component
   * @returns {JSX.Element}
   */
  render() {
    return (
      <div className={this.state.classNames.join(' ')}>
        <Back callback={this.onClickBack.bind(this)} />
        <div className={'content'}>
          <b>Datenschutzerklärung</b><br/><br/>

          <b>“Leipzig ’89” ist ein Spiel des Deutschen Historischen Museum.</b><br/><br/>

          Deutsches Historisches Museum<br/>
          Unter den Linden 2<br/>
          10117 Berlin<br/><br/>

          {
            window.rnt.tabletMode ? <div className={'logo'}>
              <img src={'./img/logo-dhm.png'} width={'100%'} />
            </div> :
              <a href={'https://www.dhm.de'} target={'_blank'} className={'logo'}>
                <img src={'./img/logo-dhm.png'} width={'100%'} />
              </a>
          }
          <br/><br/>

          <b>Umgesetzt von</b><br/>
          Playing History<br/>
          {
            window.rnt.tabletMode ? <>www.playinghistory.de</> :  <a href={'https://www.playinghistory.de'} target={'_blank'}>www.playinghistory.de</a>
          }
          <br/><br/>
          {
            window.rnt.tabletMode ? <div className={'logo'}>
                <img src={'./img/logo-ph.png'} style={{height: '40vw'}} />
              </div> :
              <a href={'https://www.playinghistory.de'} target={'_blank'} className={'logo'}>
                <img src={'./img/logo-ph.png'} style={{height: '40vw'}} />
              </a>
          }
          <br/><br/>

          <b>Zweck der Datenverarbeitung:</b><br/><br/>

          Die Anwendung “Leipzig ’89” ist ein Spiel mit verschiedenen Spielebenen. Die Daten werden erfasst, um den Spielfortschritt festzuhalten.<br/><br/>

            <b>Welche Daten werden erhoben:</b><br/><br/>

          Im Spiel wird der Fortschritt der Spieler*innen anonymisiert getrackt. Dazu kommen keine externen Tracker zum Einsatz. Die Möglichkeit einzelne Spieler*innenergebnisse zurückzuverfolgen und einer Person zuzuordnen besteht nicht.<br/><br/>

              <b>Wofür nutzen wir Ihre Daten?</b><br/><br/>

          Die Daten werden ausschließlich genutzt um den Spielfortschritt festzustellen.<br/><br/>

                <b>Werden die Daten an Dritte übertragen, wenn ja zu welchem Zweck?</b><br/><br/>

          Es kommen keine externen APIs oder Trackingdienste zum Einsatz. Es werden keine Daten an Dritte übertragen; ausgenommen zum Hosting der Anwendung.<br/><br/>

                  <b>Welche Rechte haben Sie bezüglich Ihrer Daten?</b><br/><br/>

          Sie haben jederzeit das Recht unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die Berichtigung, Sperrung oder Löschung dieser Daten zu verlangen. Hierzu sowie zu weiteren Fragen zum Thema Datenschutz können Sie sich jederzeit unter der im Impressum angegebenen Adresse an uns wenden. Des Weiteren steht Ihnen ein Beschwerderecht bei der zuständigen Aufsichtsbehörde zu. Außerdem haben Sie das Recht, unter bestimmten Umständen die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen. Details hierzu entnehmen Sie der Datenschutzerklärung unter „Recht auf Einschränkung der Verarbeitung“.<br/><br/>

                    <b>Recht auf Einschränkung der Verarbeitung</b><br/><br/>

          Sie haben das Recht, die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen. Hierzu können Sie sich jederzeit unter der im Impressum angegebenen Adresse an uns wenden. Das Recht auf Einschränkung der Verarbeitung besteht in folgenden Fällen:<br/><br/>

          Wenn Sie die Richtigkeit Ihrer bei uns gespeicherten personenbezogenen Daten bestreiten, benötigen wir in der Regel Zeit, um dies zu überprüfen. Für die Dauer der Prüfung haben Sie das Recht, die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen.<br/>

          Wenn die Verarbeitung Ihrer personenbezogenen Daten unrechtmäßig geschah / geschieht, können Sie statt der Löschung die Einschränkung der Datenverarbeitung verlangen.<br/>

          Wenn wir Ihre personenbezogenen Daten nicht mehr benötigen, Sie sie jedoch zur Ausübung, Verteidigung oder Geltendmachung von Rechtsansprüchen benötigen, haben Sie das Recht, statt der Löschung die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen.<br/>

          Wenn Sie einen Widerspruch nach Art. 21 Abs. 1 DSGVO eingelegt haben, muss eine Abwägung zwischen Ihren und unseren Interessen vorgenommen werden. Solange noch nicht feststeht, wessen Interessen überwiegen, haben Sie das Recht, die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen.

        </div>
      </div>
    )
  }

}

export default Dataprotection;