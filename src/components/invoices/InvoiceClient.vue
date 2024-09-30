<template>
    <div>
        <v-row>
            <v-col cols="6">
                <div class="d-flex align-center mb-2">
                    <span class="mr-3">
                        Razón Social / Nombres
                    </span>
                    <v-autocomplete
                        v-model="selectedClient"
                        :items="posibleClients"
                        :loading="clientLoading"
                        :search-input.sync="searchClient"
                        @update:search="onSearchClientNameInput"
                        item-title="fullName"
                        item-value="id"
                        density="compact"
                        hide-details
                        hide-no-data
                        no-filter
                        return-object
                    ></v-autocomplete>
                </div>
                <div>
                    Fecha de Emisión {{ emissionDate }}
                </div>
            </v-col>
            <v-col cols="6">
                <div class="d-flex align-center mb-2">
                    <span class="mr-3">
                        RUC / CI: 
                    </span>
                    <v-autocomplete
                        v-model="selectedClient"
                        :items="posibleClients"
                        :loading="clientLoading"
                        :search-input.sync="searchClient"
                        @update:search="onSearchClientIdentificationInput"
                        item-title="identification"
                        item-value="id"
                        density="compact"
                        hide-details
                        hide-no-data
                        no-filter
                        return-object
                    ></v-autocomplete>
                </div>
                <div>
                    Guia de Remisión: 123456
                </div>
            </v-col>
        </v-row>
    </div>
</template>

<script lang="ts">
import { useInvoiceStore } from '@/stores/invoice'
export default {
    data: () => ({
        selectedClient: null,
        posibleClients: [],
        clientLoading: false,
        searchClient: '',
    }),
    computed: {
        emissionDate() {
            return useInvoiceStore().getEmissionDate()
        }
    },
    watch: {
        selectedClient() {
            //useInvoiceStore().setClientDataToInvoice(this.selectedClient)
        }
    },
    methods: {
        async onSearchClientInput(value:string, type:string) {
            if (value.length > 0) {
                this.clientLoading = true
                this.searchClient = value
                const response = await this.$getCustomerByType(type, this.searchClient)
                this.posibleClients = response.data
                this.clientLoading = false
            }else{
                this.posibleClients = []
            }
        },
        async onSearchClientNameInput(value:string) {
            this.onSearchClientInput(value,'fullname')
        },
        async onSearchClientIdentificationInput(value:string) {
            this.onSearchClientInput(value,'identification')
        }
    }
}
</script>