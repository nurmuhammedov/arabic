import { UserRole } from '@topcoder/constants'
import { IIDName } from '@topcoder/types/common.types.ts'

export interface IUserProfile extends IIDName {
  phone: string
  email?: string
  address?: string
  directorName?: string
  regionId?: number
  region?: IIDName
  districtId?: number
  district?: IIDName
  birthDate?: string
  organizationId?: string
  permissions?: string[]
  type: 'INDIVIDUAL' | 'LEGAL' | 'EMPLOYEE'
}

export interface IUserDetail {
  id: string
  identity: string
  roles: UserRole[]
  profileId: string
  profile: IUserProfile
  branches?: { id: string; name: string }[]
}

export interface IOrganization {
  id: string
  identity: string
  roles: UserRole[]
  profileId: string
  profile: IUserProfile
}
