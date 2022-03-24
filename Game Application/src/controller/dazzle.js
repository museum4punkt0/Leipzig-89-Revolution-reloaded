import Component from '../components/dazzle';
import DefaultController from './defaultController';

class Dazzle extends DefaultController {
  component = Component;
  name = 'dazzle';
  constructor(data) {
    super();

    if (data && data.callback) {
      data.callback();
    }
  }

  afterRender() {
    this.widget.classList.add('fade-out');
  }
}

export default Dazzle;