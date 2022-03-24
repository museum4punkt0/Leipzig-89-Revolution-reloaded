import Component from '../components/start';
import DefaultController from './defaultController';

class Start extends DefaultController {
  component = Component;
  name = 'start';
  constructor(data) {
    super();
    this.data = data;

    if (data && data.callback) {
      data.callback();
    }
  }
}

export default Start;