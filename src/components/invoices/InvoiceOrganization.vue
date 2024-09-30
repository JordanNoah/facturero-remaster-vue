<template>
    <div>
        <div>
            <v-img height="130" src="@/assets/example.jpg" />
        </div>
        <div>
            <div>
                <span>
                    R.U.C.: {{ organization.taxId }}
                </span>
            </div>
            <div>
                <span>
                    {{ organization.businessName }}
                </span>
            </div>
            <div>
                <span>
                    {{ organization.headquartersAddress }}
                </span>
            </div>
            <div>
                <span>
                    Contribuyente Especial Resolución 1477
                </span>
            </div>
            <div>
                <span>
                    OBLIGADO A LLEVAR CONTABILIDAD: {{ organization.accountingObligation ? 'SI' : 'NO' }}
                </span>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { useInvoiceStore } from '@/stores/invoice'

export default {
    computed: {
        organization(){
            return useInvoiceStore().getInvoiceFinancialInformation()
        }
    },
    mounted() {
        this.getInvoiceOrganization()
    },
    methods: {
        async getInvoiceOrganization() {
            const response = await this.$getOrganizationByUuid('c97143aa-0dd3-44ad-b786-bf8cccf5baaf');
            if (response.status === 200){
                let organization = {
                    abbreviation: response.data.abbreviation,
                    address: response.data.address,
                    id: response.data.id,
                    name: response.data.name,
                    ruc: response.data.ruc,
                    createdAt: response.data.createdAt,
                    deletedAt: response.data.deletedAt,
                    updatedAt: response.data.updatedAt,
                    hasToAccounting: response.data.hasToAccounting,
                    uuid: response.data.uuid,
                }
                useInvoiceStore().setInvoiceOrganizationDataToFinancialInformation(organization)
            }
        },
    }
}

</script>