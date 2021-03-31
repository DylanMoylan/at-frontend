<template>
  <q-card class="secundo">
    <q-card-section class="primo text-white text-h6 q-pa-md text-center">
      Generate Activity Component (XML Code)
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
        <div class="row full-width justify-start q-mb-md">
          <q-checkbox
            label="Is OUS"
            v-model="isOUS"
            dense
          />
        </div>
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
          label="Download Activity XML"
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
import tryCatch from 'src/mixins/tryCatch'
import articles from '../../../logic/articles'
import utils from '../../../logic/utils'

export default {
  mixins: [buildOutput, programOptions, tryCatch],
  data() {
    return {
      articleID: '',
      isOUS: false,
      file: null,
      fileOutput: null
    }
  },
  computed: {
    missingData() {
      return !this.articleID.length || !this.productType.length || !this.file
    },
    hasData(){
      return !!this.articleID.length || !!this.productType.length || !!this.file
    }
  },
  methods: {
    build(val) {
      const createAct = () => {
        if(this.program.codeName == 'brief'){
          this.fileOutput = utils.cleanHTML.cleanEntities(articles.activity.buildActivityCB(val, this.program))
        }else{
          this.fileOutput = utils.cleanHTML.cleanEntities(articles.activity.buildActivity(val, this.program))
        }
      }
      this.tryCatch(createAct)
    },
    downloadResult() {
      const href = `data:application/octet-stream;charset=utf-8;base64,${window.btoa(unescape(encodeURIComponent(this.fileOutput)))}`
      const download = `${this.articleID}_activity.xml`
      const link = document.createElement('a')
      link.href = href
      link.download = download
      link.click()
    },
    reset() {
      this.articleID = ''
      this.isOUS = false
      this.file = null
      this.fileOutput = null
      this.productType = ''
    }
  }
}
</script>

<style>

</style>