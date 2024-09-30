<template>
  <v-container>
    <div class="d-flex align-center">
      <v-text-field
        v-model="search"
        clearable
        dense
        hide-details
        label="Buscar"
        outlined
      />
      <v-btn
        class="mr-2 ml-5"
        color="primary"
        outlined
        rounded
        @click="createInvoice()"
      >Crear</v-btn>
    </div>
    <v-data-table-server
      v-model:items-per-page="itemsPerPage"
      :headers="headers"
      item-value="name"
      :items="serverItems"
      :items-length="totalItems"
      :loading="loading"
      :search="search"
      @update:options="loadItems"
    >
      <template #item.actions="{ item }">
        <v-btn density="comfortable" icon="mdi-pencil" variant="text" />
        <v-btn density="comfortable" icon="mdi-delete" variant="text" />
        <v-menu location="center" transition="slide-x-transition">
          <template #activator="{ props }">
            <v-btn
              density="comfortable"
              v-bind="props"
              :disabled="setDisableDownload(item)"
              icon="mdi-download"
              variant="text"
            />
          </template>
          <v-list density="compact">
            <v-list-item v-for="invoiceDocument in item.invoiceDocuments" :key="invoiceDocument.uuid" link @click="goTo(invoiceDocument)">
              <template #prepend>
                <v-icon :icon="setIconInvoiceDocument(invoiceDocument)" />
              </template>
              <v-list-item-title>{{ setTitleInvoiceDocument(invoiceDocument) }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </template>
    </v-data-table-server>
  </v-container>
</template>

<script lang="ts">
  import { DataTableOptions, Pagination } from '@/interfaces/index.interface'
  import router from '@/router'

  interface Header {
    title: string; // Cambiado de 'title' a 'text'
    align: 'start' | 'center' | 'end';
    sortable: boolean;
    key: string; // Cambiado de 'key' a 'value'
  }

  interface DataProps {
    itemsPerPage: number;
    headers: ReadonlyArray<Header>;
    search?: string;
    serverItems: any[];
    loading: boolean;
    totalItems: number;
  }

  export default {
    data (): DataProps {
      return {
        itemsPerPage: 5,
        headers: [
          { title: 'No factura', align: 'start', sortable: false, key: 'numberInvoice' },
          { title: 'Numero de autorizacion', key: 'accessKey', align: 'end', sortable: true },
          { title: 'Cliente', key: 'buyerBusinessName', align: 'end', sortable: true },
          { title: 'Total', key: 'totalAmount', align: 'end', sortable: true },
          { title: 'Actions', key: 'actions', align: 'end', sortable: false },
        ] as const,
        search: undefined,
        serverItems: [],
        loading: true,
        totalItems: 0,
      }
    },
    methods: {
      loadItems (dataTableOptions:DataTableOptions) {
        const pagination: Pagination = {
          itemsPerPage: dataTableOptions.itemsPerPage,
          page: dataTableOptions.page,
          search: this.search,
          orderKey: dataTableOptions.sortBy[0] ?? 'id',
          orderType: dataTableOptions.sortBy[0] ? dataTableOptions.sortDesc ? 'DESC' : 'ASC' : 'DESC',
        }

        this.$getInvocesByPagination(pagination).then(response => {
          this.serverItems = response.data.quickAccessInvoices
          this.totalItems = response.data.totalItems
          this.loading = false
        })
      },
      editItem (item: any) {
        console.log(item)
      },
      deleteItem (item: any) {
        console.log(item)
      },
      setDisableDownload (item: any) {
        return item.invoiceDocuments.length === 0
      },
      setIconInvoiceDocument (item : any) {
        if (item.type === 'pdf') return 'mdi-file-pdf-box'
        if (item.type === 'xml') return 'mdi-file-xml-box'
        return 'mdi-file-pdf-box'
      },
      setTitleInvoiceDocument (item: any) {
        if (item.type === 'pdf') return 'PDF'
        if (item.type === 'xml') return 'XML'
        return 'Missing'
      },
      goTo (item: any) {
        window.open(item.url, '_blank')
      },
      createInvoice () {
        router.push('/invoices/1')
      },
    },
  }
</script>
