import { Claims } from "./interfaces"
import jwt_decode from "jwt-decode"

export function getTokenClaims(token: string): Claims {
  const claims: Claims = jwt_decode(token)
  return claims
}
