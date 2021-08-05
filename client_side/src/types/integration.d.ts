declare interface IIntegrationApp {
  id?: number,
  uid?: string,
  key?: string,
  name?: string,
  version?: string,
  category?: string
  utm_source?: string
}

declare interface IIntegrationCabinet {
  id: number,
  uid: string,
  name:string,
  factor: number,
  access_get_statistic: boolean
  account?: IIntegrationAccount
}

declare interface IIntegrationAccount {
  id?: number,
  uid?: string,
  name?: string,
  token?: string,
  token_date_update?: string
  app?: IIntegrationAccount,
  user?: IUser,
  cabinets?: IIntegrationCabinet[]
}