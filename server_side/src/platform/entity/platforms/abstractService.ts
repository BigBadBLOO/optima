import { IntegrationUsers } from '../IntegrtionUsers.entity';
import { Offer } from '../offers.entity';

export default abstract class AbstractService {
  account: IntegrationUsers;
  protected constructor(account) {
    this.account = account;
  }
  async statusAccount(): Promise<boolean> {
    throw new Error('implement this method');
  }

  async getOffers(): Promise<Offer[]> {
    throw new Error('implement this method');
  }

  async sendLead(): Promise<boolean> {
    throw new Error('implement this method');
  }
}
