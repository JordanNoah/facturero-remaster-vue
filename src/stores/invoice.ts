import { DetailField, DetailFieldItems, Invoice, InvoiceInfo } from '@/interfaces/index.interface'
import { defineStore } from 'pinia'

type AllowedInvoiceInfoField = keyof InvoiceInfo
type FieldName = 'code' | 'quantity' | 'description' | 'additionalDetail' | 'unitPrice' | 'discount' | 'totalPrice';

export const useInvoiceStore = defineStore('invoice', {
  state: (): { invoiceEditing: Invoice, detailFields: DetailFieldItems[] } => ({
    invoiceEditing: {
      invoiceInfo: {
        issueDate: null,
        establishmentAddress: null,
        specialTaxpayer: null,
        accountingObligation: null,
        foreignTrade: null,
        incoTermInvoice: null,
        incoTermLocation: null,
        countryOfOrigin: null,
        portOfShipment: null,
        portOfDestination: null,
        destinationCountry: null,
        acquisitionCountry: null,
        buyerIdentificationType: null,
        deliveryNote: null,
        buyerBusinessName: null,
        buyerIdentification: null,
        buyerAddress: null,
        totalWithoutTaxes: null,
        totalSubsidy: null,
        incoTermTotalWithoutTaxes: null,
        totalDiscount: null,
        reimbursementDocCode: null,
        totalReimbursementInvoices: null,
        totalReimbursementTaxableBase: null,
        totalReimbursementTax: null,
        tip: null,
        internationalFreight: null,
        internationalInsurance: null,
        customsExpenses: null,
        otherTransportExpenses: null,
        totalAmount: null,
        currency: null,
        plate: null,
        vatWithheldValue: null,
        incomeTaxWithheldValue: null,
        totalWithTaxes: [],
        compensations: [],
        payments: [],
      },
      financialInformation: {
        environment: null,
        issueType: null,
        businessName: null,
        tradeName: null,
        taxId: null,
        accessKey: null,
        docCode: null,
        establishment: null,
        emissionPoint: null,
        sequential: null,
        headquartersAddress: null,
        withholdingAgent: null,
        rimpeTaxpayer: null,
      },
      details: [],
      additionalDetails: [],
      reimbursements: [],
      withHoldings: [],
    },
    detailFields: [
      {
        code: { ref: '0/code', value: null, editable: true, error: null },
        quantity: { ref: `0/quantity`, value: null, editable: true, error: null },
        description: { ref: `0/description`, value: null, editable: true, error: null },
        additionalDetail: { ref: `0/additionalDetail`, value: null, editable: true, error: null },
        unitPrice: { ref: `0/unitPrice`, value: null, editable: true, error: null },
        discount: { ref: `0/discount`, value: null, editable: true, error: null },
        totalPrice: { ref: `0/totalPrice`, value: 0.0000, editable: false, error: null },
      },
    ],
  }),
  actions: {
    setInvoiceInfoData (key: AllowedInvoiceInfoField, value: InvoiceInfo[AllowedInvoiceInfoField]) {
      // Verifica si el valor es un string o null (para campos de texto)
      if (typeof value === 'string' || value === null) {
        this.invoiceEditing.invoiceInfo[key] = value as any
      } else if (Array.isArray(value)) {
        this.invoiceEditing.invoiceInfo[key] = value as any
      } else {
        console.error(`Tipo de valor no manejado para la clave ${key}:`, value)
      }
    },
    setInvoiceDetailFields (details: any) {
      this.invoiceEditing.details = details
    },
    checkPosition (ref: string, fieldName: FieldName) {
      const index = this.detailFields.findIndex(field => field[fieldName].ref === ref)
      if (index === this.detailFields.length - 1) {
        const detailField: DetailFieldItems = { ...this.detailFields[index] }
        const allEmptyField = this.allEmptyField(detailField)
        if (!allEmptyField) {
          this.addDetailField()
        }
      }
    },
    addDetailField () {
      const date = Math.floor(new Date().getTime() / 1000)
      const newField = {
        code: { ref: `${date}/code`, value: null, editable: true, error: null },
        quantity: { ref: `${date}/quantity`, value: null, editable: true, error: null },
        description: { ref: `${date}/description`, value: null, editable: true, error: null },
        additionalDetail: { ref: `${date}/additionalDetail`, value: null, editable: true, error: null },
        unitPrice: { ref: `${date}/unitPrice`, value: null, editable: true, error: null },
        discount: { ref: `${date}/discount`, value: null, editable: true, error: null },
        totalPrice: { ref: `${date}/totalPrice`, value: 0.0000, editable: false, error: null },
      }
      this.detailFields.push(newField)
    },
    allEmptyField (detailFieldItems: DetailFieldItems) {
      let hasEmptyField = true
      for (let i = 0; i < Object.values(detailFieldItems).length; i++) {
        const element = Object.values(detailFieldItems)[i]
        if (element.value != null && element.value !== '' && element.value !== 0 && element.value !== undefined) {
          hasEmptyField = false
          break
        }
      }
      return hasEmptyField
    },
    deleteDetailField (fieldItem: DetailFieldItems) {
      const index = this.detailFields.findIndex(field => field.code.ref === fieldItem.code.ref)
      if (index === this.detailFields.length - 1) {
        this.detailFields.splice(index, 1)
        this.addDetailField()
      } else {
        this.detailFields.splice(index, 1)
      }
      console.log(index)
    },
  },
})
