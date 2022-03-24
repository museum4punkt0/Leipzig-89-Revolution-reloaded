import Component from '../components/map';
import DefaultController from './defaultController';

class Map extends DefaultController {
  component = Component;
  name = 'map';
  constructor(data) {
    super();
    this.data = data;

    if (data && data.callback) {
      data.callback();
    }
  }
}

export default Map;