import Component from '../components/intro';
import DefaultController from './defaultController';

class Intro extends DefaultController {
  component = Component;
  name = 'intro';
  constructor(data) {
    super();
    this.data = data;

    if (data && data.callback) {
      data.callback();
    }
  }
}

export default Intro;