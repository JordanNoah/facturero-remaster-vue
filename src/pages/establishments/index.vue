<template>
    <v-container>
        <div class="d-flex align-center mx-3">
            <div>
                <h1>Establishments</h1>
            </div>
        </div>
        <v-data-table-server 
            v-model:items-per-page="itemsPerPage" 
                :headers="headers" :items="serverItems"
                :items-length="totalItems" :loading="loading"
                :search="search" item-value="id"
                @update:options="getEstablishments"
                >
            <template v-slot:top>
                <div class="d-flex align-center ma-2">
                    <v-text-field v-model="search" append-icon="search" label="Search" single-line
                        hide-details></v-text-field>
                        <v-spacer></v-spacer>
                        <v-btn @click="createEstablishment" color="primary">Create Establishment</v-btn>
                </div>
            </template>
            <template v-slot:item.actions="{ item }">
                <v-icon small class="mr-2" @click="editEstablishment(item)">mdi-pencil</v-icon>
                <v-icon small @click="deleteEstablishment(item)">mdi-delete</v-icon>
            </template>
            <template v-slot:item.id="{ item }">
                <span style="display: none;"> {{ item.id }} </span>
            </template>
        </v-data-table-server>
        <v-dialog v-model="drawerAction" max-width="600">
            <v-card>
                <v-card-title>
                    <span v-if="isUpdate">Update Establishment</span>
                    <span v-else>Create Establishment</span>
                </v-card-title>
                <v-card-text>
                    <v-form ref="form">
                        <v-text-field v-model="uuid" label="Uuid" required v-if="isUpdate"></v-text-field>
                        <v-text-field v-model="name" label="Name" :rules="nameRules" required></v-text-field>
                        <v-text-field v-model="address" label="Address" required></v-text-field>
                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn @click="drawerAction = false" color="error">Cancel</v-btn>
                    <v-btn @click="saveEstablishment" color="primary">Save</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script lang="ts">
import { DataTableOptions, Establishment, Pagination } from '@/interfaces/index.interface'
import { VForm } from 'vuetify/components';
import router from '@/router'

export default {
    data() {
        return {
            headers: [
                { title: 'Nombre', value: 'name', sortable: true },
                { title: 'Codigo', value: 'code', sortable: true },
                { title: 'Actions', value: 'actions', sortable: false },
                { title: '', value: 'id', sortable: false, }
            ],
            itemsPerPage: 5,
            loading: false,
            search: '',
            serverItems: [] as Establishment[],
            totalItems: 0,
            drawerAction: false,
            isUpdate: false,
            nameRules: [
                (v: string) => !!v || 'Name is required',
            ],
            dataTableOptions: {} as DataTableOptions,
            //
            id: 0,
            uuid: '',
            name: '',
            address: '',
            typeEstablishment: '',
            institutionId: 0,
            emissionPoints: [
                {
                    id: 0,
                    code: '001',
                    createdAt: '',
                    updatedAt: '',
                    deletedAt: ''
                },
            ],
            createdAt: '',
            updatedAt: ''
        }
    },
    methods: {
        createEstablishment() {
            this.drawerAction = true
        },
        editEstablishment(item: Establishment) {
            router.push(`/establishments/${item.uuid}`)
        },
        deleteEstablishment(item: Establishment) {
            console.log(item);
        },
        async saveEstablishment(){
            if ((await (this.$refs.form as InstanceType<typeof VForm>).validate()).valid) {
                const establishment: Establishment = {
                    id: this.id,
                    uuid: this.uuid,
                    name: this.name,
                    address: this.address,
                    institution_id: 1,
                    createdAt: this.createdAt,
                    updatedAt: this.updatedAt,
                    deletedAt: null
                }

                const response = await this.$postEstablishment(establishment)
                if (response.status === 200) {
                    this.drawerAction = false
                    this.getEstablishments(this.dataTableOptions)
                }
            }
        },
        async getEstablishments(options: DataTableOptions) {
            this.loading = true
            this.dataTableOptions = options;

            const pagination: Pagination = {
                itemsPerPage: options.itemsPerPage,
                page: options.page,
                search: this.search,
                orderKey: options.sortBy[0] ?? 'id',
                orderType: options.sortBy[0] ? options.sortDesc ? 'DESC' : 'ASC' : 'DESC',
            }

            const response = await this.$getEstablishmentsByInstitutionIdPagination(pagination, 1)
            if (response.status === 200) {
                console.log(response.data);
                
                this.serverItems = response.data.establishments
                this.totalItems = response.data.totalItems
            }
            this.loading = false
        }
    }
}

</script>