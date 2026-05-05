import { z } from 'zod'

export type IQueryParams = Record<string, string | number | boolean | undefined | null | (string | number | boolean)[]>

export interface IPage {
  totalElements: number
  totalPages: number
}

export interface IListResponse<T> {
  content: T[]
  page: IPage
}

export interface IAxiosResponse<T> {
  message: string
  errors: unknown
  data: T
}

export interface IIDName {
  id: string
  name: string
}

export interface IFile {
  id: string
  name: string
  path: string
  url?: string
  type?: string
  size: number
  originalName?: string
}

export type InferType<T extends z.ZodTypeAny> = z.infer<T>
