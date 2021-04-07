<template>
  <q-card class="secundo">
    <q-card-section class="primo text-white text-h6 q-pa-md text-center">
      Generate Abbreviations TOC (XML Code)
    </q-card-section>
    <q-card-section>
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
          :options="filteredPrograms"
          class="row q-mb-md at-input"
        />
        <q-file
        v-model="file"
        class="at-input"
        filled
        label="Select Prodticket HTML File"
        accept=".html"
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
          label="Download Abbreviations XML"
          no-caps
          class="bg-positive text-white q-mr-md"
          @click="downloadResult(null, `${articleID}_abbreviations.xml`)"
        />
      </q-card-section>
    </template>
  </q-card>
</template>

<script>
import buildOutput from '../../mixins/buildOutput'
import programOptions from 'src/mixins/programOptions'
import downloadResult from 'src/mixins/downloadResult'
import tryCatch from 'src/mixins/tryCatch'
import articles from '../../../logic/articles'
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
    },
    filteredPrograms() {
        return this.productTypeOptions.filter(item => item != 'Clinical Brief')
    }
  },
  methods: {
    build(ticket) {
        let abbreviationsXML = null
        let abbreviationsHTML = null
        const createAbbrev = () => {
            abbreviationsHTML = prodticket.getAbbreviations(ticket, this.program)

            if (abbreviationsHTML instanceof Error) {
                throw abbreviationsHTML;
            } else if (!abbreviationsHTML) {
                throw new Error("Something went wrong when searching for abbreviations!");
            } else {
                abbreviationsXML = utils.xmlOps.objectToXMLString(articles.articleUtils.buildAbbreviations(abbreviationsHTML, this.program).toObjectLiteral());
            }
            this.fileOutput = abbreviationsXML
        }
        this.tryCatch(createAbbrev)
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