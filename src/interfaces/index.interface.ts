export interface EmissionPoint {
    id: number | null,
    code: string,
    establishment_id: number | null,
    createdAt: string | null,
    updatedAt: string | null,
    deletedAt: string | null
}

export interface Establishment {
    id: number | null,
    uuid: string | null,
    name: string,
    address: string | null,
    institution_id: number,
    createdAt: string | null,
    updatedAt: string | null,
    deletedAt: string | null
}

export interface Organization {
    id: number,
    uuid: string,
    name: string,
    ruc: string,
    address: string | null,
    hasToAccounting: boolean,
    abbreviation: string,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null
}

export interface Customer {
    id: number | null,
    uuid: string | null,
    fullName: string,
    address: string | null,
    identificationType: string,
    identification: string,
    emails: string[],
    phones: string[],
    createdAt: string | null,
    updatedAt: string | null,
    deletedAt: string | null
}

export interface ProductLabel {
    uuid: string,
    value_tag: string,
}

export interface Product {
    id: number | null,
    uuid: string,
    name: string,
    code: string,
    tags: ProductLabel[],
    price: string,
    hasIva: boolean,
    percentageCode: number | null,
    institution_id: number,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null
}

export interface Pagination {
    page: number
    itemsPerPage: number
    orderKey: string
    orderType: string
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
    uniqueId: number,
    paymentMethod: string | null,
    total: string | null,
    term: string | null,
    timeUnit: string | null
}

export interface InvoiceInfo {
    issueDate:string | null,
    establishmentAddress:string | null,
    specialTaxpayer:string | null,
    accountingObligation:boolean,
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
    auxiliaryCode: string | null,
    description: string | null,
    unitOfMeasure: string | null,
    quantity: string | null,
    unitPrice: string | null,
    priceWithoutSubsidy: string | null,
    discount: string | null,
    totalPriceWithoutTax: string | null,
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
    name: string | null,
    value: string | null
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
    value: string | number | null,
    editable: boolean,
    error: null | string,
}

export interface DetailFieldItems {
    uniqueId: number,
    code: DetailField,
    quantity: DetailField,
    description: DetailField,
    additionalDetail: DetailField,
    unitPrice: DetailField,
    discount: DetailField,
    totalPrice: DetailField,
    productObject: Product | null,
    posibleProducts: Product[],
    posibleProductLoading: boolean,
    searchProduct: string
}
