<!-- eslint-disable vue/html-self-closing -->
<template>
  <v-container>
    <v-card>
      <v-container>
        <v-row>
          <v-col cols="6">
            <div class="px-2">
              <v-img height="130" src="@/assets/example.jpg" />
            </div>
            <div class="px-2 mt-1 border-sm" style="min-height: 166px !important;" variant="outlined">
              <div>
                <span>
                  R.U.C.: 123456789
                </span>
              </div>
              <div>
                <span>
                  DULCAFE S.A
                </span>
              </div>
              <div>
                <span>
                  Dir. Matriz: Av. 9 de Octubre 1234
                </span>
              </div>
              <div>
                <span>
                  Dir AV CARLOS JULIO AROSEMENA, UNIVERSIDAD CATOLICA
                </span>
              </div>
              <div>
                <span>
                  Contribuyente Especial Resolución 1477
                </span>
              </div>
              <div>
                <span>
                  OBLIGADO A LLEVAR CONTABILIDAD: SI
                </span>
              </div>
            </div>
          </v-col>
          <v-col cols="6">
            <div class="border-sm px-2 py-1" style="min-height: 300px;">
              <div>
                <span>
                  FACTURA
                </span>
              </div>
              <div>
                <span>
                  No. 001-001-000000001
                </span>
              </div>
              <div>
                <span>
                  NÚMERO DE AUTORIZACIÓN
                </span>
              </div>
              <div>
                <span>
                  0407202401099210689100120250500004102801234567816
                </span>
              </div>
              <div>
                <span>
                  FECHA Y HORA DE AUTORIZACIÓN 04/07/2024 00:00:00
                </span>
              </div>
              <div>
                <span>
                  AMBIENTE: PRUEBAS
                </span>
              </div>
              <div>
                <span>
                  EMISIÓN: NORMAL
                </span>
              </div>
              <div>
                <div>
                  CLAVE DE ACCESO
                </div>
                <div>
                  <v-img class="barcode-img" :src="barcodeSrc" />
                </div>
              </div>
            </div>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <div class="border-sm px-2 py-1 d-flex">
              <div style="width: 50%;">
                <div>
                  <span>
                    RAZÓN SOCIAL / NOMBRES Y APELLIDOS: JORDAN JOSUE UBILLA MENDOZA
                  </span>
                </div>
                <div>
                  <span>
                    Fecha Emisión: 04/07/2024
                  </span>
                </div>
              </div>
              <div class="pl-3" style="width: 50%;">
                <div>
                  <span>
                    RUC/CI: 1719921234
                  </span>
                </div>
                <div>
                  <span>
                    Guía Remisión:
                  </span>
                </div>
              </div>
            </div>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <div class="border-sm py-1">
              <TableDetails />
            </div>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6">
            <div class="border-sm px-2 py-1" style="height: 100%;">
              Información Adicional
              <div>
                <span>
                  Email: soutjordan@gmail.com
                </span>
              </div>
            </div>
          </v-col>
          <v-col cols="6">
            <div class="border-sm px-2 py-1">
              <div>
                <span>
                  Subtotal 15%: 0.00
                </span>
              </div>
              <div>
                <span>
                  Subtotal 0%: 0.00
                </span>
              </div>
              <div>
                <span>
                  Subtotal No Objeto IVA: 0.00
                </span>
              </div>
              <div>
                <span>
                  Subtotal SIN IMPUESTO: 0.00
                </span>
              </div>
              <div>
                <span>
                  DESCUENTO: 0.00
                </span>
              </div>
              <div>
                <span>
                  ICE: 0.00
                </span>
              </div>
              <div>
                <span>
                  IVA 15%: 0.00
                </span>
              </div>
              <div>
                <span>
                  PROPINA: 0.00
                </span>
              </div>
              <div>
                <span>
                  VALOR TOTAL: 0.00
                </span>
              </div>
            </div>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6">
            <div class="border-sm py-1">
              <TablePaymentMethods />
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-container>
</template>

<script setup>
  import { ref } from 'vue'
  import JsBarcode from 'jsbarcode'

  const barcodeValue = ref('0407202401099210689100120250500004102801234567816')
  const barcodeSrc = ref('')

  // Función para generar el código de barras
  const generateBarcode = () => {
    // Crear un elemento canvas
    const canvas = document.createElement('canvas')

    // Generar el código de barras en el canvas
    JsBarcode(canvas, barcodeValue.value, {
      format: 'CODE128',
      lineColor: '#000',
      displayValue: true,
      flat: true,
      height: 50,
    })

    // Convertir el canvas a una imagen base64
    barcodeSrc.value = canvas.toDataURL('image/png')
  }
  generateBarcode()
</script>

<script>
  export default {
    name: 'Invoice',
    data: () => ({}),
  }
</script>

<style scoped>
.barcode-container {
  width: 100%;
  max-width: 300px;
}
</style>
