import fetch from 'node-fetch';
import AbstractService from './abstractService';
import { Offer } from '../offers.entity';
import { OfferFlow, OfferPayment } from '../offers.addition.entity';

export default class M1Shop extends AbstractService {
  constructor(account) {
    super(account);
  }
  async statusAccount(): Promise<boolean> {
    let status = false;
    const url = `https://m1-shop.ru/offers_export_api/?webmaster_id=${this.account.uid}&api_key=${this.account.token}`;
    const resp = await fetch(url).then((resp) => resp.json());
    if (!resp.status) status = true;
    return status;
  }

  async getOffers(): Promise<Offer[]> {
    const url = `https://m1-shop.ru/offers_export_api/?webmaster_id=${this.account.uid}&api_key=${this.account.token}`;
    const resp = await fetch(url).then((resp) => resp.json());
    if (resp.status) throw new Error(`Аккаунт ${this.account.name} недоступен`);
    const offers: Offer[] = resp
      .filter((offer: any) => offer.tracking_link)
      .map((el: any) => {
        const offer = new Offer();
        offer.uid = el.product_id;
        offer.name = el.name;
        offer.status = true;
        offer.comment = el.info;
        offer.payments = el.target.map((target: any) => {
          const payment = new OfferPayment();
          payment.name = target.geo_name;
          payment.price = target.price;
          payment.paymentDesktop = target.pay;
          payment.paymentMobile = target.pay;
          payment.approve = 0;
          payment.currency = target.pay_currency;
          payment.targetAction = 'Подтверж. заявка';
          return payment;
        });
        const flow = new OfferFlow();
        flow.uid = el.product_id;
        flow.comment = offer.payments && offer.payments[0].name;
        offer.flows = [flow];
        return offer;
      });
    return offers;
  }
}
