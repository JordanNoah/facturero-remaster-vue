// vue-shims.d.ts

import { ComponentCustomProperties } from 'vue'

export interface AxiosResponse<T = any> {
  data: T;
  status: number;
  statusText: string;
  headers: Record<string, any>;
  config: AxiosRequestConfig;
  request?: any;
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $getInvocesByPagination(pagination: Pagination): Promise<AxiosResponse>
    $getProductsByPagination(pagination: Pagination): Promise<AxiosResponse>
    $getCustomersByPagination(pagination: Pagination): Promise<AxiosResponse>
    $postProduct(product: Product): Promise<AxiosResponse>
    $getProductByUuid(uuid: string): Promise<AxiosResponse>
    $deleteProductById(id: number): Promise<AxiosResponse>
    $postCustomer(customer: Customer): Promise<AxiosResponse>
    $getCustomerByUuid(uuid: string): Promise<AxiosResponse>
    $deleteCustomerById(id: number): Promise<AxiosResponse>
    $getOrganizationByUuid(uuid: string): Promise<AxiosResponse>
    $postEstablishment(establishment: Establishment): Promise<AxiosResponse>
    $getEstablishmentsByInstitutionIdPagination(pagination: Pagination,institutionId:number): Promise<AxiosResponse>
    $getEstablishmentByUuid(uuid: string): Promise<AxiosResponse>
    $addEmisionPoint(establishmentId: number): Promise<AxiosResponse>
    $deleteEmisionPoint(emisionPointId: number): Promise<AxiosResponse>
    $getNextInvoiceNumber(institutionId: number, establishment: string, emissionPoint: string): Promise<AxiosResponse>
    $getCustomerByType(type: string, value:string): Promise<AxiosResponse>
    $getProductByType(type: string, value:string): Promise<AxiosResponse>
  }
}
