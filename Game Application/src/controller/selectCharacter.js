import Component from '../components/selectCharacter';
import DefaultController from './defaultController';

class SelectCharacter extends DefaultController {
  component = Component;
  name = 'selectCharacter';
  constructor(data) {
    super();
    this.data = data;

    if (data && data.callback) {
      data.callback();
    }
  }
}

export default SelectCharacter;