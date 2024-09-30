<template>
  <v-data-table class="pb-1" density="compact" :headers="invoiceTableHeaders" hide-default-footer :items="invoiceTableItems" color="transparent">
    <template #item.code="{ item }">
      <v-autocomplete 
        class="my-2"
        v-model="item.productObject"
        :items="item.posibleProducts"
        :loading="item.posibleProductLoading"
        :search-input="item.searchProduct"
        @update:search="onSearchProductInput($event,item, 'code')"
        @update:model-value="updatedSelect($event,item)"
        item-title="code"
        item-value="id"
        density="compact"
        hide-details
        hide-no-data
        no-filter
        return-object
      />
    </template>
    <template #item.quantity="{ item }">
      <v-text-field 
        class="my-2"
        v-model="item.quantity.value"
        density="compact"
        hide-details
      />
    </template>
    <template #item.description="{ item }">
      <v-autocomplete 
        class="my-2"
        v-model="item.productObject"
        :items="item.posibleProducts"
        :loading="item.posibleProductLoading"
        :search-input="item.searchProduct"
        @update:search="onSearchProductInput($event,item, 'name')"
        item-title="name"
        item-value="id"
        density="compact"
        hide-details
        hide-no-data
        no-filter
        return-object
      />
    </template>
    <template #item.additionalDetail="{ item }">
      <v-text-field
        class="my-2"
        v-model="item.additionalDetail.value"
        density="compact"
        hide-details
      />
    </template>
    <template #item.unitPrice="{ item }">
      <v-text-field
        class="my-2"
        v-model="item.unitPrice.value"
        density="compact"
        hide-details
      />
    </template>
    <template #item.discount="{ item }">
      <v-text-field 
        class="my-2"
        v-model="item.discount.value"
        density="compact"
        hide-details
      />
    </template>
    <template #item.totalPrice="{ item }">
      <span>{{ item.totalPrice.value }}</span>
    </template>
    <template #item.actions="{ item }">
      <v-icon @click="removeDetailField(item)">mdi-delete</v-icon>
    </template>
  </v-data-table>
</template>

<script lang="ts">
import { DetailFieldItems, Product } from '@/interfaces/index.interface';
import { useInvoiceStore } from '@/stores/invoice';

export default {
  data() {
    return{
      invoiceTableHeaders: [
        { title: 'Cod. Principal', key: 'code', sortable: false },
        { title: 'Cant', key: 'quantity', sortable: false },
        { title: 'Descripción', key: 'description', sortable: false },
        { title: 'Detalles Adicionales', key: 'additionalDetail', sortable: false },
        { title: 'Precio Unitario', key: 'unitPrice', sortable: false },
        { title: 'Descuento', key: 'discount', sortable: false },
        { title: 'Precio Total', key: 'totalPrice', sortable: false },
        { title: '', key: 'actions', sortable: false },
      ],
      posibleProducts: [],
      selectedProduct: null,
    }
  },
  mounted: function() {
    useInvoiceStore().addDetailField()
  },
  computed: {
    invoiceTableItems () {
      return useInvoiceStore().detailFields
    },
  },
  methods: {
    removeDetailField (item: DetailFieldItems) {
      useInvoiceStore().deleteDetailField(item)
    },
    async onSearchProductInput(searchValue:string,item: DetailFieldItems, type:string) {
      if (searchValue.length > 0) {
        item.posibleProductLoading = true
        const response = await this.$getProductByType(type, searchValue)
        item.posibleProducts = response.data
        item.posibleProductLoading = false
      }
    },
    updatedSelect(selected:Product,item: DetailFieldItems) {
      if(selected){
        const ivaCodes = [
          { text: "0%", code: 0, number: 0},
          { text: "12%", code: 2, number: 12},
          { text: "14%", code: 3, number: 14},
          { text: "15%", code: 4, number: 15},
          { text: "5%", code: 5, number: 5},
          { text: "13%", code: 10, number: 13}
        ];
        item.code.value = selected.code
        item.description.value = selected.name
        item.unitPrice.value = selected.price
        if (selected.hasIva) {
          const iva = ivaCodes.find((iva) => iva.code === selected.percentageCode)
          let addedIva = (Number(selected.price) * iva!.number) / 100
          item.totalPrice.value = Number(selected.price) + addedIva
        }else{
          item.totalPrice.value = selected.price
        }
        useInvoiceStore().mapDetailFieldsToInvoiceNeeds()
        useInvoiceStore().checkIfNeedNewDetailField()
      }else{
        item.code.value = null
        item.description.value = null
        item.unitPrice.value = 0.0000
        item.totalPrice.value = 0.0000
      }
    }
  }
}
</script>