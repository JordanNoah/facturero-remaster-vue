import { Pagination } from '@/interfaces/index.interface'
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
    }
  },
}
