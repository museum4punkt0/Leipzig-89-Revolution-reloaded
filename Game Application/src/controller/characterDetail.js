import Component from '../components/characterDetail';
import DefaultController from './defaultController';

class CharacterDetail extends DefaultController {
  component = Component;
  name = 'characterDetail';
  constructor(data) {
    super();
    this.data = data;

    if (data && data.callback) {
      data.callback();
    }
  }
}

export default CharacterDetail;