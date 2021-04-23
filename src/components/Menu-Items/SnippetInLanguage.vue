<template>
  <q-card class="secundo">
      <q-card-section class="primo text-white text-h6 q-pa-md text-center">
          Generate In-Language XML
      </q-card-section>
      <q-card-section>
          <q-input
                filled
                stack-label
                label="Article ID"
                v-model="articleID"
                class="row q-ma-sm at-input"
            />
            <q-input
                filled
                stack-label
                label="Article Title"
                v-model="articleTitle"
                class="row q-ma-sm at-input"
            />
            <div class="row q-mb-sm justify-between">
                <q-checkbox
                    label="Has Expert Commentary"
                    v-model="hasExpertCommentary"
                    dense
                    class="q-mr-sm"
                />
                <q-select
                    filled
                    stack-label
                    label="Choose Languages"
                    class="at-input"
                    v-if="hasExpertCommentary"
                    v-model="expertCommentary"
                    multiple
                    :options="languageOptions"
                    map-options
                    emit-value
                    popup-content-class="secundo"
                    clearable
                />
            </div>
            <div class="row q-mb-sm justify-between">
                <q-checkbox
                    label="Has Downloadable PDF"
                    v-model="hasDownloadablePDF"
                    dense
                    class="q-mr-sm"
                />
                <q-select
                    filled
                    stack-label
                    label="Choose Languages"
                    class="row q-mb-sm at-input"
                    v-if="hasDownloadablePDF"
                    v-model="downloadablePDF"
                    multiple
                    :options="languageOptions"
                    map-options
                    emit-value
                    popup-content-class="secundo"
                    clearable
                />
            </div>
            <div class="row q-mb-sm justify-between">
                <q-checkbox
                    label="Has Transcript PDF"
                    v-model="hasTranscriptPDF"
                    dense
                    class="q-mr-sm"
                />
                <q-select
                    filled
                    stack-label
                    label="Choose Languages"
                    class="row q-mb-sm at-input"
                    v-if="hasTranscriptPDF"
                    v-model="transcriptPDF"
                    multiple
                    :options="languageOptions"
                    map-options
                    emit-value
                    popup-content-class="secundo"
                    clearable
                />
            </div>
            <div class="row q-mb-sm justify-between">
                <q-checkbox
                    label="Has Subtitles"
                    v-model="hasSubtitles"
                    dense
                    class="q-mr-sm"
                />
                <q-select
                    filled
                    stack-label
                    label="Choose Languages"
                    class="row q-mb-sm at-input"
                    v-if="hasSubtitles"
                    v-model="subtitles"
                    multiple
                    :options="languageOptions"
                    map-options
                    emit-value
                    popup-content-class="secundo"
                    clearable
                />
            </div>
      </q-card-section>
      <q-card-section>
          <q-btn
            label="Go"
            no-caps
            :disable="missingData"
            class="q-ma-sm text-white"
            :class="missingData ? 'bg-negative' : 'bg-positive'"
            @click="go"
          />
          <q-btn
            label="Reset"
            no-caps
            class="q-ma-sm text-white bg-negative"
            @click="reset"
            :disable="!hasData"
          />
      </q-card-section>
  </q-card>
</template>

<script>
import languages from '../../../logic/config/languages'
import snippets from '../../../logic/snippets'
import utils from '../../../logic/utils'

export default {
    data() {
        return {
            articleID: '',
            articleTitle: '',
            hasExpertCommentary: false,
            expertCommentary: [],
            hasDownloadablePDF: false,
            downloadablePDF: [],
            hasTranscriptPDF: false,
            transcriptPDF: [],
            hasSubtitles: false,
            subtitles: [],
            fileOutput: null
        }
    },
    computed: {
        languageOptions() {
            return Object.keys(languages)
            .filter(key => key != 'english')
            .map(key => {
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
        infoObject() {
            return {
                articleID: this.articleID,
                articleTitle: this.articleTitle,
                addons: {
                    expertCommentary: {
                        has: this.hasExpertCommentary,
                        languages: this.expertCommentary
                    },
                    downloadablePDF: {
                        has: this.hasDownloadablePDF,
                        languages: this.languages
                    },
                    transcriptPDF: {
                        has: this.hasTranscriptPDF,
                        languages: this.transcriptPDF
                    },
                    subtitles: {
                        has: this.hasSubtitles,
                        languages: this.subtitles
                    }
                }
            }
        },
        hasData() {
            return !!this.articleID.length || !!this.articleTitle.length || 
            [this.hasExpertCommentary, this.hasDownloadablePDF, this.hasTranscriptPDF, this.hasSubtitles].indexOf(true) > -1
        },
        missingData() {
            return !this.articleID.length || !this.articleTitle.length || this.missingLanguageChoice
        },
        missingLanguageChoice() {
            return (this.hasExpertCommentary ? this.expertCommentary.length === 0 : false) ||
                (this.hasDownloadablePDF ? this.downloadablePDF.length  === 0 : false) ||
                (this.hasTranscriptPDF ? this.transcriptPDF.length  === 0 : false) ||
                (this.hasSubtitles ? this.subtitles.length  === 0 : false)
        }
    },
    methods: {
        go() { 
            var tocElements = []
            var keys = Object.keys(this.infoObject.addons)
            var currentKey = ""
            var addonObject = null
            var languageString = null
            var languageObject = null
            let href, download
            for (var i = 0; i < 4; i++) {
                currentKey = keys[i]
                addonObject = this.infoObject.addons[currentKey]   
                if (addonObject.has) {
                    for (var z = 0; z < addonObject.languages.length; z++) {
                        // (articleID, language, programTitle)
                        languageString = addonObject.languages[z]
                        languageObject = languages[languageString]
                        tocElements.push(snippets.inLanguage[currentKey](this.infoObject.articleID, languageObject, this.infoObject.articleTitle))
                    }
                } 
            }
            var result = "";
            var xmlString = "";
            for (var i = 0; i < tocElements.length; i++) {
                xmlString = utils.xmlOps.objectToXMLString(tocElements[i].toObjectLiteral());
                result += `${xmlString}\n\n`;
            }    
            try {
                result = utils.cleanHTML.cleanEntities(result);                                     
                this.fileOutput = result
                try {
                    href = `data:application/octet-stream;charset=utf-8;base64,${window.btoa(this.fileOutput)}`
                    download = `${this.articleID}/in-language.xml`
                    continueDownload()
                } catch (error) {
                    console.log('error: ', error);
                }
            } catch (error) {
                console.log(error.message);
            } 
            function continueDownload() {
                const link = document.createElement('a')
                link.href = href
                link.download = download
                link.click()
            }
        },
        reset() {
            this.articleID = ''
            this.articleTitle = ''
            this.hasExpertCommentary = false
            this.expertCommentary = []
            this.hasDownloadablePDF = false
            this.downloadablePDF = []
            this.hasTranscriptPDF = false
            this.transcriptPDF = []
            this.hasSubtitles = false
            this.subtitles = []
            this.fileOutput = null
        }
    }
}
</script>

<style>

</style>