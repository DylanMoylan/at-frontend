<template>
  <q-card>
        <q-card-section class="bg-primary text-white text-h6 q-pa-md text-center">
            Generate Curbside
        </q-card-section>
        <q-card-section>
            <div class="row justify-between">
                <q-input
                    filled
                    stack-label
                    label="Article ID"
                    v-model="articleID"
                    style="width:350px"
                    class="row q-mb-md"
                />
                <q-select
                  filled
                  stack-label
                  label="Select Language"
                  :options="languageOptions"
                  v-model="language"
                  class="row q-mb-md"
                  style="width:350px"
                />
            </div>
        </q-card-section>
        <q-card-section>
            <q-file
                v-model="file"
                style="max-width:300px"
                filled
                label="Pick 1 File"
            />
            <q-btn
                label="logfile"
                @click="preprocess"
            />
            <q-btn v-if="fileOutput && fileOutput.vttResult"
              label="Download"
              @click="downloadVTT"
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
      return [
        'arabic', 'chinese', 'korean', 'japanese', 'russian', 'danish', 'portuguesePortugal', 'portugueseBrazil', 'german', 'italian', 'french', 'spanishSpain', 'spanishLATAM', 'english'
      ]
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
    downloadVTT() {
      
    }
  }
}
</script>

<style>

</style>