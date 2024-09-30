<template>
    <v-row>
        <div class="d-flex justify-center w-100 mt-3 mb-1">
            <h4>
                Formas de pago
            </h4>
        </div>
        <v-data-table
            class="pb-1"
            density="compact"
            :headers="paymentMethodHeaders"
            hide-default-footer
            :items="paymentMethodsTable"
        >
            <template #item.paymentMethod="{item}">
                <v-autocomplete v-model="item.paymentMethod" :items="paymentMethods" item-title="paymentMethod" item-value="code" class="my-2" density="compact" hide-details @update:model-value="checkLastRow()"></v-autocomplete>
            </template>
            <template #item.total="{item}">
                <v-text-field class="my-2" density="compact" hide-details v-model="item.total" @update:model-value="checkLastRow()"></v-text-field>
            </template>
            <template #item.term="{item}">
                <v-text-field class="my-2" density="compact" v-model="item.term" hide-details @update:model-value="checkLastRow()"></v-text-field>
            </template>
            <template #item.timeUnit="{item}">
                <v-select v-model="item.timeUnit" :items="unitTime" class="my-2" density="compact" hide-details @update:model-value="checkLastRow()"></v-select>
            </template>
            <template #item.actions="{item}">
                <v-icon @click="removePaymentMethod(item)">mdi-delete</v-icon>
            </template>
        </v-data-table>
    </v-row>
</template>

<script lang="ts">
import { Payment } from '@/interfaces/index.interface';
import { useInvoiceStore } from '@/stores/invoice';


export default {
    data(){
        return{
            paymentMethodHeaders: [
                {
                    title: 'Forma de pago',
                    align: 'center',
                    sortable: false,
                    value: 'paymentMethod',
                },
                {
                    title: 'Valor',
                    align: 'center',
                    sortable: false,
                    value: 'total',
                },
                {
                    title: 'Plazo',
                    align: 'center',
                    sortable: false,
                    value: 'term'
                },
                {
                    title: 'Tiempo',
                    align: 'center',
                    sortable: false,
                    value: 'timeUnit'
                },
                {
                    title: '',
                    align: 'center',
                    sortable: false,
                    value: 'actions'
                }
            ],
            paymentMethods: [
                {
                    code: '01',
                    paymentMethod: 'SIN UTILIZACION DEL SISTEMA FINANCIERO',
                },
                {
                    code: '15',
                    paymentMethod: 'COMPENSACIÓN DE DEUDAS',
                },
                {
                    code: '16',
                    paymentMethod: 'TARJETA DE DÉBITO',
                },
                {
                    code: '17',
                    paymentMethod: 'DINERO ELECTRÓNICO',
                },
                {
                    code: '18',
                    paymentMethod: 'TARJETA PREPAGO',
                },
                {
                    code: '19',
                    paymentMethod: 'TARJETA DE CRÉDITO',
                },
                {
                    code: '20',
                    paymentMethod: 'OTROS CON UTILIZACIÓN DEL SISTEMA FINANCIERO',
                },
                {
                    code: '21',
                    paymentMethod: 'ENDOSO DE TÍTULOS',
                },
            ],
            unitTime:[
                'Días',
                'Meses',
                'Años'
            ]
        }
    },
    mounted:function(){
        this.checkLastRow()
    },
    computed:{
        paymentMethodsTable(): Payment[]{
            return useInvoiceStore().getPaymentMethods()
        }
    },
    methods:{
        checkLastRow(){
            useInvoiceStore().checkIfNeedNewPaymentMethod()
        },
        removePaymentMethod(item: Payment){
            useInvoiceStore().removePaymentMethod(item)
        }
    }
}
</script>