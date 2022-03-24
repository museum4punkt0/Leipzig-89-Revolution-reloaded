import Component from '../components/infos';
import DefaultController from './defaultController';

class Infos extends DefaultController {
  component = Component;
  name = 'infos';
  constructor(data) {
    super();
    this.data = data;

    if (data && data.callback) {
      data.callback();
    }
  }
}

export default Infos;