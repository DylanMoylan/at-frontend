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
        :disable="!hasData"
      />
    </q-card-section>
    <template v-if="fileOutput">
      <q-separator />
      <q-card-section>
        <q-btn
          label="Download TOC XML"
          no-caps
          class="bg-positive text-white q-mr-md"
          @click="downloadResult(null, `${this.articleID}_toc.xml`)"
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
  components: { Editor },
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
      return !!this.articleID.length || !!this.file
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
        const createTOC = () => {
            components = prodticket.getComponents(ticket, this.program);
            if (components instanceof Error) {
                throw components;
            } else if (!components) {
                throw new Error("Something went wrong when searching for components!");
            } else {
                tocXML = utils.xmlOps.objectToXMLString(articles.articleUtils.buildTableOfContentsTOC(components, this.program).toObjectLiteral());
            }
            this.fileOutput = utils.cleanHTML.cleanEntities(tocXML)
        }
        this.tryCatch(createTOC, 'TOC comp')
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