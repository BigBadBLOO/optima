declare enum UserGroup {
  ADMIN = 'ADMIN',
  CLIENT = 'CLIENT',
  CLIENT_ADMIN = 'CLIENT_ADMIN',
  CLIENT_PROJECT_MANAGER = 'CLIENT_PROJECT_MANAGER',
  CLIENT_TEAM_LEAD = 'CLIENT_TEAM_LEAD',
  CLIENT_TRAFFIC_MANAGER = 'CLIENT_TRAFFIC_MANAGER',
  CLIENT_MANAGER = 'CLIENT_MANAGER',
  CLIENT_CLIENT = 'CLIENT_CLIENT',
  CLIENT_CONTRACTOR = 'CLIENT_CONTRACTOR',
}

declare interface IUser {
  id?: number
  username?: string
  email?: string
  isConfirmEmail?: boolean
  twoAuth?: boolean
  balance?: number
  group?: UserGroup
  platforms?: [IPlatform]
  platform?: IPlatform
  parent?: IUser
  children?: IUser[]
  offerByUser?: IOfferByUser[]
}