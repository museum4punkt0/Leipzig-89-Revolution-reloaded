import Component from '../components/storyEnd';
import DefaultController from './defaultController';

class StoryEnd extends DefaultController {
  component = Component;
  name = 'storyEnd';
  constructor(data) {
    super();
    this.data = data;

    if (data && data.callback) {
      data.callback();
    }
  }
}

export default StoryEnd;