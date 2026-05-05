import { IRegion } from '../regions/regions.types'

export interface IDistrict {
  id: string
  name: string
  soato: string
  regionId: string
  region?: IRegion
  createdAt: string
  updatedAt: string
}
