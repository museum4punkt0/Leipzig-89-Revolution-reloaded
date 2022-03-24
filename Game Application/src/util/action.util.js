import navigationMgr from "../navigationMgr";
import ImagePreloader from "./image.preload.util";

/**
 * execute actions
 */
class Actions {

  /**
   * show the Qr Code View
   * @returns {Promise<void>}
   */
  showQRCodeView(data) {
    return navigationMgr.navigateTo('qrScan', true, data);
  }


  /**
   * show explanation
   * @param data
   * @returns {Promise<void>|Promise<*>|ImagePreloading}
   */
  showExplanation(data) {
    if (data.src) {
      return new ImagePreloader(window.rnt.imagePath + data.src, () => {
        return navigationMgr.navigateTo('intro', false, data);
      });
    }
    return navigationMgr.navigateTo('intro', false, data);
  }

  /**
   * update explatation
   * @param data
   * @returns {ImagePreloading}
   */
  updateExplanation(data) {
    const introComponent = navigationMgr.getComponent('intro');
    if (data.src) {
      return new ImagePreloader(window.rnt.imagePath + data.src, () => {
        return introComponent.componentInterface.update(data);
      });
    }
    introComponent.componentInterface.update(data);
  }

  /**
   * show character wheel
   * @param data
   * @returns {Promise<void>|Promise<*>}
   */
  showCharacterWheel(data) {
    return navigationMgr.navigateTo('selectCharacter', true, data);
  }

  /**
   * show character detail
   * @param data
   * @returns {Promise<void>|Promise<*>}
   */
  showCharacterDetail(data) {
    return navigationMgr.navigateTo('characterDetail', true, data);
  }

  /**
   * show navigation
   * @param data
   * @returns {Promise<void>|Promise<*>}
   */
  showNavigation(data) {
    const navigationComponent = navigationMgr.getComponent('bottomToolbar');
    if (!navigationComponent) {
      return navigationMgr.navigateTo('bottomToolbar', true, data);
    }
    navigationComponent.componentInterface.update(data);
  }

  /**
   * show main story
   * @param data
   * @returns {ImagePreloading}
   */
  showMainStory(data) {
    if (data.src) {
      return new ImagePreloader(window.rnt.imagePath + data.src, () => {
        return navigationMgr.navigateTo('mainStory', false, data, true);
      });
    }

    navigationMgr.navigateTo('mainStory', false, data, true);
  }

  /**
   * update main story
   * @param data
   * @returns {ImagePreloading}
   */
  updateMainStory(data) {
    const mainStoryComponent = navigationMgr.getComponent('mainStory');
    if (!mainStoryComponent) {
      return this.showMainStory(data);
    }
    if (data.src) {
      return new ImagePreloader(window.rnt.imagePath + data.src, () => {
        return mainStoryComponent.componentInterface.update(data);
      });
    }
    mainStoryComponent.componentInterface.update(data);
  }

  /**
   * open dazzle
   * @param data
   * @returns {Promise<void>|Promise<*>}
   */
  showDazzle(data) {
    return navigationMgr.navigateTo('dazzle', true, data);
  }

  /**
   * open chapter end view
   * @param data
   * @returns {Promise<void>|Promise<*>}
   */
  showChapterEnd(data) {
    return navigationMgr.navigateTo('storyEnd', false, data);
  }

  /**
   * open start view
   * @param data
   * @returns {Promise<void>|Promise<*>}
   */
  showStart(data) {
    return navigationMgr.navigateTo('start', false, data);
  }

  /**
   * change character
   * @param data
   * @returns {Promise<void>|Promise<*>}
   */
  changeCharacter(data) {
    data.isPage = true;
    return navigationMgr.navigateTo('map', false, data);
  }

  /**
   * play next character
   * @param data
   * @returns {Promise<T>}
   */
  nextCharacter(data) {
    const changeCharacterComponent = navigationMgr.getComponent('changeCharacter');
    if (!changeCharacterComponent) {
      return navigationMgr.navigateTo('changeCharacter', false, data).then((comp) => {
        data.callback();
      });
    }
    changeCharacterComponent.componentInterface.update(data);
  }

  /**
   * Store some statistics
   * @param data
   */
  storeStatistic(data) {
    const val = data.keyStore ? window.gameEngine.getKeyStoreValue(data.keyStore) : data.value;
  }

  /**
   * clear local storage
   * @param data
   */
  deleteStorage(data) {
    localStorage.clear();
    data.callback();
  }

  /**
   * reload the app
   */
  reload() {
    document.location.href = '';
  }

}

window.rnt.actions = window.rnt.actions || new Actions();