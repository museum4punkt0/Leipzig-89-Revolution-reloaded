import Component from '../components/imprint';
import DefaultController from './defaultController';

class Imprint extends DefaultController {
  component = Component;
  name = 'imprint';
  constructor(data) {
    super();
    this.data = data;

    if (data && data.callback) {
      data.callback();
    }
  }
}

export default Imprint;