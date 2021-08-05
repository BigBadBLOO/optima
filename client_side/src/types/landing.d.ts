declare interface ILanding {
  id?: number,
  name?: string,
  offer?: IOffer
  flow?: IOfferFlow
  payment?: IOfferPayments
  account?: IUser
  url?: string
  isLanding?: boolean
  redirect?: boolean
  platform?: IPlatform
  landingsByFlow?: ILandingsByFlow[]
}