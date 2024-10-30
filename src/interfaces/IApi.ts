import type { Endpoints } from '@/interfaces/IEndpoints'

export interface IResult {
  ok: boolean
  status: number
  data: any
}

export interface IApi {
  request: (url: Endpoints, method: string, data?: any, headers?: Record<string, string>, baseUrl?: string) => Promise<IResult>
  get: (url: Endpoints, headers?: Record<string, string>, baseUrl?: string) => any
  post: (url: Endpoints, data?: any, headers?: Record<string, string>, baseUrl?: string) => any
  put: (url: Endpoints, data?: any, headers?: Record<string, string>, baseUrl?: string) => any
  delete: (url: Endpoints, data?: any, headers?: Record<string, string>, baseUrl?: string) => any

  sendSuccessResponse: (data?: any, status?: number) => Response
  sendErrorResponse: (error: any, status?: number) => Response
}

export type ApiResponse<T> = {
  success: boolean
  data?: T
  message?: string
  error?: any
}
