<template>
  <v-container max-width="400px">
    <div class="d-flex justify-end mb-2">
      <v-btn color="primary" @click="saveInvoice()">Guardar</v-btn>
    </div>
    <v-container class="border">
      <v-row class="border mb-1">
        <v-col cols="6">
          <InvoiceOrganization />
        </v-col>
        <v-col cols="6">
          <InvoiceMainTaxInfo />
        </v-col>
      </v-row>
      <v-row class="border mb-1">
        <v-col cols="12">
          <InvoiceClient />
        </v-col>
      </v-row>
      <v-row class="border mb-1">
        <v-col cols="12">
          <TableDetails />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6">
          <InvoiceFooter />
          <PaymentMethods />
        </v-col>
        <v-col cols="6">
          <InvoiceTotals />
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script lang="ts">
import { useInvoiceStore } from '@/stores/invoice';

export default {
  methods:{
    saveInvoice(){
      console.log(useInvoiceStore().detailFields);
    }
  }
}
</script>