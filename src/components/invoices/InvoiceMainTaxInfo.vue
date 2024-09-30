<template>
    <div>
        <div>
            FACTURA
        </div>
        <div>
            <span>
                No. {{ invoiceNumber }}
            </span>
        </div>
        <div>
            <div>
                NÚMERO DE AUTORIZACIÓN
            </div>
            <span>
                {{ accessKey }}
            </span>
        </div>
        <div>
            <div>
                FECHA Y HORA DE EMISIÓN
            </div>
            <span>
                {{ emissionDate }}
            </span>
        </div>
        <div>
            <span>
                AMBIENTE {{ environment === 1 ? 'PRUEBAS' : 'PRODUCCIÓN' }}
            </span>
        </div>
        <div>
            <span>
                TIPO DE EMISIÓN {{ issueType === 1 ? 'NORMAL' : 'CONTINGENCIA' }}
            </span>
        </div>
        <div>
            <vue-barcode :value="accessKey" :options="{ height: 30, background: 'transparent', lineColor: lineColor }"></vue-barcode>
        </div>
    </div>
</template>

<script lang="ts">
import { useInvoiceStore } from '@/stores/invoice'
import VueBarcode from '@chenfengyuan/vue-barcode'

export default {
    data: () => ({
        invoiceNumber: null,
        accessKey: '123456',
        emissionDate: '',
        environment: 1,
        issueType: 1,
        lineColor: '#000'
    }),
    components: {
        VueBarcode
    },
    computed:{
        currentTheme() {
            return this.$vuetify.theme.global.name;
        },
    },
    watch:{
        currentTheme(newVal, oldVal) {
            this.setLineColor()
        },
    },
    mounted() {
        this.getInvoiceNumber()
        this.generateAccessKey()
        this.generateEmissionDate()
        this.updateEmissionDate()
        this.setLineColor()
    },
    methods: {
        async getInvoiceNumber() { 
            const establishment = useInvoiceStore().getEstablishment()
            const emissionPoint = useInvoiceStore().getEmissionPoint()
            const response = await this.$getNextInvoiceNumber(1,establishment, emissionPoint)
            
            if (response.status === 200) {
                this.invoiceNumber = response.data
            }
        },
        generateAccessKey() {
            const date = new Date()
            let secuence = (date.getTime()).toString()
            for (let i = 0; i < (55-secuence.length); i++) {
                secuence += Math.floor(Math.random() * 10)
            }
            this.accessKey = secuence
        },
        generateEmissionDate() {
            // Create a new date object
            let currentDate = new Date();

            // Get the parts of the date
            let day = currentDate.getDate();
            let month = currentDate.getMonth() + 1; // Months start from 0, so we add 1
            let year = currentDate.getFullYear();

            // Get the parts of the time
            let hours = String(currentDate.getHours()).padStart(2, '0');
            let minutes = String(currentDate.getMinutes()).padStart(2, '0');
            let seconds = String(currentDate.getSeconds()).padStart(2, '0');
            
            // Format the date and time in the desired format
            this.emissionDate = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
        },
        updateEmissionDate() {
            setInterval(() => {
                this.generateEmissionDate()
            }, 1000)
        },
        setLineColor() {
            if (this.currentTheme === 'dark') {
                this.lineColor = '#fff'
            } else if (this.currentTheme === 'light') {
                this.lineColor = '#000'
            }
        }
    }
}
</script>