import Component from '../components/qrScan';
import DefaultController from './defaultController';

class QrScan extends DefaultController {
  component = Component;
  name = 'qrScan';
  constructor(data) {
    super();

    if (data && data.callback) {
      data.callback();
    }
  }
}

export default QrScan;