<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <h1>Customers</h1>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12">
                <v-btn color="primary" @click="addCustomer()">Add Customer</v-btn>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12">
                <TableDetailCustomer></TableDetailCustomer>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import router from '@/router'
export default {
    data() {
        return {
            customers: [],
            search: ''
        }
    },
    methods: {
        addCustomer() {
            router.push('/customers/newCustomer')
        }
    }
}
</script>