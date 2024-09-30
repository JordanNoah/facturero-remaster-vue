<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <h1>Products</h1>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12">
                <v-btn color="primary" @click="addProduct">Add Product</v-btn>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12">
                <TableDetailProduct></TableDetailProduct>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import router from '@/router'
export default {
    data() {
        return {
            products: [],
            search: ''
        }
    },
    methods: {
        addProduct() {
            router.push('/products/newProduct')
        }
    }
}

</script>