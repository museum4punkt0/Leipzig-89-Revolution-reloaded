import Component from '../components/bottomToolbar';
import DefaultController from './defaultController';

class BottomToolbar extends DefaultController {
  component = Component;
  name = 'bottomToolbar';
  constructor(data) {
    super();
    this.data = data;

    if (data && data.callback) {
      data.callback();
    }
  }

  afterRender() {
    this.widget.classList.add('bottom-toolbar');
    this.widget.classList.add('small');
  }
}

export default BottomToolbar;