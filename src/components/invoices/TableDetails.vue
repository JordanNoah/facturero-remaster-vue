<template>
  <v-data-table density="compact" :headers="invoiceTableHeaders" hide-default-footer :items="invoiceTableItems">
    <template #item.code="{ item }">
      <span v-if="item.code.value && !item.code.editable">{{ item.code.value }}</span>
      <v-text-field
        v-else
        v-model="item.code.value"
        class="mt-1"
        density="compact"
        :error="hasError(item.code)"
        hide-details="auto"
        variant="outlined"
        @keydown.enter="handleEnter(item.code)"
        @keyup="checkPositon(item.code, 'code')"
      />
    </template>
    <template #item.quantity="{ item }">
      <span v-if="item.quantity.value && !item.quantity.editable">{{ item.quantity.value }}</span>
      <v-text-field
        v-else
        v-model="item.quantity.value"
        class="mt-1"
        density="compact"
        :error="hasError(item.quantity)"
        hide-details="auto"
        variant="outlined"
        @keydown.enter="handleEnter(item.quantity)"
        @keyup="filterInteger(item.quantity); checkPositon(item.quantity, 'quantity')"
      />
    </template>
    <template #item.description="{ item }">
      <span v-if="item.description.value && !item.description.editable">{{ item.description.value }}</span>
      <v-text-field
        v-else
        v-model="item.description.value"
        class="mt-1"
        density="compact"
        :error="hasError(item.description)"
        hide-details="auto"
        variant="outlined"
        @keydown.enter="handleEnter(item.description)"
        @keyup="checkPositon(item.description, 'description')"
      />
    </template>
    <template #item.additionalDetail="{ item }">
      <span v-if="item.additionalDetail.value && !item.additionalDetail.editable">{{ item.additionalDetail.value }}</span>
      <v-text-field
        v-else
        v-model="item.additionalDetail.value"
        class="mt-1"
        density="compact"
        :error="hasError(item.additionalDetail)"
        hide-details="auto"
        variant="outlined"
        @keydown.enter="handleEnter(item.additionalDetail)"
        @keyup="checkPositon(item.additionalDetail, 'additionalDetail')"
      />
    </template>
    <template #item.unitPrice="{ item }">
      <span v-if="item.unitPrice.value && !item.unitPrice.editable">{{ item.unitPrice.value }}</span>
      <v-text-field
        v-else
        v-model="item.unitPrice.value"
        class="mt-1"
        density="compact"
        :error="hasError(item.unitPrice)"
        hide-details="auto"
        variant="outlined"
        @keydown.enter="handleEnter(item.unitPrice)"
        @keyup="filterUnitPrice(item.unitPrice); checkPositon(item.unitPrice, 'unitPrice')"
      />
    </template>
    <template #item.discount="{ item }">
      <span v-if="item.discount.value && !item.discount.editable">{{ item.discount.value }}</span>
      <v-text-field
        v-else
        v-model="item.discount.value"
        class="mt-1"
        density="compact"
        :error="hasError(item.discount)"
        hide-details="auto"
        variant="outlined"
        @keydown.enter="handleEnter(item.discount)"
        @keyup="checkPositon(item.unitPrice, 'unitPrice')"
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

<script>
  import { useInvoiceStore } from '@/stores/invoice'
  export default {
    data: () => ({
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
    }),
    computed: {
      invoiceTableItems () {
        return useInvoiceStore().detailFields
      },
    },
    methods: {
      handleEnter (item) {
        if (item.value) {
          item.editable = false
          item.error = null
        } else {
          item.error = 'Campo requerido'
        }
      },
      hasError (item) {
        return item.error !== null
      },
      checkPositon (item, fieldName) {
        useInvoiceStore().checkPosition(item.ref, fieldName)
      },
      removeDetailField (item) {
        useInvoiceStore().deleteDetailField(item)
      },
      filterInteger (item) {
        // Elimina cualquier carácter no numérico
        item.value = item.value.replace(/[^0-9]/g, '')
      },
      filterUnitPrice (item) {
        // Permite solo números y un solo punto decimal
        const regex = /^\d*\.?\d{0,4}$/

        // Si el valor actual no coincide con la expresión regular, elimina caracteres no permitidos
        if (!regex.test(item.value)) {
          // Mantiene solo la parte válida de la entrada
          const validValue = item.value.match(/^\d*\.?\d{0,4}/)
          item.value = validValue ? validValue[0] : ''
        }
      },
      compositionMoney (value) {
        return `$ ${value}`
      },
    },
  }
</script>
