<template>
  <q-card class="secundo">
    <q-card-section class="primo text-white text-h6 q-pa-md text-center">
      Generate Credit Statements (HTML Code)
    </q-card-section>
    <q-card-section class="text-center">
        <q-input
          filled
          stack-label
          label="Article ID"
          v-model="articleID"
          class="row q-mb-md at-input"
        />
        <q-select
          filled
          stack-label
          label="Select Product Type"
          v-model="productType"
          :options="productTypeOptions"
          class="row q-mb-md at-input"
        />
        <q-file
        v-model="file"
        class="at-input"
        filled
        label="Select Prodticket HTML File"
        accept=".html"
        @input="fileOutput = null"
      />
    </q-card-section>
    <q-separator />
    <q-card-section>
      <q-btn
        label="Go"
        no-caps
        :disable="missingData"
        class="q-ma-sm text-white"
        :class="missingData ? 'bg-negative' : 'bg-positive'"
        @click="generate"
      />
      <q-btn
        label="Reset"
        no-caps
        class="text-white bg-negative"
        @click="reset"
        :disable="!hasData"
      />
    </q-card-section>
    <template v-if="fileOutput">
      <q-separator />
      <q-card-section>
        <q-btn
          label="Download Credit Statements HTML"
          no-caps
          class="bg-positive text-white q-mr-md"
          @click="downloadResult(null, `${articleID}_credit-statements.html`)"
        />
      </q-card-section>
    </template>
  </q-card>
</template>

<script>
import buildOutput from '../../mixins/buildOutput'
import downloadResult from 'src/mixins/downloadResult'
import programOptions from 'src/mixins/programOptions'
import tryCatch from 'src/mixins/tryCatch'
import utils from '../../../logic/utils'
import prodticket from '../../../logic/prodticket'
export default {
  mixins: [buildOutput, programOptions, tryCatch, downloadResult],
  data() {
    return {
      articleID: '',
      file: null,
      fileOutput: null
    }
  },
  computed: {
    missingData() {
      return !this.articleID.length || !this.productType.length || !this.file
    },
    hasData() {
      return !!this.articleID.length || !!this.productType.length || !!this.file
    }
  },
  methods: {
    build(ticket) {
        let creditStatementsHTML = null
        let creditStatementsObject = null 
        const createCredit = () => {
            creditStatementsObject = prodticket.getCreditStatements(ticket, this.program)
    
            if (creditStatementsObject instanceof Error) {
                throw creditStatementsObject
            } else if (!creditStatementsObject) {
                throw new Error("Something went wrong when searching for credit statements!")
            } else {
                creditStatementsHTML = utils.printFunctions.printCreditStatements(creditStatementsObject)
            }
            this.fileOutput = creditStatementsHTML
        }
        this.tryCatch(createCredit)
    },
    reset() {
      this.articleID = ''
      this.file = null
      this.fileOutput = null
      this.productType = ''
    }
  }
}
</script>

<style>

</style>