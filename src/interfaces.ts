export interface claims {
  exp: number
  iat: number
  auth_time: number
  jti: string
  iss: string
  aud: string[]
  sub: string
  typ: string
  azp: string
  nonce: string
  session_state: string
  acr: string
  "allowed-origins": string[]
  realm_access: RealmAccess
  resource_access: ResourceAccess
  scope: string
  sid: string
  email_verified: boolean
  name: string
  preferred_username: string
  given_name: string
  family_name: string
  email: string
}

export interface RealmAccess {
  roles: string[]
}

export interface ResourceAccess {
  "realm-management": RealmManagement
  account: Account
}

export interface RealmManagement {
  roles: string[]
}

export interface Account {
  roles: string[]
}

export interface User {
  name: string
  bio: string
  email: string
  profilePicture: string
  gender: string
  weight: number
  height: number
  birthday: Date
  roleId: number
}
