import { AuthUser } from '../../models/auth-user.model'

export interface ApiRequest<ReqBody> {
  data: ReqBody
  authUser: AuthUser
}
