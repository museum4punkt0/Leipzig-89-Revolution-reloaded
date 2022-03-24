const STORY = require('./story.json');

/**
 * game engine class
 */
class GameEngine {
  _uidMap = [];
  _gameData;
  _keyStore = {};
  _step = 0;

  /**
   * clear all instance data
   */
  clearData() {
    this._uidMap = [];
    this._gameData = null;
    this._keyStore = {};
    this._step = 0;
  }

  /**
   * start the game
   */
  start() {
    this._gameData = {
      cards: STORY
    };
    this._prepareGame();
  }

  /**
   * generate unique identifier map
   * @private
   */
  _generateUIDMap() {
    // create uid map from game data
    this._gameData.cards.forEach((card, i) => {
      this._uidMap[card.uid] = i;
    })
  }

  /**
   * prepare game
   * @private
   */
  _prepareGame() {
    this._generateUIDMap();

    // start game -> call all connected cards from the start card
    const startCard = this._getStartCard(this._gameData.cards);
    const startValues = JSON.parse(startCard.data.values);

    if (!startValues) {
      return;
    }

    // set global image path
    window.rnt.imagePath = startValues.image_folder;

    // start the game
    this._processCardConnections(startCard);
  }

  /**
   * return start card
   * @param cards
   * @returns {*}
   * @private
   */
  _getStartCard(cards) {
    let startCard;
    cards.forEach((card) => {
      if (card.data && card.data.storyAction === 'start') {
        startCard = card;
      }
    });
    return startCard;
  }

  /**
   * Process next card
   * @param uid
   * @private
   */
  _processStep(uid) {
    // increase counter
    this._step++;
    const card = this._getCardByUID(uid);
    window.rnt.debug && console.log(this._step, uid, card);
    this['_processCardType_' + card.type](card);
  }

  /**
   * process the content card
   * @param card
   * @private
   */
  _processCardType_content(card) {
    // parse data
    try {
      const data = JSON.parse(card.data.values);
      // process all connection in callback case
      data.callback = () => {
        this._processCardConnections(card);
      };

      window.rnt.actions[card.data.storyAction](data);
    } catch (e) {
      console.log(e);
      console.error('Failed action: ' + card.data.storyAction + ' cardId: ' + card.uid);
    }
  }

  /**
   * process the attribute card
   * @param card
   * @private
   */
  _processCardType_attribute(card) {
    switch(card.data.attributeOperation) {
      case 'set': this._keyStore[card.data.attributeKey] = isNaN(parseFloat(card.data.attributeValue)) ? card.data.attributeValue : parseFloat(card.data.attributeValue);break;
      case 'del': this._keyStore[card.data.attributeKey] = null;break;
      case 'add': this._keyStore[card.data.attributeKey] = (this._keyStore[card.data.attributeKey] || 0) + parseFloat(card.data.attributeValue);break;
      case 'sub': this._keyStore[card.data.attributeKey] = (this._keyStore[card.data.attributeKey] || 0) - parseFloat(card.data.attributeValue);break;
      case 'mul': this._keyStore[card.data.attributeKey] = (this._keyStore[card.data.attributeKey] || 0) * parseFloat(card.data.attributeValue);break;
      case 'div': this._keyStore[card.data.attributeKey] = (this._keyStore[card.data.attributeKey] || 0) / (parseFloat(card.data.attributeValue) || 1);break;
      case 'rand': {
        const numbers = card.data.attributeValue.split(',');
        this._keyStore[card.data.attributeKey] = Math.round((Math.random() * (parseFloat(numbers[1]) - parseFloat(numbers[0]))) + parseFloat(numbers[0]));
      };break;
    }
    // process next cards
    this._processCardConnections(card);
  }

  /**
   * process condition card
   * @param card
   * @private
   */
  _processCardType_condition(card) {
    let conditionParts = card.data.condition.split(/ /g);
    if (conditionParts.length !== 3) {
      return;
    }

    conditionParts = conditionParts.map((condition) => {
      return decodeURI(condition);
    });

    let operand = conditionParts[2];

    if (operand && operand[0] === '$') {
      operand = this._keyStore[operand.substring(1)];
    }

    switch (conditionParts[1]) {
      case '=':
        if (this._keyStore[conditionParts[0]] === operand || (!isNaN(parseFloat(operand)) && this._keyStore[conditionParts[0]] === parseFloat(operand))) {
          this._processCardConnections(card);
        }
        break;
      case '!=':
        if (typeof this._keyStore[conditionParts[0]] === 'number') {
          operand = parseFloat(operand);
        }

        if (this._keyStore[conditionParts[0]] !== operand) {
          this._processCardConnections(card);
        }
        break;
      case '>':
        if ((this._keyStore[conditionParts[0]] || 0) > parseFloat(operand)) {
          this._processCardConnections(card);
        }
        break;
      case '>=':
        if ((this._keyStore[conditionParts[0]] || 0) >= parseFloat(operand)) {
          this._processCardConnections(card);
        }
        break;
      case '<':
        if ((this._keyStore[conditionParts[0]] || 0) < parseFloat(operand)) {
          this._processCardConnections(card);
        }
        break;
      case '<=':
        if ((this._keyStore[conditionParts[0]] || 0) <= parseFloat(operand)) {
          this._processCardConnections(card);
        }
        break;
    }
  }

  /**
   * process timeout card
   * @param card
   * @private
   */
  _processCardType_timeout(card) {
    window.setTimeout(this._processCardConnections.bind(this, card), window.rnt.skipTimeouts ? 0 : this._getTimeout(card.data.delayUnit, card.data.delay))
  }

  /**
   * process event card
   * @param card
   * @private
   */
  _processCardType_addEvent(card) {
    const data = JSON.parse(card.data.eventData);
    // create event
    document.addEventListener(card.uid, this._handleEventCardEvent, false);

    window.rnt.eventMgr.addEvent({
      uid: card.uid,
      action: card.data.storyAction,
      character: data.character,
      store: data.store
    });
  }

  /**
   * handle card event
   * @param e
   * @private
   */
  _handleEventCardEvent(e) {
    const card = window.gameEngine._getCardByUID(e.type);
    window.rnt.debug && console.log('event fired!!: ' + card.uid);
    if (card.data.eventData) {
      const data = JSON.parse(card.data.eventData);
      if (data.store) {
        window.gameEngine._keyStore[data.store] = e.detail;
      }
    }
    // process next cards
    window.gameEngine._processCardConnections(card);
  }

  /**
   * remove event from dom
   * @param card
   * @private
   */
  _processCardType_removeEvent(card) {
    window.rnt.debug && console.log('remove event: ' + card.data.eventUID);
    document.removeEventListener(card.data.eventUID, this._handleEventCardEvent, false);
    window.rnt.eventMgr.removeEvent(card.data.eventUID);
    // process next cards
    this._processCardConnections(card);
  }

  /**
   * process the filter card
   * @param card
   * @private
   */
  _processCardType_filter(card) {
    const filtered = this._keyStore[card.uid] || 0;

    if (filtered < parseInt(card.data.filter)) {
      this._keyStore[card.uid] = (filtered + 1);
      // process next cards
      this._processCardConnections(card);
    }
  }

  /**
   * calculate timeouts
   * @param unit
   * @param delay
   * @returns {number|*}
   * @private
   */
  _getTimeout(unit, delay) {
    switch(unit) {
      case 'ms': return delay;
      case 's': return delay * 1000;
      case 'm': return delay * 60000;
      case 'h': return delay * 3600000;
    }
  }

  /**
   * call all connections
   * @param card
   * @private
   */
  _processCardConnections(card) {
    card.connections.forEach((connectionUID) => {
      this._processStep(connectionUID);
    });
  }


  /**
   * find card by unique identifier
   * @param uid
   * @returns {*}
   * @private
   */
  _getCardByUID(uid) {
    return this._gameData.cards[this._uidMap[uid]];
  }

  /**
   * get value from key store
   * @param val
   * @returns {*}
   */
  getKeyStoreValue(val) {
    return this._keyStore[val];
  }

  /**
   * set value to key store
   * @param name
   * @param value
   */
  setKeyStoreValue(name, value) {
    this._keyStore[name] = value;
  }

}

// singleton design pattern -> return instance or register a new global instance
window.gameEngine = window.gameEngine || new GameEngine();
export default window.gameEngine;