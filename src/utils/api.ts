import type { IApi, IResult } from '@/interfaces/IApi'
import type { Endpoints } from '@/interfaces/IEndpoints'

export const api: IApi = {
  request: async (
    url: Endpoints,
    method: string,
    data: any = {},
    headers: any = {},
    baseUrl: string = import.meta.env.PUBLIC_BASE_URL
  ): Promise<IResult> => {
    try {
      const options: RequestInit = {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...headers, // Permite agregar headers adicionales si se pasan
        },
      }

      if (method != 'GET') options.body = JSON.stringify(data)

      const response = await fetch(`${baseUrl}${url}`, options)
      const cType = response.headers.get('Content-Type')

      return {
        ok: response.ok,
        status: response.status,
        data: cType && cType.includes('application/json') ? await response.json() : await response.text(),
      }
    } catch (err) {
      console.log('❌ Error: ', err)
    }
  },

  get: async (url: Endpoints, headers?: any, baseUrl?: string) => {
    return await api.request(url, 'GET', null, headers, baseUrl)
  },

  post: async (url: Endpoints, data?: any, headers?: any, baseUrl?: string) => {
    return await api.request(url, 'POST', data, headers, baseUrl)
  },

  put: async (url: Endpoints, data?: any, headers?: any, baseUrl?: string) => {
    return await api.request(url, 'PUT', data, headers, baseUrl)
  },

  delete: async (url: Endpoints, data?: any, headers?: any, baseUrl?: string) => {
    return await api.request(url, 'DELETE', data, headers, baseUrl)
  },

  sendSuccessResponse: (data: any = '', status: number = 200) => {
    return new Response(JSON.stringify(data), {
      status,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  },

  // Función generalizada para manejar errores
  sendErrorResponse: (error: any, status: number = 500) => {
    return new Response(
      JSON.stringify({
        success: false,
        message: 'sendErrorResponse: ' + error.message || 'An error occurred',
        error: import.meta.env.PROD ? 'error :(' : error, // Evita mostrar detalles sensibles en prod
      }),
      {
        status,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
  },
}
