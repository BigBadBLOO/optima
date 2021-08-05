import fetch from 'node-fetch';
import AbstractService from './abstractService';
import { Offer } from '../offers.entity';
import {
  OfferFlow,
  OfferPayment,
  OfferSource,
} from '../offers.addition.entity';
import { Source } from 'graphql';

export default class Offerrum extends AbstractService {
  constructor(account) {
    super(account);
  }
  async statusAccount(): Promise<boolean> {
    let status = false;
    const url = `https://api.offerrum.com/webmaster/balance/?key=${this.account.token}`;
    const resp = await fetch(url).then((resp) => resp.json());
    if (!resp.error) status = true;
    return status;
  }

  async getOffers(): Promise<Offer[]> {
    const url = `https://api.offerrum.com/webmaster/offers/?key=${this.account.token}&type=my`;
    const resp = await fetch(url).then((resp) => resp.json());
    const url_flows = `https://api.offerrum.com/webmaster/flows/?key=${this.account.token}`;
    const resp_flows = await fetch(url_flows).then((resp) => resp.json());
    if (resp.error) throw new Error(`Аккаунт ${this.account.name} недоступен`);

    const flows = resp_flows.response.items;
    const offers: Offer[] = resp.response.items.map((el: any) => {
      const offer = new Offer();
      offer.status = true;
      offer.uid = el.id;
      offer.name = el.title;
      offer.comment = el.description;
      offer.sources = el.sources.map((target: any) => {
        const source = new OfferSource();
        source.name = target.title;
        source.allow = target.legal === 1;
        return source;
      });
      offer.payments = el.geo.countries.map((target: any) => {
        const payment = new OfferPayment();
        payment.name = target.name;
        payment.price = target.price;
        payment.currency = target.currency;

        const pay = el.goals.find((el) => el.title.indexOf(target.name));
        payment.paymentDesktop = pay ? pay.profit : 0;
        payment.paymentMobile = pay ? pay.profit : 0;
        payment.approve = 0;
        payment.targetAction = 'Подтверж. заявка';
        return payment;
      });
      offer.flows = flows
        .filter((flow) => Number(flow.offerId) === Number(offer.uid))
        .map((flow_el) => {
          const flow = new OfferFlow();
          flow.uid = flow_el.id;
          flow.name = flow_el.title;
          flow.comment = '-';
          return flow;
        });
      return offer;
    });
    return offers;
  }
}
