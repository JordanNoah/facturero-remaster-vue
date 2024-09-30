<template>
    <v-data-table-server 
        :headers="headers"
        :items="serverItems"
        :items-length="totalItems"
        :loading="loading"
        :search="search"
        item-value="id"
        @update:options="loadItems">
        <template v-slot:item.emails="{ item }">
            <v-chip class="ma-1" v-for="email in item.emails" :key="email" size="x-small">
                {{ email }}
            </v-chip>
        </template>
        <template v-slot:item.phones="{ item }">
            <v-chip class="ma-1" v-for="phone in item.phones" :key="phone" size="x-small">
                {{ phone }}
            </v-chip>
        </template>
        <template v-slot:item.id="{ item }">
            <span style="display: none;"> {{ item.id }} </span>
        </template>
        <template v-slot:item.actions="{ item }">
            <v-icon small class="mr-2" @click="editcustomer(item)">mdi-pencil</v-icon>
            <v-icon small @click="deleteCustomer(item)">mdi-delete</v-icon>
        </template>
    </v-data-table-server>
</template>

<script lang="ts">
import { Customer, DataTableOptions, Pagination } from '@/interfaces/index.interface';
import router from '@/router';

export default {
    data() {
        return {
            headers: [
                { title: 'Uuid', value: 'uuid', sortable: true },
                { title: 'Full name', value: 'fullName', sortable: true },
                { title: 'Identification', value: 'identification', sortable: true },
                { title: 'Emails', value: 'emails', sortable: false },
                { title: 'Phones', value: 'phones', sortable: false },
                { title: 'Created at', value: 'createdAt', sortable: false },
                { title: 'Updated at', value: 'updatedAt', sortable: false },
                { title: 'Actions', value: 'actions', sortable: false },
                { title: '', value: 'id', sortable: false, width: '0px' }
            ],
            itemsPerPage: 5,
            loading: false,
            search: '',
            serverItems: [] as Customer[],
            totalItems: 0,
            dataTableOptions: {} as DataTableOptions
        }
    },
    methods: {
        async loadItems(options: DataTableOptions) {
            this.loading = true;
            this.dataTableOptions = options;

            const pagination: Pagination = {
                itemsPerPage: options.itemsPerPage,
                page: options.page,
                search: this.search,
                orderKey: options.sortBy[0] ?? 'id',
                orderType: options.sortBy[0] ? options.sortDesc ? 'DESC' : 'ASC' : 'DESC',
            }

            const response = await this.$getCustomersByPagination(pagination);
            this.serverItems = response.data.customers;
            this.totalItems = response.data.totalItems;
            this.loading = false;
        },
        editcustomer(item: Customer) {
            router.push(`/customers/${item.uuid}`);
        },
        async deleteCustomer(item: Customer) {
            await this.$deleteCustomerById(item.id!);
            this.loadItems(this.dataTableOptions);
        }
    },
}

</script>