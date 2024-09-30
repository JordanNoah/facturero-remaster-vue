<template>
    <v-row class="border">
        <v-col cols="12">
            <h3>
                Información adicional
            </h3>
        </v-col>
        <v-col cols="12">
            <v-row align-content="center" v-for="(additionalField, index) in additionalFields">
                <v-col cols="5">
                    <v-text-field v-model="additionalField.name" density="compact" label="Identificador" hide-details @update:model-value="checkLastData()"></v-text-field>
                </v-col>
                <v-col cols="6">
                    <v-text-field v-model="additionalField.value" density="compact" label="Valor" hide-details @update:model-value="checkLastData()"></v-text-field>
                </v-col>
                <v-col cols="1" class="d-flex align-center justify-center" v-if="notLastOne(index)">
                    <v-icon @click="removeAdditionalDetail(index)">mdi-delete</v-icon>
                </v-col>
            </v-row>
        </v-col>
    </v-row>
</template>

<script lang="ts">
import { AdditionalDetail } from '@/interfaces/index.interface';
import { useInvoiceStore } from '@/stores/invoice';
export default {
    methods: {
        removeAdditionalDetail(index: number) {
            useInvoiceStore().removeAdditionalDetail(index)
        },
        checkLastData() {
            useInvoiceStore().checkLastAdditionalDetail()
        },
        notLastOne(index: number) {
            return index !== this.additionalFields.length - 1
        }
    },
    computed: {
        additionalFields(): AdditionalDetail[] {
            return useInvoiceStore().getAdditionalDetails()
        }
    },
    mounted:function(){
        if (this.additionalFields.length == 0) {
            useInvoiceStore().addAdditionalDetail()
        }
    }
}
</script>