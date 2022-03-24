import Component from '../components/changeCharacter';
import DefaultController from './defaultController';

class ChangeCharacter extends DefaultController {
  component = Component;
  name = 'changeCharacter';
  constructor(data) {
    super();
    this.data = data;
  }
}

export default ChangeCharacter;