import Component from '../components/quitGame';
import DefaultController from './defaultController';

class QuitGame extends DefaultController {
  component = Component;
  name = 'quitGame';
  constructor(data) {
    super();
    this.data = data;

    if (data && data.callback) {
      data.callback();
    }
  }
}

export default QuitGame;