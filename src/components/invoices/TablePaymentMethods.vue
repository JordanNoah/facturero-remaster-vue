<template>
  <v-data-table density="compact" :headers="invoiceTablePaymentsHeaders" hide-default-footer :items="invoiceTablePaymentsItems">
    <template #item.paymentMethod="{ item }">
      <span v-if="item.paymentMethod.value && !item.paymentMethod.editable">{{ item.paymentMethod.value }}</span>
      <v-text-field
        v-else
        v-model="item.paymentMethod.value"
        class="mt-1"
        dense
        density="compact"
        hide-details="auto"
      />
    </template>
    <template #item.value="{ item }">
      <span v-if="item.value.value && !item.value.editable">{{ item.value.value }}</span>
      <v-text-field
        v-else
        v-model="item.value.value"
        class="mt-1"
        dense
        density="compact"
        hide-details="auto"
      />
    </template>
    <template #item.term="{ item }">
      <span v-if="item.term.value && !item.term.editable">{{ item.term.value }}</span>
      <v-text-field
        v-else
        v-model="item.term.value"
        class="mt-1"
        dense
        density="compact"
        hide-details="auto"
      />
    </template>
    <template #item.total="{ item }">
      <span>{{ item.total.value }}</span>
    </template>
  </v-data-table>
</template>

<script>
  export default {
    data: () => ({
      invoiceTablePaymentsHeaders: [
        { title: 'Forma de Pago', key: 'paymentMethod', sortable: false },
        { title: 'Valor', key: 'value', sortable: false },
        { title: 'Plazo', key: 'term', sortable: false },
        { title: 'Total', key: 'total', sortable: false },
      ],
      invoiceTablePaymentsItems: [
        { paymentMethod: { value: null, editable: true }, value: { value: null, editable: true }, term: { value: null, editable: true }, total: { value: 0.00, editable: true } },
      ],
    }),
  }
</script>
