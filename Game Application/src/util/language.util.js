import navigationMgr from "../navigationMgr";
const LANGUAGE_KEYS = require('../localization.json');

/**
 * manage languages
 */
class UtilLanguage {
  lang = {};

  constructor() {
    if ((navigator.language || navigator.userLanguage).toLowerCase().indexOf('de') === 0) {
      this.appLocale = 'de_DE';
    } else {
      this.appLocale = 'en_US';
    }
  }

  /**
   * get the localizes string for a key
   * @param key
   * @returns {*}
   */
  get(key) {
    if (window.rnt.debug && (!LANGUAGE_KEYS[this.appLocale] || !LANGUAGE_KEYS[this.appLocale][key])) {
      return key;
    }
    return LANGUAGE_KEYS[this.appLocale][key];
  }

  /**
   * get the localizes string for a key and replace a value
   * @param key
   * @param value
   * @returns {*}
   */
  getVal(key, value) {
    if (window.rnt.debug && (!LANGUAGE_KEYS[this.appLocale] || !LANGUAGE_KEYS[this.appLocale][key])) {
      return key;
    }
    return LANGUAGE_KEYS[this.appLocale][key].replace('{1}', value);
  }

  /**
   * change language
   * @param newLang
   */
  changeTo(newLang) {
    if (this.appLocale !== newLang) {
      this.appLocale = newLang;
      navigationMgr.reRenderAll();
    }
  }

}

// singleton design pattern -> return instance or register a new global instance
window.rnt.lang = window.rnt.lang || new UtilLanguage();
export default window.rnt.lang;