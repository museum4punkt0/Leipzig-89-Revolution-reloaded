import Component from '../components/mainStory';
import DefaultController from './defaultController';

class MainStory extends DefaultController {
  component = Component;
  name = 'mainStory';
  constructor(data) {
    super();
    this.data = data;

    if (data && data.callback) {
      data.callback();
    }
  }

}

export default MainStory;