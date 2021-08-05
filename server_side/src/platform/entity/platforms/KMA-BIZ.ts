import fetch from 'node-fetch';
import AbstractService from './abstractService';

export default class KMABIZ extends AbstractService {
  constructor(account) {
    super(account);
  }
  async statusAccount(): Promise<boolean> {
    let status = false;
    const url = `https://api.kma.biz/?method=getoffers&token=${this.account.token}`;
    const resp = await fetch(url).then((resp) => resp.json());
    if (resp.code === 0) status = true;
    return status;
  }
}
