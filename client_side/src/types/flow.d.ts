declare interface IFlow {
  id?: number
  name?: string
  redirect?: boolean
  account?: IUser
  domain?: IFlowDomain
  app?: IIntegrationApp
  platform?: IPlatform
  landingsByFlow?: ILandingsByFlow[]
}

declare interface IFlowDomain {
  id?: number
  name?: string
  url?: string
}

declare interface ILandingsByFlow {
  id?: number
  landing?: ILanding
  flow?: IFlow
  percent?: number
  useInFlow?: boolean
}