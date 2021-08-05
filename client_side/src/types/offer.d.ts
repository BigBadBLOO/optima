declare interface IOfferPayments {
  id?: number
  name?: string
  price?: number
  paymentDesktop?: number
  paymentMobile?: number
  currency?: string
  approve?: number
  newApprove?: number
  targetAction?: string
}

declare interface IOfferSource {
  id?: number
  name?: string
  allow?: boolean
}

declare interface IOfferFlow {
  id?: number
  uid?: string
  name?: string
  comment?: string
}

declare interface IOfferCampaignId {
  id?: number
  uid?: string
  type?: string
  user?: IUser
}

declare interface IOfferByUser {
  id?: number
  offer?: IOffer
  user?: IUser
}

declare interface IOffer {
  id?: number,
  uid?: string,
  name?: string,
  status?: boolean
  comment?: string
  app?: IIntegrationApp
  account?: IIntegrationAccount
  payments?: IOfferPayments[]
  sources?: IOfferSource[]
  flows?: IOfferFlow[]
  campaignId?: IOfferCampaignId[]
  offerByUser?: IOfferByUser[]
  platform?: IPlatform
}