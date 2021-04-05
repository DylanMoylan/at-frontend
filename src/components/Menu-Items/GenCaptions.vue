<template>
  <q-card class="secundo q-my-lg">
        <q-card-section class="primo text-white text-h6 q-pa-md text-center">
            Generate Captions
        </q-card-section>
        <q-card-section class="q-ma-sm">
          <ol style="border:1px solid; border-radius:3px">
            <li style="margin-top:10px">Clean and prepare a .xlss file and convert it to HTML with LibreOffice. (See <a href="https://confluence.internetbrands.com/pages/viewpage.action?pageId=87791092">Confluence</a> for more info).</li>
            <li>Enter article ID and select language.</li>
            <li>Click on the file picker and select the file you've prepared.</li>
            <li style="margin-bottom:10px">Click Go. When the process is complete, download buttons should appear for XML and VTT versions.</li>
          </ol>
        </q-card-section>
        <q-card-section>
            <div class="row justify-between">
                <q-input
                    filled
                    stack-label
                    label="Article ID"
                    v-model="articleID"
                    class="row q-ma-sm at-input"
                />
                <q-select
                  filled
                  stack-label
                  label="Select Language"
                  :options="languageOptions"
                  v-model="language"
                  class="row q-ma-sm at-input"
                  emit-value
                  map-options
                />
            </div>
                <q-file
                  v-model="file"
                  filled
                  label="Select an HTML file"
                  class="q-ma-sm q-mb-md at-input"
                  bottom-slots
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
              class="bg-negative text-white"
              @click="reset"
              v-if="hasData"
            />
        </q-card-section>
        <q-separator />
        <q-card-section v-if="fileOutput">
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
        </q-card-section>
        <q-card-section>
          <q-item style="border:1px solid #787878; border-radius:3px">
            <q-item-section avatar>
              <q-icon name="info" />
            </q-item-section>
            <q-item-section>
              <q-item-label>
                Don't forget to <router-link to="/snippets/in-language">create in-language XML</router-link>
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-card-section>
    </q-card>
</template>

<script>
import snippets from '../../../logic/snippets'
import languages from '../../../logic/config/languages'
import buildOutput from 'src/mixins/buildOutput'
import tryCatch from 'src/mixins/tryCatch'

export default {
  mixins: [buildOutput, tryCatch],
  data() {
    return {
      file: null,
      articleID: '',
      language: '',
      fileOutput: null
    }
  },
  computed: {
    hasData() {
      return this.file || this.articleID.length || this.language.length || this.fileOutput
    },
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
    reset() {
      this.fileOutput = null
      this.file = null
      this.articleID = ''
      this.language = ''
    },
    build(val) {
      let languageObject = null
      languageObject = languages[this.language]
      const createCaptions = () => {
        let vttResult = snippets.captions.buildVttFile(val, this.articleID, languageObject);
        let xmlResult = snippets.captions.buildXmlFile(val, this.articleID, languageObject)
        this.fileOutput =  {vttResult, xmlResult}
      }
      this.tryCatch(createCaptions)
    },
    downloadFailed() {
      this.$q.dialog({
        title: 'Error',
        message: 'The program encountered an issue while generating the ticket. There may be an issue with the input file\'s encoding or formatting.'
      })
    },
    downloadResult(type) {
      let href, download
      if(type == 'vtt') {
        try {
          href = `data:application/octet-stream;charset=utf-8;base64,${window.btoa(this.fileOutput.vttResult.cleanedString)}`
          download = this.fileOutput.vttResult.fileName
          continueDownload()
        } catch (error) {
          this.downloadFailed()
        }
      }else{
        try {
          href= `data:application/octet-stream;charset=utf-8;base64,${window.btoa(this.fileOutput.xmlResult.cleanedString)}`
          download = this.fileOutput.xmlResult.fileName
          continueDownload()
        } catch (error) {
          this.downloadFailed()
        }
      }
      function continueDownload() {
        const link = document.createElement('a')
        link.href = href
        link.download = download
        link.click()
      }
    }
  }
}
</script>

<style>

</style>