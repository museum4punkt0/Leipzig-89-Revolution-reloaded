# "Leipzig '89 - Revolution reloaded"


## Inhaltsverzeichnis
* [Kurzbeschreibung](#Kurzbeschreibung) 
* [Entstehungskontext & Förderhinweise](#Förderhinweis)
* [Installation](#Installation)
* [Benutzung](#Benutzung)
* [Credits](#Credits)
* [Lizenz](#Lizenz)


### Kurzbeschreibung ###

"Leipzig '89 - Revolution reloaded" ist eine prototypische Web-Application des Deutschen Historischen Museums zur spielerischen Vermittlung historischer Inhalte im Museumskontext. In Form einer interaktiven Graphic Novel können die Nutzer:innen aus der Perspektive historischer Akteure einen Tag von historischer Tragweite durchlaufen, den 9. Oktober 1989 in Leipzig. Hierbei müssen Entscheidungen getroffen werden, welche den Verlauf des Tages beeinflussen. "Leipzig '89 - Revolution reloaded" macht erfahrbar, dass Geschichte ein Prozess mit offenem Ausgang ist und vermittelt spielerisch einen multiperspektivischen Blick auf historische Ereignisse sowie die Tragweite historischer Entscheidungen. Die Inhalte der Anwendung basieren auf umfassenden wissenschaftlichen Recherchen. Die vorliegende Web-Application ist für den Einsatz in Kombination mit der Beamer-Application vorgesehen.


### Entstehungskontext & Förderhinweise ###

Diese Webanwendung wurde entwickelt im Rahmen des Verbundprojekts museum4punkt0 – Digitale Strategien für das Museum der Zukunft, Teilprojekt "Vergangene Zukunft" digital. Das Projekt museum4punkt0 wird gefördert durch die Beauftragte der Bundesregierung für Kultur und Medien aufgrund eines Beschlusses des Deutschen Bundestages. Weitere Informationen: www.museum4punkt0.de

![Logo: BKM](https://github.com/museum4punkt0/media_storage/blob/2c46af6cb625a2560f39b01ecb8c4c360733811c/BKM_Fz_2017_Web_de.gif)

![NeustartKultur](https://github.com/museum4punkt0/Object-by-Object/blob/22f4e86d4d213c87afdba45454bf62f4253cada1/04%20Logos/BKM_Neustart_Kultur_Wortmarke_pos_RGB_RZ_web.jpg)


### Installation ###
Installation für Web-Application und Beamer-Application: 
Klonen Sie zuerst das Repository auf Ihr lokales System. Wechseln Sie in das Repository und installieren Sie mit “yarn” benötigte Pakete. Bauen Sie anschließend das Projekt mit “npm run -s build:prod”. Im dist-Verzeichnis finden Sie nun das gebaute Projekt. Das gebaute Projekt laden Sie anschließend auf einen http-Server. 
Es wird keine spezielle Software benötigt, da es sich um eine Webanwendung handelt. 
Hinweis für die Beamer-Application: Ersetzen Sie die Socket-URL mit der URL zum Socket-Application. Ersetzen Sie das Beamer-Token mit dem entsprechenden “secret”. 

Installation für Socket-Application: 
Klonen Sie zuerst das Repository auf Ihr lokales System. Wechseln Sie in das Repository und installieren Sie mit “yarn” benötigte Pakete. Ersetzen Sie den Beamer-Token mit einem “secret”. Anschließend kopieren Sie das Projekt auf das Zielsystem, auf dem es ausgeführt werden soll, und starten Sie das Projekt mit “node app.js”.

Technische Installation im Raum: 
In einer räumlichen Installation läuft die Beamer-Anwendung auf einem lokalen Rechner (Dell OptiPlex 3080 MFF, Core i5-10500T, 8GB RAM, 256GB SSD (7RDCW) oder ähnlich). Dieser verbindet sich mit der Socket-Anwendung über einen WebSocket. Der lokale Rechner ist mit einem Beamer (Panasonic PT-VMZ60 oder ähnlich) über Kabel verbunden. Dieser gibt die Projektion der Beamer-Application aus. 


### Benutzung ###
Die Besucher*innnen betreten den Raum der Installation. Nach einer inhaltlichen Einleitung und Informationen zur Anwendung bzw. Nutzung werden die Besucher*innen zum Spielen aufgefordert. Hierfür gibt es zwei Möglichkeiten: 
1. Spielen auf den vor Ort installierten Tablets
2. Spielen auf dem eigenen Smartphone

Da die Interaktion primär für den Einsatz im Museum und an mobilen Endgeräten vorgesehen ist, wurde sie hierfür optimiert. Die Nutzung der Anwendung auf dem Desktop ist technisch möglich, für den Ausstellungsraum jedoch nicht relevant. Für den Prototyp wurde die Anwendung daher nicht mit einer entsprechend angepassten Version bedacht.

Bei der Nutzung eines der bereitgestellten Tablets starten die Besucher*innen das Spiel über den Button “Spiel starten” und folgen den Anweisungen auf dem Bildschirm.

Bei der Nutzung des Smartphones müssen die Besucher*innen zum Spielstart wie folgt vorgehen:

1. Verbindung zum WLAN herstellen
2. Scan des QR-Codes, oder
3. Aufruf der URL und danach Scan des QR-Codes zur Verifizierung der Anwesenheit im Museum

Schritt 1 entfällt, wenn der mobile Datenempfang stark genug ist. Von den Schritten 2 und 2 muss nur einer ausgeführt werden. Ziel ist, dass die Besuchenden das Spiel starten und die Verifizierung ihrer Anwesenheit im Museum (“eingeloggen”). Von Personen, die eingeloggt ist, wird innerhalb des Spiels ausgelesen, welche historischen Artefakte angeschaut und welche Personen zum Spielen ausgewählt werden. Diese Informationen werden auf der kreisrunden Projektion in der Mitte der Installation ausgegeben.

Nach dem Start des Spiels erfolgt die Personenauswahl. Aus insgesamt sieben Personen kann durch das Drehen eines Auswahlrades oder das Durchwischen (Swipen) von Personenporträts ein Charakter ausgewählt und bestätigt werden. Nach der Auswahl erhält man zunächst eine kurze Übersicht/Vorstellung der Person und des zu ihr gehörigen Objekts. Die Personauswahl kann durch einen Auswahl-Button bestätigt oder durch Rückkehr ins Menü eine andere Person gewählt werden.

Nach einigen einleitenden Screens zur Geschichte und zum Spiel selbst beginnt das Spiel, eine interaktive Graphic Novel, durch die man sich hindurch tappen kann. Tap auf die rechte Hälfte des Bildschirms führt zum nächsten Textblock oder der nächsten Zeichnung, tap auf die linke Hälfte führt zurück. 

Nach einer Story-Sequenz erreicht man die erste Entscheidung. Nach einer Entscheidung kann nicht mehr zurück navigiert werden. Auf mehreren Kärtchen, die links-rechts durch den Screen gewischt werden können, wird den Spieler*innen eine Frage gestellt und mehrere Entscheidungsmöglichkeiten angeboten. Über einen Button darunter wird die Entscheidung bestätigt.

Es gibt zwei verschiedene Arten von Buttons: Der “Longpress” Button muss eine längere Zeit gedrückt werden, um die Auswahl zu bestätigen. Der “Timeout” Button leert sich optisch langsam und gibt vor, wieviel Zeit man hat, um antworten.

Im Spiel selbst gibt es die Möglichkeit, ein Untermenü zu öffnen, wo der Ton ein- und ausgeschaltet, zwischen den Sprachen Deutsch und Englisch gewechselt und das Spiel abgebrochen werden kann. Außerdem gibt es drei weitere Buttons. Bei einem Tap auf die Uhr werden Informationen angezeigt, was zur gleichen Zeit andernorts in Leipzig passierte. Ein Tap auf die Karte gibt Aufschluss darüber, wo sich die ausgewählte Person gerade befindet. Ein Tap auf das Icon der Person zeigt die Übersichtsseite mit Informationen zur Person sowie zu ihrem Objekt an.

Das Spiel ist in vier bis fünf Kapitel aufgeteilt. Zwischen den Kapiteln erhalten die Spieler*innen die Möglichkeit, die Person zu wechseln. Für den Fall, dass sie mit ihrer Person im Spiel gescheitert sind, also nicht weiterspielen können, müssen sie zwischen den Kapiteln die Person wechseln. Danach schreitet das Spiel wie oben beschrieben fort.

Am Ende erfolgt eine Auswertung des Spiels und mögliche Spielerfolge oder -niederlagen werden beschrieben.

Nach der Auswertung wird angeboten erneut zu spielen, wofür zwei Personen, mit denen noch nicht gespielt wurde, nach Zufallsprinzip angezeigt werden. Es besteht auch die Möglichkeit das Spiel zu beenden, woraufhin ein Feedback der Spieler*innen erfragt wird.

Die Webanwendung wird in einem Browser geöffnet und genutzt. Es handelt sich um eine Webanwendung, die keine besonderen Ansprüche an Browser oder Hardware stellt. Demnach kann die Anwendung in allen aktuellen Browsern geöffnet und ausgeführt werden. 


### Credits ###
Auftraggeber/Rechteinhaber: Stiftung Deutsches Historisches Museum (www.dhm.de)

Urheber: Playing History UG (www.playinghistory.de)

### Lizenz ###
Copyright © 2022, Stiftung Deutsches Historisches Museum 

[MIT-Lizenz](https://github.com/museum4punkt0/Leipzig-89-Revolution-reloaded/blob/main/Game%20Application/LICENSE)

Jedem, der eine Kopie dieser Software und der zugehörigen Dokumentationsdateien (die „Software“) erhält, wird hiermit kostenlos die Erlaubnis erteilt, ohne Einschränkung mit der Software zu handeln, einschließlich und ohne Einschränkung der Rechte zur Nutzung, zum Kopieren, Ändern, Zusammenführen, Veröffentlichen, Verteilen, Unterlizenzieren und/oder Verkaufen von Kopien der Software, und Personen, denen die Software zur Verfügung gestellt wird, dies unter den folgenden Bedingungen zu gestatten:
Der obige Urheberrechtshinweis und dieser Genehmigungshinweis müssen in allen Kopien oder wesentlichen Teilen der Software enthalten sein.
DIE SOFTWARE WIRD OHNE MÄNGELGEWÄHR UND OHNE JEGLICHE AUSDRÜCKLICHE ODER STILLSCHWEIGENDE GEWÄHRLEISTUNG, EINSCHLIEẞLICH, ABER NICHT BESCHRÄNKT AUF DIE GEWÄHRLEISTUNG DER MARKTGÄNGIGKEIT, DER EIGNUNG FÜR EINEN BESTIMMTEN ZWECK UND DER NICHTVERLETZUNG VON RECHTEN DRITTER, ZUR VERFÜGUNG GESTELLT. DIE AUTOREN ODER URHEBERRECHTSINHABER SIND IN KEINEM FALL HAFTBAR FÜR ANSPRÜCHE, SCHÄDEN ODER ANDERE VERPFLICHTUNGEN, OB IN EINER VERTRAGS- ODER HAFTUNGSKLAGE, EINER UNERLAUBTEN HANDLUNG ODER ANDERWEITIG, DIE SICH AUS, AUS ODER IN VERBINDUNG MIT DER SOFTWARE ODER DER NUTZUNG ODER ANDEREN GESCHÄFTEN MIT DER SOFTWARE ERGEBEN.

