<template>
    <v-data-table-server 
    v-model:items-per-page="itemsPerPage"
    :headers="headers"
    :items="serverItems"
    :items-length="totalItems"
    :loading="loading"
    :search="search"
      item-value="id"
      @update:options="loadItems">
        <template v-slot:top>
            <v-toolbar flat>
                <v-toolbar-title>Products</v-toolbar-title>
                <v-divider class="mx-4" inset vertical></v-divider>
                <v-spacer></v-spacer>
                <v-text-field
                    v-model="search"
                    append-icon="search"
                    label="Search"
                    single-line
                    hide-details
                ></v-text-field>
            </v-toolbar>
        </template>
        <template v-slot:item.id="{ item }">
            <span style="display: none;"> {{ item.id }} </span>
        </template>
        <template v-slot:item.price="{ item }">
            <span> $ {{ item.price }} </span>
        </template>
        <template v-slot:item.tags="{ item }">
            <span v-if="item.tags.length == 0"> Tags no configurados </span>
            <v-chip v-else v-for="(tag, index) in item.tags" :key="index" class="mr-2" label>{{ tag.value_tag }}</v-chip>
        </template>
        <template v-slot:item.actions="{ item }">
            <v-icon small class="mr-2" @click="editProduct(item)">mdi-pencil</v-icon>
            <v-icon small @click="deleteProduct(item)">mdi-delete</v-icon>
        </template>
    </v-data-table-server>
</template>

<script lang="ts">
import { DataTableOptions, Pagination, Product } from '@/interfaces/index.interface';
import router from '@/router';
export default {
    data() {
        return {
            headers: [
                { title: 'Name', value: 'name', sortable: true },
                { title: 'Code', value: 'code', sortable: true },
                { title: 'Price', value: 'price', sortable: true },
                { title: 'Tags', value: 'tags', sortable: false },
                { title: 'Actions', value: 'actions', sortable: false },
                { title: '', value: 'id', sortable: false, width: '0px' }
            ],
            itemsPerPage: 5,
            loading: false,
            search: '',
            serverItems: [] as Product[],
            totalItems: 0,
            dataTableOptions: {} as DataTableOptions
        }
    },
    methods:{
        async loadItems(dataTableOptions: DataTableOptions) {
            this.dataTableOptions = dataTableOptions
            const pagination: Pagination = {
              itemsPerPage: dataTableOptions.itemsPerPage,
              page: dataTableOptions.page,
              search: this.search,
              orderKey: dataTableOptions.sortBy[0] ?? 'id',
              orderType: dataTableOptions.sortBy[0] ? dataTableOptions.sortDesc ? 'DESC' : 'ASC' : 'DESC',
            }

            this.loading = true
            const response = await this.$getProductsByPagination(pagination)
            this.serverItems = response.data.products
            this.totalItems = response.data.totalItems
            this.loading = false
        },
        editProduct(item: Product) {
            router.push(`/products/${item.uuid}`)
        },
        async deleteProduct(item: Product) {
            await this.$deleteProductById(item.id!)
            this.loadItems(this.dataTableOptions)
        }
    }
}
</script>