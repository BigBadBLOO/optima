import fetch from 'node-fetch';
import AbstractService from './abstractService';

export default class Facebook extends AbstractService {
  constructor(account) {
    super(account);
  }
  async statusAccount(): Promise<boolean> {
    let status = false;
    const url = `https://graph.facebook.com/v${this.account.app.version}/${this.account.uid}?access_token=${this.account.token}`;
    const resp = await fetch(url).then((resp) => resp.json());
    if (!resp.error) status = true;
    return status;
  }
}
