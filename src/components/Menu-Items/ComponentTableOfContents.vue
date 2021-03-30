<template>
  <q-card class="secundo">
    <q-card-section class="primo text-white text-h6 q-pa-md text-center">
      Generate Multicomponent TOC (XML)
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
          :options="onlyFirstResponse"
          class="row q-mb-md at-input"
          emit-value
          map-options
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
      />
    </q-card-section>
    <template v-if="fileOutput">
      <q-separator />
      <q-card-section>
        <q-btn
          label="Download TOC XML"
          no-caps
          class="bg-positive text-white q-mr-md"
          @click="downloadResult"
        />
      </q-card-section>
    </template>
  </q-card>
</template>

<script>
import buildOutput from '../../mixins/buildOutput'
import programOptions from 'src/mixins/programOptions'
import articles from '../../../logic/articles'
import utils from '../../../logic/utils'
import prodticket from '../../../logic/prodticket'

export default {
  mixins: [buildOutput, programOptions],
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
    onlyFirstResponse() {
        return this.productTypeOptions.map(item => {
            return {
                label: item,
                value: item,
                disable: item == 'First Response' ? false : true
            }
        })
    }
  },
  methods: {
    build(ticket) {
        let tocXML = null;
        let components = null; 

        components = prodticket.getComponents(ticket, this.program);
        try {
            if (components instanceof Error) {
                throw components;
            } else if (!components) {
                throw new Error("Something went wrong when searching for components!");
            } else {
                tocXML = utils.xmlOps.objectToXMLString(articles.articleUtils.buildTableOfContentsTOC(components, this.program).toObjectLiteral());
            }
            this.fileOutput = utils.cleanHTML.cleanEntities(tocXML)
        } catch (error) {
            console.log('error: ', error);
            this.$q.dialog({
                message: error
            })
        }
    },
    downloadResult() {
      const href = `data:application/octet-stream;charset=utf-8;base64,${window.btoa(unescape(encodeURIComponent(this.fileOutput)))}`
      const download = `${this.articleID}_toc.xml`
      const link = document.createElement('a')
      link.href = href
      link.download = download
      link.click()
    },
    reset() {
      this.articleID = ''
      this.file = null
      this.fileOutput = null
    }
  },
  mounted() {
      this.productType = 'First Response'
  }
}
</script>

<style>

</style>