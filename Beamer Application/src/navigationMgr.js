/**
 * Navigation manager class
 */
class NavigationMgr {
  currentRouteFragments = [];
  rootNodeEl = document.getElementById('magic');
  // store reference to main page
  pageObj = null;
  // store references to all overlays
  overlayStack = [];

  constructor() {}

  /**
   * initialize method parse the url / reference the root element
   * TODO apply navigation path
   */
  initialize() {
    this.currentRouteFragments = document.location.pathname.split('/');
    if (!this.currentRouteFragments[0]){
      // show first page
      return this.showComponent('index', false, {}, false);
    }
  }

  /**
   * load the component dynamically and show it as page or overlay
   * @param {string} componentName
   * @param {boolean} overlay
   */
  showComponent(componentName, overlay, data, preventCloseOverlays = false) {
    //remove the old page
    if (this.pageObj) {
      this.pageObj.dispose();
    }

    return import('./controller/' + componentName).then((moduleObj) => {
      const currentModule = new moduleObj.default(data);
      this.rootNodeEl.appendChild(currentModule.render(overlay));
      //set the new page
      this.pageObj = currentModule;
      return currentModule;
    })
  }
}
// singleton design pattern -> return navigation manager or register a new instance
window.navigationMgr = window.navigationMgr || new NavigationMgr();
export default window.navigationMgr;