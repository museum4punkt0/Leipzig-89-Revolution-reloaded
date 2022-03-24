/**
 * Navigation manager class which do all the navigation stuff
 */
class NavigationMgr {
  rootNodeEl = document.getElementById('magic');
  pageObj = null;
  overlayStack = [];

  constructor() {}

  /**
   * load the component dynamically and show it as page or overlay
   * @param componentName
   * @param overlay
   * @param data
   * @param preventCloseOverlays
   * @returns {Promise<*>|Promise<void>}
   */
  showComponent(componentName, overlay, data, preventCloseOverlays = false) {
    // if new component is opened as page -> dispose all views
    if (!overlay) {
      //remove the old page
      if (this.pageObj) {
        this.pageObj.dispose();
      }
      if (this.overlayStack.length && !preventCloseOverlays) {
        //remember current overlay
        const lastOverlay = this.overlayStack.pop();
        //close all overlays below and remove from dom
        this.overlayStack.forEach((overlay) => {
          overlay.dispose();
        })
        this.overlayStack = [];
        //swipeOut top overlay
        this.disposeComponent(lastOverlay);
      }
    } else {
      // check if overlay is already open
      const overlay = this.overlayStack.filter((overlay) => {
        if (data && data.character) {
          return overlay.name === componentName && overlay.data.character === data.character;
        }
        return overlay.name === componentName;
      });

      if (overlay.length && data && !data.forceNewOverlay && overlay[0] !== this.overlayStack[this.overlayStack.length - 1]) {
        overlay[0].appendAsLastOverlay(data);
        return Promise.resolve();
      } else
        // case overlay is already open as last overlay
        if(overlay.length && overlay[0] === this.overlayStack[this.overlayStack.length - 1] && data && data.character) {
        return Promise.resolve();
      }
    }

    return import('./controller/' + componentName).then((moduleObj) => {
      const currentModule = new moduleObj.default(data);
      this.rootNodeEl.appendChild(currentModule.render(overlay));
      if (overlay) {
        this.overlayStack.push(currentModule);
      } else {
        //set the new page
        this.pageObj = currentModule;
      }
      return currentModule;
    })
  }

  /**
   * find component by name
   * @param componentName
   * @returns {T}
   */
  getComponent(componentName) {
    const components = this.overlayStack.filter((component) => {return component.name.toLowerCase() === componentName.toLowerCase()}) || [];

    // if the component is not found in an overlay -> check for page
    if (components.length === 0 && this.pageObj && this.pageObj.name.toLowerCase() === componentName.toLowerCase()) {
      components.push(this.pageObj);
    }

    return components.pop();
  }

  /**
   * navigate to a component
   * @param componentName
   * @param overlay
   * @param data
   * @param preventCloseOverlays
   * @returns {Promise<void>|Promise<*>}
   */
  navigateTo(componentName, overlay, data, preventCloseOverlays = false) {
    return this.showComponent(componentName, overlay, data, preventCloseOverlays);
  }

  /**
   * re-render all pages and overlays
   */
  reRenderAll() {
    if (this.pageObj) {
      this.pageObj.componentInterface.forceUpdate();
    }

    this.overlayStack.forEach((overlay) => {
      overlay.componentInterface.forceUpdate();
    })
  }

  /**
   * fade out an overlay and remove it from dom and stack
   * @param component
   * @param timeout
   */
  disposeComponent(component, timeout = 0) {
    component = component || this.overlayStack.slice(-1)[0];

    let el = component.widget;

    if (!el) {
      return;
    }

    if (!el.style.left) {
      el.style.left = '0%';
    }

    if (timeout) {
      window.setTimeout(() => {
        el.style.animation = 'swipeOut 0.3s ease-in forwards';
      }, timeout);
    } else {
      el.style.animation = 'swipeOut 0.3s ease-in forwards';
    }

    window.setTimeout(() => {
      el = null;
      component.dispose();
      this.overlayStack = this.overlayStack.filter((overlay) => {
        return overlay !== component;
      });

      if (this.pageObj === component) {
        this.pageObj = null;
      }

    },  500 + timeout);
  }
}

// singleton design pattern -> return instance or register a new global instance
window.navigationMgr = window.navigationMgr || new NavigationMgr();
export default window.navigationMgr;