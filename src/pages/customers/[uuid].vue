<template>
    <v-container>
        <v-row>
            <v-col>
                <h1>Customers</h1>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-form ref="formRef">
                    <v-text-field label="Uuid" v-model="uuid" readonly v-if="isUpdate"></v-text-field>
                    <v-text-field label="Nombre completo" v-model="fullName" :rules="fullNameRules"></v-text-field>
                    <v-text-field label="Direccion" v-model="address"></v-text-field>
                    <v-select label="Tipo de identificación" v-model="identificationType" :items="identificationTypeItems" item-title="text" item-value="type" :rules="identificationTypeRules"></v-select>
                    <v-text-field label="Identificación" v-model="identification" :rules="identificationRules"></v-text-field>
                    <v-combobox
                        v-model="emails"
                        label="Emails"
                        multiple
                        :items="availableItemsEmail"
                        hide-selected
                        hide-no-data
                    >
                        <template v-slot:selection="data">
                            <v-chip 
                                label
                                closable
                            >
                                {{ data.item.title }}
                            </v-chip>
                        </template>
                    </v-combobox>
                    <v-combobox 
                        v-model="phones"
                        label="Telefonos"
                        multiple
                        :items="availableItemsPhone"
                        hide-selected
                        hide-no-data
                    >
                        <template v-slot:selection="data">
                            <v-chip
                                lable
                                closable
                            >
                                {{ data.item.title }}
                            </v-chip>
                        </template>
                    </v-combobox>
                    <v-text-field label="Created At" v-model="createdAt" readonly v-if="isUpdate"></v-text-field>
                    <v-text-field label="Updated At" v-model="updatedAt" readonly v-if="isUpdate"></v-text-field>
                    <v-text-field label="Deleted At" v-model="deletedAt" readonly v-if="isUpdate"></v-text-field>
                    <div class="d-flex justify-end">
                        <v-btn class="mr-2">
                            <v-icon>mdi-delete-outline</v-icon>
                        </v-btn>
                        <v-btn class="mr-2"> Cancel </v-btn>
                        <v-btn @click="sendCustomer()"> {{ messageButton() }} </v-btn>
                    </div>
                </v-form>
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts">
import { Customer } from '@/interfaces/index.interface';
import { useRoute, useRouter } from 'vue-router'
interface RouteParams {
    uuid?: string
}
export default {
    data() {
        return {
            isUpdate: false,
            fullName: null as string | null,
            fullNameRules: [
                (v: string) => !!v || 'El nombre es requerido'
            ],
            identificationTypeItems: [
                {type: '04', text: 'RUC'},
                {type: '05', text: 'Cédula'},
                {type: '06', text: 'Pasarporte'},
                {type: '07', text: 'Consumidor Final'},
                {type: '08', text: 'Identificación Extranjera'}
            ],
            identificationType: null as string | null,
            identificationTypeRules: [
                (v: string) => !!v || 'El tipo de identificación es requerido'
            ],
            identification: null as string | null,
            identificationRules: [
                (v: string) => !!v || 'La identificación es requerida'
            ],
            //emails
            availableItemsEmail: [],
            emails: [] as string[],
            //phones
            availableItemsPhone: [],
            phones: [] as string[],
            id: null as number | null,
            uuid: null as string | null,
            createdAt: null as string | null,
            updatedAt: null as string | null,
            deletedAt: null as string | null,
            address: null as string | null
        }
    },
    mounted() {
        const params = useRoute().params as RouteParams
        if (params.uuid === 'newCustomer') {
            this.isUpdate = false
        } else {
            this.isUpdate = true
            this.getCustomer(params.uuid!)
        }        
    },
    methods: {
        async getCustomer(uuid: string) {
            let response = await this.$getCustomerByUuid(uuid)
            if (response.status === 200) {
                let customer: Customer = response.data
                this.id = customer.id
                this.uuid = customer.uuid
                this.fullName = customer.fullName
                this.address = customer.address
                this.emails = customer.emails
                this.phones = customer.phones
                this.identificationType = customer.identificationType
                this.identification = customer.identification
                this.createdAt = customer.createdAt
                this.updatedAt = customer.updatedAt
                this.deletedAt = customer.deletedAt
                
            }
            console.log(response);
            
        },
        async sendCustomer() {
            const form = this.$refs.formRef as any
            if (form.validate()) {
                let customer: Customer = {
                    id: this.id,
                    uuid: this.uuid,
                    fullName: this.fullName!,
                    address: this.address,
                    emails: this.emails,
                    phones: this.phones,
                    identificationType: this.identificationType!,
                    identification: this.identification!,
                    createdAt: this.createdAt,
                    updatedAt: this.updatedAt,
                    deletedAt: this.deletedAt
                }
                let response = await this.$postCustomer(customer)
                console.log(response)
            }
            
        },
        messageButton() {
            return this.isUpdate ? 'Update' : 'Save'
        },
        onEnterEmail() {
            console.log('onEnterEmail')
        },
        removeEmail(index: number) {
            this.emails.splice(index, 1)
        },
    }
}
</script>