import { UserRole } from '@topcoder/constants'

import { IDistrict } from '../districts/districts.types'
import { IRegion } from '../regions/regions.types'

export interface IUser {
  id: string
  username: string
  password?: string
  fullName: string
  phoneNumber: string
  email: string
  regionId: string
  districtId: string
  role: UserRole
  region?: IRegion
  district?: IDistrict
  createdAt: string
  updatedAt: string
}

export type IUserCreatePayload = Omit<IUser, 'id' | 'createdAt' | 'updatedAt' | 'region' | 'district'>

export type IUserUpdatePayload = Partial<IUserCreatePayload>
