# "Leipzig '89 - Revolution reloaded"


## Inhaltsverzeichnis
* [Kurzbeschreibung](#Kurzbeschreibung) 
* [Entstehungskontext & Förderhinweise](#Förderhinweis)
* [Installation](#Installation)
* [Benutzung](#Benutzung)
* [Credits](#Credits)
* [Lizenz](#Lizenz)


### Kurzbeschreibung ###

"Leipzig '89 - Revolution reloaded" ist eine prototypische Web-Application des Deutschen Historischen Museums zur spielerischen Vermittlung historischer Inhalte im Museumskontext. In Form einer interaktiven Graphic Novel können die Nutzer:innen aus der Perspektive historischer Akteure einen Tag von historischer Tragweite durchlaufen, den 9. Oktober 1989 in Leipzig. Hierbei müssen Entscheidungen getroffen werden, welche den Verlauf des Tages beenflussen. "Leipzig '89 - Revolution reloaded" macht erfahrbar, dass Geschichte eine Prozess mit offenem Ausgang ist und vermittelt spielerisch einen multiperspektischen Blick auf historische Ereignisse, sowie die Tragweite historischer Entscheidungen. Die Inhalte der Anwendung sind umfassend wissenschaftlich recherchiert worden. Die Web-Application ist aktuell für den Einsatz in Kombination mit der Beamer-Application vorgesehen.


### Entstehungskontext & Förderhinweise ###

Diese Webanwendung ist entstanden im Verbundprojekt museum4punkt0 – Digitale Strategien für das Museum der Zukunft, Teilprojekt "Vergangene Zukunft" digital. Das Projekt museum4punkt0 wird gefördert durch die Beauftragte der Bundesregierung für Kultur und Medien aufgrund eines Beschlusses des Deutschen Bundestages. Weitere Informationen: www.museum4punkt0.de

![Logo: BKM](https://github.com/museum4punkt0/media_storage/blob/2c46af6cb625a2560f39b01ecb8c4c360733811c/BKM_Fz_2017_Web_de.gif)

![NeustartKultur](https://github.com/museum4punkt0/Object-by-Object/blob/22f4e86d4d213c87afdba45454bf62f4253cada1/04%20Logos/BKM_Neustart_Kultur_Wortmarke_pos_RGB_RZ_web.jpg)


### Installation ###
Installation für Web-Application und Beamer-Application: 
Klonen Sie zuerst das Repository auf Ihr lokales System. Wechseln Sie in das Repository und installieren Sie mit “yarn” benötigte Pakete. Bauen Sie anschließend das Projekt mit “npm run -s build:prod”. Im dist-Verzeichnis finden Sie nun das gebaute Projekt. Das gebaute Projekt laden Sie anschließend auf einen http-Server. 
Es wird keine spezielle Software benötigt, da es sich um eine Webanwendung handelt. 
Hinweis für die Beamer-Application: Ersetzen Sie die Socket-URL mit der URL zum Socket-Application. Ersetzen Sie das Beamer-Token mit dem entsprechenden “secret”. 

Installation für Socket-Application: 
Klonen Sie zuerst das Repository auf Ihr lokales System. Wechseln Sie in das Repository und installieren Sie mit “yarn” benötigte Pakete. Ersetzen Sie den Beamer-Token mit einem “secret”. Anschließend kopieren Sie das Projekt auf das Zielsystem, auf dem es ausgeführt werden soll und starten Sie das Projekt mit “node app.js”.

Technische Installation im Raum: 
Im Raum läuft die Beamer-Anwendung auf einem lokalen Rechner (Dell OptiPlex 3080 MFF, Core i5-10500T, 8GB RAM, 256GB SSD (7RDCW) oder ähnlich). Dieser verbindet sich mit der Socket-Anwendung über einen Websocket. Der lokale Rechner ist mit einem Beamer (Panasonic PT-VMZ60 oder ähnlich) über Kabel verbunden. Dieser gibt die Projektion der Beamer-Application aus. 


### Benutzung ###
Die Besucher*innen betreten den Raum der Installation. Nach einigen einleitenden Worten und dem inhaltlichen Abholen werden sie zum Spielen aufgefordert. Hierfür haben Sie zwei Möglichkeiten: 
1. Spielen an bereitgestellten Tablets vor Ort
2. Spielen am eigenen Smartphone

Da die Interaktion primär für den Einsatz im Museum und an mobilen Geräten vorgesehen ist, wurde sie auch daraufhin optimiert. Die Benutzung am Desktop ist technisch möglich, spielt aber für den Ausstellungsraum keine Rolle und wurde daher für diesen Prototypen nicht mit einer entsprechend angepassten Version bedacht.

Bei der Benutzung mit dem Tablet treten die Besuchenden an eines der Geräte heran, starten das Spiel über den Button “Spiel starten” und folgen den Anweisungen auf dem Bildschirm.

Bei der Benutzung mit dem Smartphone, müssen sie Folgendes tun:

1. Verbindung zum WLAN herstellen
2. Scan des QR-Codes, oder
3. Aufruf der URL und danach Scan des QR-Codes zur Verifizierung der Anwesenheit im Museum

Schritt eins entfällt, wenn der mobile Datenempfang stark genug ist. Von den Schritten zwei und drei muss nur einer ausgeführt werden. Ziel ist es hierbei, dass die Besuchenden das Spiel starten und dass ihre Anwesenheit im Museum verifiziert wird (“eingeloggt”). Von Personen, die eingeloggt ist, wird innerhalb des Spiels ausgelesen, welche historischen Artefakte angeschaut und welche Personen zum Spielen ausgewählt werden. Diese Informationen werden auf der kreisrunden Projektion in der Mitte der Installation ausgegeben.

Nach dem Start des Spiels kommt die Personenauswahl. Aus insgesamt sieben Personen soll nun durch das Drehen eines Auswahlrades oder das durchwischen von Personenporträts ein Charakter ausgewählt und bestätigt werden. Nach der Bestätigung erhält man eine Übersicht zur Person und des zu ihr gehörigen Objekts. Die Personen kann durch zurückgehen ins Menü neu gewählt werden, oder die Auswahl bestätigt werden.

Nach einigen einleitenden Screens zur Geschichte und zum Spiel selbst, beginnt das Spiel, die interaktive Graphic Novel, durch die man sich hindurch tappen kann. Tap auf die rechte Hälfte des Bildschirms führt zum nächsten Textblock oder der nächsten Zeichnung, tap auf die linke Hälfte entsprechend zurück. 

Nach einem Storyteil erreicht man die erste Entscheidung. Hier kann nicht mehr zurück navigiert werden. Auf mehreren Kärtchen, die links-rechts duch den Screen gewischt werden können erhalten die Spieler*innen eine Frage und mehrere Entscheidungsmöglichkeiten. Über einen Button darunter wird diese Entscheidung bestätigt.

Es gibt zwei verschiedenen Arten von Buttons: Der “Longpress” Button muss eine längere Zeit gedrückt werden, um die Auswahl zu bestätigen. Der “Timeout” Button leert sich optisch langsam und gibt vor, wieviel Zeit man hat, um antworten.

Im Spiel selbst hat man die Möglichkeit ein Untermenü zu öffnen, wo der Ton ein- und ausgeschalten, die Sprache zwischen Deutsch und Englisch gewechselt und das Spiel abgebrochen werden kann. Außerdem gibt es drei weitere Buttons. Ein Tap auf die Uhr gibt Informationen darüber, was zur gleichen Zeit in andernorts Leipzig passierte. Ein Tap auf die Karte gibt Aufschluss darüber, wo sich die von mir gespielte Person gerade befindet. Ein Tap auf das Icon der Person zeigt die Übersichtsseite mit Informationen zur selben, sowie zu ihrem Objekt an.

Das Spiel ist in vier bis fünf Kapitel aufgeteilt. Zwischen den Kapiteln erhalten die Spieler*innen die Möglichkeit die Person zu wechseln. Sollten sie mit ihrer Person gar im Spiel gescheitert sein, also nicht weiterspielen können, müssen sie zwischen den Kapiteln die Person wechseln. Danach schreitet das Spiel, wie oben beschrieben fort.

Am Ende erfolgt eine Auswertung des Spiels und mögliche Spielerfolge oder -niederlagen werden beschrieben.

Nach der Auswertung wird angeboten erneut zu spielen, wofür zwei zufällige Personen, mit denen noch nicht gespielt wurde angezeigt werden. Es gibt aber auch die Möglichkeit das Spiel zu beenden, woraufhin Feedback der Spieler*innen erfragt wird.

Die Webanwendung wird im Browser geöffnet und kann darin genutzt werden. Es handelt sich um eine Webanwendung, die zur Wiedergabe keine besonderen Ansprüche an Browser oder Hardware stellt. Demnach kann die Anwendung in allen aktuellen Browsern geöffnet und ausgeführt werden. 


### Credits ###
Auftraggeber/Rechteinhaber: Stiftung Deutsches Historisches Museum (www.dhm.de)

Urheber: Playing History UG (www.playinghistory.de)

### Lizenz ###
Copyright © 2022, Stiftung Deutsches Historisches Museum 

[MIT-Lizenz](https://github.com/museum4punkt0/Leipzig-89-Revolution-reloaded/blob/main/Game%20Application/LICENSE)

Jedem, der eine Kopie dieser Software und der zugehörigen Dokumentationsdateien (die „Software“) erhält, wird hiermit kostenlos die Erlaubnis erteilt, ohne Einschränkung mit der Software zu handeln, einschließlich und ohne Einschränkung der Rechte zur Nutzung, zum Kopieren, Ändern, Zusammenführen, Veröffentlichen, Verteilen, Unterlizenzieren und/oder Verkaufen von Kopien der Software, und Personen, denen die Software zur Verfügung gestellt wird, dies unter den folgenden Bedingungen zu gestatten:
Der obige Urheberrechtshinweis und dieser Genehmigungshinweis müssen in allen Kopien oder wesentlichen Teilen der Software enthalten sein.
DIE SOFTWARE WIRD OHNE MÄNGELGEWÄHR UND OHNE JEGLICHE AUSDRÜCKLICHE ODER STILLSCHWEIGENDE GEWÄHRLEISTUNG, EINSCHLIEẞLICH, ABER NICHT BESCHRÄNKT AUF DIE GEWÄHRLEISTUNG DER MARKTGÄNGIGKEIT, DER EIGNUNG FÜR EINEN BESTIMMTEN ZWECK UND DER NICHTVERLETZUNG VON RECHTEN DRITTER, ZUR VERFÜGUNG GESTELLT. DIE AUTOREN ODER URHEBERRECHTSINHABER SIND IN KEINEM FALL HAFTBAR FÜR ANSPRÜCHE, SCHÄDEN ODER ANDERE VERPFLICHTUNGEN, OB IN EINER VERTRAGS- ODER HAFTUNGSKLAGE, EINER UNERLAUBTEN HANDLUNG ODER ANDERWEITIG, DIE SICH AUS, AUS ODER IN VERBINDUNG MIT DER SOFTWARE ODER DER NUTZUNG ODER ANDEREN GESCHÄFTEN MIT DER SOFTWARE ERGEBEN.

