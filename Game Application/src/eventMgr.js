/**
 * event manager class
 */
class EventMgr {
  events = [];
  lastEvent = null;

  /**
   * add a new event
   * @param data
   */
  addEvent(data) {
    this.events.push(data);
  }

  /**
   * remove all saved events
   */
  clearData() {
    this.events = [];
  }

  /**
   * release a new event
   * @param action
   * @param identifier
   * @param store
   */
  releaseEvent(action, identifier, store) {
    this.events.forEach((event) => {
      if (event.action === action) {
        // instance check
        if (!event.character || event.character && event.character === identifier || event.identifier && event.identifier === identifier) {
          // fast click check
          if (this.lastEvent && this.lastEvent.uid === event.uid && this.lastEvent.action === action && (this.lastEvent.time + 1000) > Date.now()) {
            return window.rnt.debug && console.log('Fast click detected - skip event: ' + action + ' card: ' + event.uid);
          }
          document.dispatchEvent(new CustomEvent(event.uid, {detail: store}));
          this.lastEvent = {
            uid: event.uid,
            action: action,
            time: Date.now()
          }
        }
      }
    });
  }

  /**
   * remove an event
   * @param uid
   */
  removeEvent(uid) {
    this.events = this.events.filter((event) => {
      return event.uid !== uid;
    });
  }

}

// singleton design pattern -> return instance or register a new global instance
window.rnt.eventMgr = window.rnt.eventMgr || new EventMgr();
export default window.rnt.eventMgr;