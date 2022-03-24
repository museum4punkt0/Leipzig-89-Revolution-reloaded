import React, {Component} from 'react';
import navigationMgr from "../navigationMgr";
import Back from "./Back";

/**
 * Info component
 */
class Infos extends Component {
  /**
   * constructor
   */
  constructor() {
    super();

    this.state = {
      classNames: ['infos']
    };

  }

  /**
   * set reference
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
          <b>Rechtenachweise und weitere Infos</b><br/><br/>

          Bildmaterial mit freundlicher Genehmigung:
          Bundesarchiv<br/>
          dpa Picture-Alliance GmbH<br/>
          Presse- und Informationsamt der Bundesregierung<br/>
          Robert-Havemann-Gesellschaft<br/>
          Stadtgeschichtliches Museum Leipzig<br/><br/>

          <b>Intro:</b><br/>
          Bild 1: Rainer Mittelstädt / BArch Bild 183-1989-1007-024<br/>
          Bild 2: Hans Martin Sewcz / BArch: Bild<br/>
          Bild 3: Rainer Mittelstädt / BArch: Bild 183-1990-0124-321<br/>
          Bild4: Martin Naumann / Stadtgeschichtliches Museum Leipzig, Inventarnummer: F/9894/1990<br/><br/>

            <b>Kurt M.:</b><br/>
          Kapitel 1, Foto: Friedrich Gahlbeck / BArch: 183-1986-0926-008<br/>
          Kapitel 2, Foto: Martin Naumann / Stadtgeschichtliches Museum Leipzig, Inventarnummer: F/9888/1990<br/>
          Kapitel 3, Foto: Waltraud Grubitzsch / picture alliance<br/>
          Kapitel 4, Foto: k.A. / BArch: Bild 183-1982-0313-106<br/><br/>

              <b>Thomas:</b><br/>
          Kapitel 1, Foto: Martin Naumann / Stadtgeschichtliches Museum Leipzig, Inventarnummer: F 9945<br/>
          Kapitel 2, Foto: Martin Naumann / Stadtgeschichtliches Museum Leipzig, Inventarnummer: F/9886/1990<br/>
          Kapitel 3, Foto: Martin Naumann / Stadtgeschichtliches Museum Leipzig, Inventarnummer: F/9884/1990<br/>
          Kapitel 4/a, Foto: Martin Naumann / Stadtgeschichtliches Museum Leipzig, Inventarnummer: F 9757<br/>
          Kapitel 4/b, Foto: Martin Naumann / Stadtgeschichtliches Museum Leipzig, Inventarnummer: F 9756<br/><br/>

                <b>Sabine:</b><br/>
          Kapitel 1, Foto: Waltraud Grubitzsch / BArch Bild 183-1989-0313-302<br/>
          Kapitel 2, Foto: Harald Kirschner / BArch: B 145 Bild-00014228<br/>
          Kapitel 3, Foto: Martin Naumann / Stadtgeschichtliches Museum Leipzig, Inventarnummer: F/9883/1990<br/>
          Kapitel 4, Foto: Martin Naumann / Stadtgeschichtliches Museum Leipzig, Inventarnummer: F 9950<br/>
          Kapitel 5/a, Foto: Aram Radomski / Robert-Havemann-Gesellschaft: Foto-Nr. 21007<br/>
          Kapitel 5/b, Foto: Martin Naumann / Stadtgeschichtliches Museum Leipzig, Inventarnummer: F 9756<br/><br/>

                  <b>Hannes:</b><br/>
          Kapitel 1, Foto: Siegbert Schefke/ Robert-Havemann-Gesellschaft: Foto-Nr. 18980<br/>
          Kapitel 2, Foto: Martin Naumann / Stadtgeschichtliches Museum Leipzig, Inventarnummer: F 9769<br/>
          Kapitel 3/a, Foto: Martin Naumann / Stadtgeschichtliches Museum Leipzig, Inventarnummer: F/9922/1990<br/>
          Kapitel 3/b, Foto: Robert Roeske / BArch: Bild 183-1990-0924-010<br/>
          Kapitel 4, Foto: Aram Radomski/ Robert-Havemann-Gesellschaft: Foto-Nr. 21002<br/><br/>

                    <b>Almut:</b><br/>
          Kapitel 1, Foto: Martin Naumann / Stadtgeschichtliches Museum Leipzig, Inventarnummer: F/9885/1990<br/>
          Kapitel 2, Foto: Friedrich Gahlbeck / BArch: Bild 183-1990-0922-002<br/>
          Kapitel 3, Foto: Martin Naumann / Stadtgeschichtliches Museum Leipzig, Inventarnummer: F/ 9770/1990<br/>
          Kapitel 4, Foto: Friedrich Gahlbeck / BArch: Bild 183-1989-1023-022<br/><br/>

                      <b>Frauke:</b><br/>
          Kapitel 1, Foto:  Rainer Mittelstädt / BArch: Bild 183-1989-1006-016<br/>
          Kapitel 2, Foto: Martin Naumann / Stadtgeschichtliches Museum Leipzig, Inventarnummer: F/9898/1990<br/>
          Kapitel 3, Foto: Evelyn Richter / BArch B 145 Bild-00014227<br/>
          Kapitel 4, Foto: Martin Naumann / Stadtgeschichtliches Museum Leipzig, Inventarnummer: F/2021/45<br/><br/>

                        <b>Egon K.</b><br/>
          Kapitel 1, Foto: Klaus Franke / BArch: Bild 183-1989-1007-004<br/>
          Kapitel 2, Foto: Liebe / BArch: B 145 Bild-00007114<br/><br/>

                          <b>Audiomaterial mit freundlicher Genehmigung:</b><br/>
          Aufruf der „Sechs von Leipzig“: Ausschnitt, Leipzig, 9. Oktober 1989 © Stadtarchiv Leipzig<br/>
          Christa Wolf im Gespräch mit Gerhard Rein über die aktuelle Situation in der DDR, Erstausstrahlung 9. Oktober 1989, NDR 4 © Studio Hamburg<br/>
          Demo-Rufe: Ausschnitt, Filmaufnahme, Leipzig, 9. Oktober 1989 © Siegbert Schefke, Aram Radomski und Robert-Havemann-Gesellschaft<br/>
          Konzertaufnahme: „Till Eulenspiegels lustige Streiche op. 28“ von Richard Strauss, gespielt vom Gewandhausorchester, Dirigent: Kurt Masur, Leipzig, 9. Oktober 1989 © Gewandhaus zu Leipzig<br/>
          Mitschnitt einer SED-Versammlung im Leipziger Rathaus, 9.Okotber 1989 © Archiv Bürgerbewegung Leipzig<br/>
          Orgel: Aufnahme Nikolaikirche Leipzig, 1. Oktober 2021 © Niels Hölmer, DHM<br/>
          Polizeifunk: Ausschnitt, Leipzig, Herbst 1989 © BArch, MfS, BV Lpz., TB, Nr. 231<br/>
          Tagesschau vom 9. Oktober 1989, mehrere Ausschnitte, ARD © Studio Hamburg<br/>
          Tagesschau vom 10. Oktober 1989, Ausschnitt, ARD © Studio Hamburg<br/>
          Tagesthemen vom 9. Oktober 1989, mehrere Ausschnitte, ARD © Studio Hamburg<br/>
          Tagesthemen vom 10. Oktober 1989, mehrere Ausschnitte, ARD © Studio Hamburg<br/>
          Telefonischer Rapport der Volkspolizei-Kreisämter (VPKA) an die Bezirksbehörde der Deutschen Volkspolizei (BDVP) Leipzig, 9. Oktober 1989 © Sächsisches Staatsarchiv, Staatsarchiv Leipzig, BDVP Leipzig, AV 20250-078 (CD 16/2019)



        </div>
      </div>
    )
  }

}

export default Infos;