import { UserRole } from '@topcoder/constants'
import { IIDName } from '@topcoder/types'

export interface IUserProfile extends IIDName {
  fullName: string
  phoneNumber: string
  email?: string
  regionId: string
  region?: IIDName
  districtId: string
  district?: IIDName
  role: UserRole
}
