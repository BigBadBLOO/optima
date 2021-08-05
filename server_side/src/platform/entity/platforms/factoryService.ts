import { IntegrationUsers } from '../IntegrtionUsers.entity';
import AbstractService from './abstractService';
import Facebook from './Facebook';
import KMABIZ from './KMA-BIZ';
import M1Shop from './M1Shop';
import Offerrum from './Offerrum';
import ProfitPay from './ProfitPay';

export default class FactoryService {
  getService(account: IntegrationUsers): AbstractService {
    switch (account.app.name) {
      case 'Facebook':
        return new Facebook(account);
      case 'KMA.BIZ':
        return new KMABIZ(account);
      case 'Offerrum':
        return new Offerrum(account);
      case 'M1-SHOP':
        return new M1Shop(account);
      case 'ProfitPay':
        return new ProfitPay(account);
      default:
        return;
    }
  }
}
