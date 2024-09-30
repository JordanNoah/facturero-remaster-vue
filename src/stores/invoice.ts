import { AdditionalDetail, Customer, DetailField, DetailFieldItems, Invoice, InvoiceInfo, Organization, Payment } from '@/interfaces/index.interface'
import { defineStore } from 'pinia'

type AllowedInvoiceInfoField = keyof InvoiceInfo
type FieldName = 'code' | 'quantity' | 'description' | 'additionalDetail' | 'unitPrice' | 'discount' | 'totalPrice';

export const useInvoiceStore = defineStore('invoice', {
  state: (): { invoiceEditing: Invoice, detailFields: DetailFieldItems[], establishment: string, emissionPoint: string } => ({
    invoiceEditing: {
      invoiceInfo: {
        issueDate: new Date().toLocaleString(),
        establishmentAddress: null,
        specialTaxpayer: null,
        accountingObligation: false,
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
    detailFields: [],
    establishment: '001',
    emissionPoint: '001'
  }),
  actions: {
    setInvoiceOrganizationDataToFinancialInformation (organization: Organization) {
      this.invoiceEditing.financialInformation.businessName = organization.name
      this.invoiceEditing.financialInformation.taxId = organization.ruc
      this.invoiceEditing.financialInformation.headquartersAddress = organization.address
      this.invoiceEditing.invoiceInfo.accountingObligation = organization.hasToAccounting
    },
    getInvoiceFinancialInformation () {
      let organization = {
        businessName: this.invoiceEditing.financialInformation.businessName,
        taxId: this.invoiceEditing.financialInformation.taxId,
        headquartersAddress: this.invoiceEditing.financialInformation.headquartersAddress,
        accountingObligation: this.invoiceEditing.invoiceInfo.accountingObligation
      }
      return organization
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
        uniqueId: date,
        code: { ref: `${date}/code`, value: null, editable: true, error: null, },
        quantity: { ref: `${date}/quantity`, value: 0, editable: true, error: null },
        description: { ref: `${date}/description`, value: null, editable: true, error: null },
        additionalDetail: { ref: `${date}/additionalDetail`, value: null, editable: true, error: null },
        unitPrice: { ref: `${date}/unitPrice`, value: 0.0000, editable: true, error: null },
        discount: { ref: `${date}/discount`, value: 0.0000, editable: true, error: null },
        totalPrice: { ref: `${date}/totalPrice`, value: 0.0000, editable: false, error: null },
        productObject: null,
        posibleProducts: [],
        posibleProductLoading: false,
        searchProduct: ''
      }
      this.detailFields.push(newField)
    },
    allEmptyField (detailFieldItems: DetailFieldItems) {
      let hasEmptyField = true
      for (let i = 0; i < Object.values(detailFieldItems).length; i++) {
        const element = Object.values(detailFieldItems)[i]
        const key = Object.keys(detailFieldItems)[i]
        if (key === 'code' || key === 'quantity' || key === 'description' || key === 'additionalDetail' || key === 'unitPrice' || key === 'discount' || key === 'totalPrice') {
          if (element.value != null && element.value !== '' && element.value !== 0 && element.value !== undefined) {
            hasEmptyField = false
            break
          }
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
    },
    getEstablishment() {
      return this.establishment
    },
    getEmissionPoint() {
      return this.emissionPoint
    },
    getEmissionDate() {
      return this.invoiceEditing.invoiceInfo.issueDate
    },
    getAdditionalDetails() {
      return this.invoiceEditing.additionalDetails
    },
    setClientDataToInvoice (client: Customer | null) {
      if (client) {
        this.invoiceEditing.invoiceInfo.buyerBusinessName = client.fullName
        this.invoiceEditing.invoiceInfo.buyerIdentification = client.identification
        this.invoiceEditing.invoiceInfo.buyerAddress = client.address
        this.invoiceEditing.invoiceInfo.buyerIdentificationType = client.identificationType
      }else{
        this.invoiceEditing.invoiceInfo.buyerBusinessName = null
        this.invoiceEditing.invoiceInfo.buyerIdentification = null
        this.invoiceEditing.invoiceInfo.buyerAddress = null
        this.invoiceEditing.invoiceInfo.buyerIdentificationType = null
      }
    },
    checkIfNeedNewDetailField () {
      const detailField = this.detailFields[this.detailFields.length - 1]
      if (!this.allEmptyField(detailField)) {
        this.addDetailField()
      }
    },
    addAdditionalDetail () {
      const newAdditionalDetail:AdditionalDetail = {name: null, value: null}
      this.invoiceEditing.additionalDetails.push(newAdditionalDetail)
    },
    removeAdditionalDetail(index: number) {
      this.invoiceEditing.additionalDetails.splice(index, 1)
    },
    checkLastAdditionalDetail () {
      const lastAdditionalDetail = this.invoiceEditing.additionalDetails[this.invoiceEditing.additionalDetails.length - 1]
      
      if (lastAdditionalDetail.name !== null || lastAdditionalDetail.value !== null) {
        this.addAdditionalDetail()
      }
    },
    getPaymentMethods () {
      return this.invoiceEditing.invoiceInfo.payments
    },
    addPaymentMethod () {
      this.invoiceEditing.invoiceInfo.payments.push({
        uniqueId: Math.floor(new Date().getTime() / 1000),
        paymentMethod: null,
        term: null,
        timeUnit: null,
        total: null
      })
    },
    checkIfNeedNewPaymentMethod () {
      if (this.invoiceEditing.invoiceInfo.payments.length === 0) {
        this.addPaymentMethod()
      } else {
        const paymentMethod = this.invoiceEditing.invoiceInfo.payments[this.invoiceEditing.invoiceInfo.payments.length - 1]
        if (paymentMethod.paymentMethod !== null || paymentMethod.term !== null || paymentMethod.timeUnit !== null || paymentMethod.total !== null) {
          this.addPaymentMethod()
        }
      }
    },
    removePaymentMethod (item: Payment) {
      const index = this.invoiceEditing.invoiceInfo.payments.findIndex(payment => payment.uniqueId === item.uniqueId)
      this.invoiceEditing.invoiceInfo.payments.splice(index, 1)
      if (this.invoiceEditing.invoiceInfo.payments.length === 0) {
        this.addPaymentMethod()
      }
    },
    mapDetailFieldsToInvoiceNeeds () {      
      for (let i = 0; i < this.detailFields.length; i++) {
        const detailField = this.detailFields[i]
        this.invoiceEditing.details.push({
          auxiliaryCode: detailField.code.value ? detailField.code.value.toString() : null,
          description: detailField.description.value ? detailField.description.value.toString() : null,
          discount: detailField.discount.value ? detailField.discount.value.toString() : null,
          quantity: detailField.quantity.value ? detailField.quantity.value.toString() : null,
          unitPrice: detailField.unitPrice.value ? Number(detailField.unitPrice.value).toFixed(2) : null,
          mainCode: (detailField.code.value!).toString(),
          priceWithoutSubsidy: Number(detailField.totalPrice.value).toFixed(2),
          totalPriceWithoutTax: Number(detailField.totalPrice.value).toFixed(2),
          additionalDetails: [],
          taxes: [],
          unitOfMeasure: '--'
        })
      }
    },
    setInvoiceTotals () {
      for (let i = 0; i < this.invoiceEditing.details.length; i++) {
        const detailField = this.invoiceEditing.details[i]
        
      }
    }
  },
})
