<template>
    <v-row class="border ml-1">
        <v-col class="border-e-lg text-body-2">
            SUBTOTAL 15%
        </v-col>
        <v-col>
            {{  }}
        </v-col>
    </v-row>
    <v-row class="border ml-1">
        <v-col class="border-e-lg text-body-2">
            SUBTOTAL 0%
        </v-col>
        <v-col></v-col>
    </v-row>
    <v-row class="border ml-1">
        <v-col class="border-e-lg text-body-2">
            SUBTOTAL No objeto de IVA
        </v-col>
        <v-col></v-col>
    </v-row>
    <v-row class="border ml-1">
        <v-col class="border-e-lg text-body-2">
            SUBTOTAL SIN IMPUESTOS
        </v-col>
        <v-col></v-col>
    </v-row>
    <v-row class="border ml-1">
        <v-col class="border-e-lg text-body-2">
            DESCUENTO
        </v-col>
        <v-col class="text-body-2">
            {{ getTotalDiscount() }}
        </v-col>
    </v-row>
    <v-row class="border ml-1">
        <v-col class="border-e-lg text-body-2">
            ICE
        </v-col>
        <v-col></v-col>
    </v-row>
    <v-row class="border ml-1">
        <v-col class="border-e-lg text-body-2">
            IVA 15%
        </v-col>
        <v-col></v-col>
    </v-row>
    <v-row class="border ml-1">
        <v-col class="border-e-lg text-body-2">
            PROPINA
        </v-col>
        <v-col class="text-body-2">
            {{ getTip() }}
        </v-col>
    </v-row>
    <v-row class="border ml-1">
        <v-col class="border-e-lg text-body-2">
            VALOR TOTAL
        </v-col>
        <v-col class="text-body-2">
            {{ getTotalAmount() }}
        </v-col>
    </v-row>
</template>

<script lang="ts">
import { useInvoiceStore } from '@/stores/invoice';
export default {
    data: () => ({
        totalCodeCero: 0,
        totalCodeTwo: 0,
        totalCodeThree: 0,
        totalCodeFour: 0,
        totalCodeFive: 0,
        totalCodeSix: 0,
        totalCodeSeven: 0,
        totalCodeEight: 0,
        totalCodeTen: 0
    }),
    computed:{
        subtotalByTaxes(){
            return useInvoiceStore().invoiceEditing.invoiceInfo.totalWithTaxes
        }
    },
    watch:{
        subtotalByTaxes:{
            handler: function(){
                console.log('subtotalByTaxes', this.subtotalByTaxes);
            },
            deep: true
        }
    },
    methods:{
        getTotalDiscount(){
            return this.transformToCurrency(Number(useInvoiceStore().invoiceEditing.invoiceInfo.totalDiscount) ?? 0);
        },
        getTip(){
            return this.transformToCurrency(Number(useInvoiceStore().invoiceEditing.invoiceInfo.tip) ?? 0);
        },
        getTotalAmount(){
            return this.transformToCurrency(Number(useInvoiceStore().invoiceEditing.invoiceInfo.totalAmount) ?? 0);
        },
        transformToCurrency(value: number){
            return value.toLocaleString('es-EC', {style: 'currency', currency: 'USD'});
        }
    }
}
</script>