export type PlatformType = {
  id: number
  platformName: string
  type: string
}

export enum UserGroup {
  ADMIN = "ADMIN",
  CLIENT = "CLIENT",
  CLIENT_ADMIN = "CLIENT_ADMIN",
  CLIENT_PROJECT_MANAGER = "CLIENT_PROJECT_MANAGER",
  CLIENT_TRAFFIC_MANAGER = "CLIENT_TRAFFIC_MANAGER",
  CLIENT_MANAGER = "CLIENT_MANAGER",
  CLIENT_CLIENT = "CLIENT_CLIENT",
  CLIENT_CONTRACTOR = "CLIENT_CONTRACTOR",
}

export type UserType = {
  id: number
  username: string
  email: string
  isConfirmEmail?: boolean
  twoAuth?: boolean
  balance?: number
  group: UserGroup
  platforms?: [PlatformType]
  platform?: PlatformType
}