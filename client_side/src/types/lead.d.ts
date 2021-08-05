declare enum LeadStatus {
  NEW = 'NEW',
  ACCEPT = 'ACCEPT',
  WAIT = 'WAIT',
  AVOID = 'AVOID',
}

declare interface ILead {
  id?: number
  payment?: number
  isDouble?: boolean
  date_create?: Date
  offer?: IOffer
  offer_name?: string
  prelanding?: ILanding
  prelanding_name?: string
  landing?: ILanding
  landing_name?: string
  flow?: IFlow
  flow_name?: string
  geo?: string,
  app?: IIntegrationApp
  name?: string,
  birth?: string,
  phone?: string,
  comment?: string,
  user?: IUser
  campaign_name?: string
  adset_name?: string
  ad_name?: string
  ad_id?: string
  status?: LeadStatus
  date_status?: Date


  platform?: IPlatform
}