<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <h1>Establishment {{ name }}</h1>
            </v-col>
            <v-col cols="12">
                <v-text-field label="Uuid" v-model="uuid" readonly></v-text-field>
                <v-text-field label="Name" v-model="name" readonly></v-text-field>
                <v-text-field label="Address" v-model="address" readonly></v-text-field>
            </v-col>
            <v-col>
                <div class="d-flex mb-4">
                    <h3>Emision points</h3>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" @click="addEmisionPoint()">Add Emision Point</v-btn>
                </div>
                <v-data-table :headers="headers" :items="emisionPoints" density="compact" item-key="id">
                    <template v-slot:item.id="{ item }">
                        <span style="display: none;"> {{ item.id }} </span>
                    </template>
                    <template v-slot:item.actions="{ item }">
                        <v-icon small @click="deleteEmisionPoint(item)">mdi-delete</v-icon>
                    </template>
                </v-data-table>
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts">
import { DataTableOptions, EmissionPoint } from '@/interfaces/index.interface';

interface RouteParams {
    uuid?: string
}

export default {
    data() {
        return {
            headers: [
                { title: 'Code', value: 'code', sortable: false },
                { title: 'Address', value: 'address', sortable: false, },
                { title: 'Created at', value: 'createdAt', sortable: false },
                { title: 'Updated at', value: 'updatedAt', sortable: false },
                { title: 'Actions', value: 'actions', sortable: false },
                { title: '', value: 'id', sortable: false, width: '0px' }
            ],
            itemsPerPage: 5,
            loading: false,
            search: '',
            totalItems: 0,
            dataTableOptions: {} as DataTableOptions,
            //
            id: null,
            uuid: null,
            name: null,
            address: null,
            institution_id: null,
            createdAt: null,
            updatedAt: null,
            deletedAt: null,
            //
            emisionPoints: [] as EmissionPoint[]
        }
    },
    mounted() {
        const params = useRoute().params as RouteParams
        this.getEstablishment(params.uuid!)
    },
    methods: {
        async getEstablishment(uuid:string) {
            const response = await this.$getEstablishmentByUuid(uuid)
            
            const establishment = {
                id: response.data.id,
                uuid: response.data.uuid,
                name: response.data.name,
                address: response.data.address,
                institution_id: response.data.institution_id,
                createdAt: response.data.createdAt,
                updatedAt: response.data.updatedAt,
                deletedAt: response.data.deletedAt,
                emisionPoints: response.data.emissionPoints
            }
            
            this.id = establishment.id
            this.uuid = establishment.uuid
            this.name = establishment.name
            this.address = establishment.address
            this.institution_id = establishment.institution_id
            this.createdAt = establishment.createdAt
            this.updatedAt = establishment.updatedAt
            this.deletedAt = establishment.deletedAt
            this.emisionPoints = establishment.emisionPoints
        },
        async addEmisionPoint() {
            const response = await this.$addEmisionPoint(this.id!)
            if (response.status === 200) {
                this.getEstablishment(this.uuid!)
            }   
        },
        async deleteEmisionPoint(item: EmissionPoint) {
            const response = await this.$deleteEmisionPoint(item.id!)
            if (response.status === 200) {
                this.getEstablishment(this.uuid!)
            }
        }
    }
}

</script>