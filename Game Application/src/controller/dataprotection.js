import Component from '../components/dataprotection';
import DefaultController from './defaultController';

class Dataprotection extends DefaultController {
  component = Component;
  name = 'dataprotection';
  constructor(data) {
    super();
    this.data = data;

    if (data && data.callback) {
      data.callback();
    }
  }
}

export default Dataprotection;