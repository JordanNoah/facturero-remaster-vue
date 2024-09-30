import { Customer, Establishment, Pagination, Product } from '@/interfaces/index.interface'
import Axios from 'axios'
import { Plugin } from 'vue'

const axios = Axios.create({
  baseURL: 'http://192.168.56.1:3030/api',
  headers: {
    'Content-type': 'application/json',
  },
  timeout: 5000,
})

export const provider: Plugin = {
  install (app) {
    app.config.globalProperties.$getInvocesByPagination = async (pagination: Pagination) => {
      return axios.get('/invoice/getByPagination', {
        params: pagination,
      })
    },
    app.config.globalProperties.$getProductsByPagination = async (pagination: Pagination) => {
      return axios.get('/product/getByPagination', {
        params: pagination,
      })
    },
    app.config.globalProperties.$postProduct = async (product: Product) => {
      return axios.post('/product', product)
    },
    app.config.globalProperties.$getProductByUuid = async (uuid: string) => {
      return axios.get(`/product/uuid/${uuid}`)
    },
    app.config.globalProperties.$deleteProductById = async (id: number) => {
      return axios.delete(`/product/id/${id}`)
    }
    app.config.globalProperties.$postCustomer = async (customer: Customer) => {
      return axios.post('/customer', customer)
    }
    app.config.globalProperties.$getCustomerByUuid = async (uuid: string) => {
      return axios.get(`/customer/uuid/${uuid}`)
    }
    app.config.globalProperties.$deleteCustomerById = async (id: number) => {
      return axios.delete(`/customer/id/${id}`)
    }
    app.config.globalProperties.$getCustomersByPagination = async (pagination: Pagination) => {
      return axios.get('/customer/getByPagination', {
        params: pagination,
      })
    },
    app.config.globalProperties.$getOrganizationByUuid = async (uuid: string) => {
      return axios.get(`/institution/uuid/${uuid}`)
    },
    app.config.globalProperties.$postEstablishment = async (establishment: Establishment) => {
      return axios.post('/establishment', establishment)
    },
    app.config.globalProperties.$getEstablishmentsByInstitutionIdPagination = async (pagination: Pagination,institutionId:number) => {
      return axios.get(`/establishment/getByPagination`,{
        params: {institutionId,...pagination}
      })
    },
    app.config.globalProperties.$getEstablishmentByUuid = async (uuid: string) => {
      return axios.get(`/establishment/uuid/${uuid}`)
    },
    app.config.globalProperties.$addEmisionPoint = async (establishmentId: number) => {
      return axios.post(`/emisionPoint/add`,{establishmentId})
    },
    app.config.globalProperties.$deleteEmisionPoint = async (emisionPointId: number) => {
      return axios.delete(`/emisionPoint/${emisionPointId}`)
    },
    app.config.globalProperties.$getNextInvoiceNumber = async (institutionId: number, establishment: string, emissionPoint: string) => {
      return axios.get(`/invoice/getNextInvoiceNumber`,{
        params: {institutionId,establishment,emissionPoint}
      })
    },
    app.config.globalProperties.$getCustomerByType = async (type: string, value:string) => {
      return axios.get(`/customer/byType`,{
        params: {
          type:type,
          value:value
        }
      })
    },
    app.config.globalProperties.$getProductByType = async (type: string, value:string) => {
      return axios.get(`/product/byType`,{
        params: {
          type:type,
          value:value
        }
      })
    }
  },
}
