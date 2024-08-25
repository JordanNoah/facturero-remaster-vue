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
  }
}
