import fetch from 'node-fetch';
import AbstractService from './abstractService';
import { Offer } from '../offers.entity';
import {
  OfferFlow,
  OfferPayment,
} from '../offers.addition.entity';

export default class ProfitPay extends AbstractService {
  constructor(account) {
    super(account);
  }

  async statusAccount(): Promise<boolean> {
    let status = false;
    const url = `https://dashboard.profitpay.pro/api/wm/flows.json?id=${this.account.uid}-${this.account.token}`;
    const resp = await fetch(url).then((resp) => resp.json());
    if (!(resp.status === 'error')) status = true;
    return status;
  }

  async getOffers(): Promise<Offer[]> {
    const offers: Offer[] = [];

    const url_flows = `https://my.profitpay.one/api/wm/flows.json?id=${this.account.uid}-${this.account.token}`;
    const resp_flows = await fetch(url_flows).then((resp) => resp.json());

    if (resp_flows.status === 'error') {
      throw new Error(`Аккаунт ${this.account.name} недоступен`);
    }
    const flows = [];
    const offer_ids = Object.keys(resp_flows).reduce((acc, key) => {
      const id = resp_flows[key]['offer'];
      flows.push(resp_flows[key]);
      if (acc.indexOf(id) < 0) acc.push(id);
      return acc;
    }, []);
    for (const id of offer_ids) {
      const url_offer = `https://my.profitpay.one/api/wm/offers.json?id=${this.account.uid}-${this.account.token}&offer=${id}`;
      let resp_offer = await fetch(url_offer).then((resp) => resp.json());
      resp_offer = resp_offer[id];

      const offer = new Offer();
      offer.status = true;
      offer.uid = resp_offer.id;
      offer.name = resp_offer.name;
      offer.comment = '';
      offer.payments = [];
      for (const obj of Object.entries(resp_offer.geo)) {
        const [, value] = obj;
        const payment = new OfferPayment();
        payment.name = value['name'];
        payment.price = value['price'];
        payment.currency = value['currency'];
        payment.paymentDesktop = value['desktop'].base;
        payment.paymentMobile = value['mobile'].base;
        payment.approve = value['approve'];
        payment.targetAction = 'Подтверж. заявка';
        offer.payments.push(payment);
      }
      offer.flows = flows
        .filter((flow) => Number(flow.offer) === Number(offer.uid))
        .map((flow_el) => {
          const flow = new OfferFlow();
          flow.uid = flow_el.id;
          flow.name = flow_el.name;
          flow.comment = '-';
          return flow;
        });
      offers.push(offer);
    }
    return offers;
  }
}
