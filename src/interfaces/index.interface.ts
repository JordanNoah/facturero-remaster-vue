export interface Pagination {
    page: number
    itemsPerPage: number
    sortBy: string
    typeSort: string
    search?: string
}

export interface DataTableOptions {
    page: number;
    itemsPerPage: number;
    sortBy: string[];
    sortDesc: boolean[];
    groupBy?: string[];
    groupDesc?: boolean[];
    multiSort?: boolean;
    mustSort?: boolean;
}

export interface FinancialInformation {
    environment: string | null,
    issueType: string | null,
    businessName: string | null,
    tradeName: string | null,
    taxId: string | null,
    accessKey: string | null,
    docCode: string | null,
    establishment: string | null,
    emissionPoint: string | null,
    sequential: string | null,
    headquartersAddress: string | null,
    withholdingAgent: string | null,
    rimpeTaxpayer: string | null,
}

export interface TotalWithTax {
    code: string,
    percentageCode: string,
    additionalDiscount: string,
    taxableBase: string,
    rate: string,
    value: string,
    taxRefundValue: string
}

export interface Compensation {
    code: string,
    rate: string,
    value: string
}

export interface Payment {
    paymentMethod: string,
    total: string,
    term: string,
    timeUnit: string
}

export interface InvoiceInfo {
    issueDate:string | null,
    establishmentAddress:string | null,
    specialTaxpayer:string | null,
    accountingObligation:string | null,
    foreignTrade:string | null,
    incoTermInvoice:string | null,
    incoTermLocation:string | null,
    countryOfOrigin:string | null,
    portOfShipment:string | null,
    portOfDestination:string | null,
    destinationCountry:string | null,
    acquisitionCountry:string | null,
    buyerIdentificationType:string | null,
    deliveryNote:string | null,
    buyerBusinessName:string | null,
    buyerIdentification:string | null,
    buyerAddress:string | null,
    totalWithoutTaxes:string | null,
    totalSubsidy:string | null,
    incoTermTotalWithoutTaxes:string | null,
    totalDiscount:string | null,
    reimbursementDocCode:string | null,
    totalReimbursementInvoices:string | null,
    totalReimbursementTaxableBase:string | null,
    totalReimbursementTax:string | null,
    tip:string | null,
    internationalFreight:string | null,
    internationalInsurance:string | null,
    customsExpenses:string | null,
    otherTransportExpenses:string | null,
    totalAmount:string | null,
    currency:string | null,
    plate:string | null,
    vatWithheldValue:string | null,
    incomeTaxWithheldValue:string | null,
    totalWithTaxes:TotalWithTax[],
    compensations:Compensation[],
    payments:Payment[]
}

export interface DetailTax {
    code: string,
    percentageCode: string,
    rate: string,
    taxableBase: string,
    value: string
}

export interface DetailAdditionalDetail {
    name: string,
    value: string
}

export interface Detail {
    mainCode: string,
    auxiliaryCode: string,
    description: string,
    unitOfMeasure: string,
    quantity: string,
    unitPrice: string,
    priceWithoutSubsidy: string,
    discount: string,
    totalPriceWithoutTax: string,
    additionalDetails: DetailAdditionalDetail[],
    taxes: DetailTax[]
}

export interface ReimbursementTax {
    code: string,
    percentageCode: string,
    rate: string,
    reimbursementTaxableBase: string,
    reimbursementTax: string
}

export interface ReimbursementCompensation {
    code: string,
    rate: string,
    value: string
}

export interface Reimbursement {
    reimbursementProviderIdentificationType:string,
    reimbursementProviderIdentification:string,
    reimbursementProviderCountryCode:string,
    reimbursementProviderType:string,
    reimbursementDocCode:string,
    reimbursementDocEstablishment:string,
    reimbursementDocEmissionPoint:string,
    reimbursementDocSequential:string,
    reimbursementDocIssueDate:string,
    reimbursementDocAuthorizationNumber:string,
    taxDetails: ReimbursementTax[],
    reimbursementCompensations: ReimbursementCompensation[]
}

export interface WithHolding {
    code: string,
    percentageCode: string,
    rate: string,
    value: string,
}

export interface AdditionalDetail {
    name: string,
    value: string
}

export interface Invoice {
    financialInformation: FinancialInformation,
    invoiceInfo: InvoiceInfo,
    details: Detail[],
    reimbursements: Reimbursement[],
    withHoldings: WithHolding[],
    additionalDetails: AdditionalDetail[]
}

export interface DetailField {
    ref: string,
    value: number | null,
    editable: boolean,
    error: null | string,
}

export interface DetailFieldItems {
    code: DetailField,
    quantity: DetailField,
    description: DetailField,
    additionalDetail: DetailField,
    unitPrice: DetailField,
    discount: DetailField,
    totalPrice: DetailField,
}
