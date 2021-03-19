<template>
  <q-card>
        <q-card-section class="bg-primary text-white text-h6 q-pa-md text-center">
            Generate Captions
        </q-card-section>
        <q-card-section>
            <div class="row justify-between">
                <q-input
                    filled
                    stack-label
                    label="Article ID"
                    v-model="articleID"
                    style="width:350px"
                    class="row q-ma-sm"
                />
                <q-select
                  filled
                  stack-label
                  label="Select Language"
                  :options="languageOptions"
                  v-model="language"
                  class="row q-ma-sm"
                  style="width:350px"
                  emit-value
                  map-options
                />
            </div>
        </q-card-section>
        <q-card-section>
            <q-file
                v-model="file"
                style="max-width:300px"
                filled
                label="Pick 1 File"
                class="q-ma-sm"
            />
            <div v-if="fileOutput" class="q-ma-sm">
              <q-btn 
                v-if="fileOutput.vttResult"
                label="Download .VTT"
                no-caps
                class="bg-positive text-white q-mr-md"
                @click="downloadResult('vtt')"
              />
              <q-btn 
                v-if="fileOutput.xmlResult"
                label="Download XML"
                no-caps
                class="bg-positive text-white"
                @click="downloadResult('xml')"
              />
            </div>
            <q-btn
                v-else
                label="Go"
                no-caps
                :disable="missingData"
                class="q-ma-sm text-white"
                :class="missingData ? 'bg-negative' : 'bg-positive'"
                @click="preprocess"
            />
        </q-card-section>
    </q-card>
</template>

<script>
import snippets from '../../../logic/snippets'
import languages from '../../../logic/config/languages'
import buildOutput from 'src/mixins/buildOutput'

export default {
  mixins: [buildOutput],
  data() {
    return {
      file: null,
      articleID: '',
      language: '',
      fileOutput: null
    }
  },
  computed: {
    languageOptions() {
      return Object.keys(languages).map(key => {
        return {
          label: languages[key].label,
          value: key
        }
      }).sort((a, b) => {
          if(a.label < b.label) { return -1; }
          if(a.label > b.label) { return 1; }
          return 0;
      })
    },
    missingData() {
      return !this.articleID.length || !this.language.length || !this.file
    }
  },
  methods: {
    build(val) {
      let languageObject = null
      languageObject = languages[this.language]
      let vttResult = snippets.captions.buildVttFile(val, this.articleID, languageObject);
      let xmlResult = snippets.captions.buildXmlFile(val, this.articleID, languageObject)
      this.fileOutput =  {vttResult, xmlResult}
    },
    preprocess() {
      this.generate()
    },
    downloadResult(type) {
      let href, download
      if(type == 'vtt') {
        href = `data:application/octet-stream;charset=utf-8;base64,${window.btoa(this.fileOutput.vttResult.cleanedString)}`
        download = this.fileOutput.vttResult.fileName
      }else{
        href= `data:application/octet-stream;charset=utf-8;base64,${window.btoa(this.fileOutput.xmlResult.cleanedString)}`
        download = this.fileOutput.xmlResult.fileName
      }
      const link = document.createElement('a')
      link.href = href
      link.download = download
      link.click()
    }
  }
}
</script>

<style>

</style>