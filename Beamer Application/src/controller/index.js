import Component from '../components/index';
import DefaultController from './defaultController';

class Index extends DefaultController {
  component = Component;
  name = 'index';
  constructor(data) {
    super();
    this.data = data;

    if (data && data.callback) {
      data.callback();
    }
  }
}

export default Index;