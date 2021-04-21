<template>
  <q-card class="secundo">
    <q-card-section class="primo text-white text-h6 q-pa-md text-center">
      Generate References TOC (XML Code)
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
          :options="productTypeOptions"
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
          label="Download References XML"
          no-caps
          class="bg-positive text-white q-mr-md"
          @click="downloadResult(null, `${articleID}_references.xml`)"
        />
      </q-card-section>
      <q-separator />
      <q-card-section>
        <editor :output="fileOutput" buttons />
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
import Editor from '../shared/Editor.vue'

export default {
  mixins: [buildOutput, programOptions, tryCatch, downloadResult],
  components: { Editor },
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
        let referencesXML = null;
        let referencesHTML = null; 

        const createReference = () => {
            referencesHTML = prodticket.getReferences(ticket, this.program);
    
            if (referencesHTML instanceof Error) {
                throw referencesHTML;
            } else if (!referencesHTML) {
                throw new Error("Something went wrong when searching for references!");
            } else {
                referencesXML = utils.xmlOps.objectToXMLString(articles.articleUtils.buildReferences(referencesHTML, this.program).toObjectLiteral());
            }
            this.fileOutput = referencesXML
        }
        this.tryCatch(createReference, 'references')
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