<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1>Products</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-form ref="formRef">
          <v-text-field v-if="isUpdate" readonly v-model="uuid"></v-text-field>
          <v-text-field v-model="name" label="Nombre" :rules="rulesName"></v-text-field>
          <v-text-field v-model="code" label="Codigo"></v-text-field>
          <v-combobox
            v-model="tags"
            label="Etiquetas"
            multiple
            :items="availableItems"
            item-title="name"
            hide-selected
            hide-no-data
            @keydown.enter.prevent="onEnter"
            @update:search="onInput"
          >
            <template v-slot:selection="data">
              <v-chip
                :key="data.item.value.uuid"
                closable
                @click:close="removeItem(data.item.value)"
                label
              >
                {{ data.item.value.value_tag }}
              </v-chip>
            </template>
          </v-combobox>
          <v-text-field v-model="price" label="Precio Unitario" prefix="$"></v-text-field>
          <v-switch v-model="has_iva" :label="hasIvaText()" hide-details inset></v-switch>
          <v-select
            v-model="precentSelect"
            :items="precentIva"
            item-title="text"
            label="Porcetanje IVA"
            return-object
            v-if="has_iva"
          ></v-select>
          <v-text-field v-model="createdAt" label="Creado el" v-if="isUpdate" readonly></v-text-field>
          <v-text-field v-model="updatedAt" label="Actualizado el" v-if="isUpdate" readonly></v-text-field>
          <div class="d-flex justify-end">
            <v-btn class="mr-2">
              <v-icon>mdi-delete-outline</v-icon>
            </v-btn>
            <v-btn class="mr-2"> Cancel </v-btn>
            <v-btn @click="sendProduct()"> {{ messageButton() }} </v-btn>
          </div>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { v4 as uuidv4 } from 'uuid';
import { Product, ProductLabel } from '@/interfaces/index.interface';

interface RouteParams {
  uuid?: string;
}

export default defineComponent({
  setup() {
    const route = useRoute();
    const router = useRouter();
    const productService = getCurrentInstance()?.appContext.config.globalProperties;

    const params = route.params as RouteParams;
    const uuid = ref(params.uuid ?? '');
    const isUpdate = ref(false);
    const availableItems = ref<ProductLabel[]>([]);
    const search = ref('');
    const id = ref<number | null>(null);
    const name = ref('');
    const code = ref('');
    const tags = ref<ProductLabel[]>([]);
    const price = ref('0.0000');
    const has_iva = ref(false);
    const precentSelect = ref<{ text: string; code: number; } | null>(null);
    const precentIva = ref([
      { text: "0%", code: 0 },
      { text: "12%", code: 2 },
      { text: "14%", code: 3 },
      { text: "15%", code: 4 },
      { text: "5%", code: 5 },
      { text: "13%", code: 10 }
    ]);
    const institution_id = ref<number>(1);
    const createdAt = ref('');
    const updatedAt = ref('');
    const deletedAt = ref<string | null>('');

    const rulesName = [
      (v: string | undefined) => !!v || 'Name is required'
    ];

    const formRef = ref<HTMLFormElement | null>(null);

    onMounted(() => {
      if (params.uuid !== 'newProduct') {
        getProduct();
      }
    });

    const getProduct = async () => {
      isUpdate.value = true;
      const response = await productService!.$getProductByUuid(uuid.value);
      if (response.status === 200) {
        const product: Product = response.data;


        id.value = 0;
        uuid.value = product.uuid;
        name.value = product.name;
        code.value = product.code;
        tags.value = product.tags;
        price.value = product.price;
        has_iva.value = product.hasIva;
        precentSelect.value = precentIva.value.find(item => item.code === product.percentageCode) ?? null;
        institution_id.value = product.institution_id;
        createdAt.value = product.createdAt;
        updatedAt.value = product.updatedAt;
        deletedAt.value = product.deletedAt;
      }
    };

    const messageButton = () => {
      return isUpdate.value ? 'Update' : 'Create';
    };

    const addLabel = () => {
      if (search.value.trim()) {
        const label: ProductLabel = {
          uuid: uuidv4(),
          value_tag: search.value,
        };

        const filteredArray = tags.value.filter(item => typeof item === 'object' && item !== null);
        tags.value = filteredArray;

        tags.value.push(label);
        search.value = '';
      }
    };

    const hasIvaText = () => {
      return has_iva.value ? 'Posee IVA' : 'No posee IVA';
    };

    const onInput = (val: string) => {
      search.value = val;
    };

    const onEnter = () => {
      if (search.value.trim()) {
        addLabel();
      }
    };

    const removeItem = (item: ProductLabel) => {
      const index = tags.value.findIndex(label => label.uuid === item.uuid);
      if (index >= 0) {
        tags.value.splice(index, 1);
      }
    };

    const sendProduct = async () => {
      const product: Product = {
        id: null,
        uuid: uuid.value,
        name: name.value,
        code: code.value,
        tags: tags.value,
        price: price.value,
        hasIva: has_iva.value,
        percentageCode: precentSelect.value!.code,
        institution_id: 1,
        createdAt: createdAt.value,
        updatedAt: updatedAt.value,
        deletedAt: deletedAt.value,
      };
      console.log(product);
      console.log(formRef.value);
      
      if (formRef.value) {
        const valid = await (formRef.value as any).validate();
        console.log(valid);
        
        if (valid.valid) {
          const response = await productService!.$postProduct(product);
          if (response.status === 200) {
            router.push('/products');
          }
        }
      }
    };

    return {
      uuid,
      isUpdate,
      availableItems,
      search,
      name,
      code,
      tags,
      price,
      has_iva,
      precentSelect,
      precentIva,
      createdAt,
      updatedAt,
      deletedAt,
      rulesName,
      messageButton,
      addLabel,
      hasIvaText,
      onInput,
      onEnter,
      removeItem,
      sendProduct,
      formRef
    };
  },
});
</script>