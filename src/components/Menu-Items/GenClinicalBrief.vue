<template>
    <div>
        <q-card class="secundo q-ma-lg">
            <q-card-section 
                class="text-white text-h6 q-pa-md text-center primo"
            >
                Generate Clinical Brief
            </q-card-section>
            <q-card-section>
                    <q-input
                        filled
                        stack-label
                        label="Article ID"
                        v-model="articleID"
                        class="row q-mb-md at-input"
                    />
                    <q-input
                        filled
                        stack-label
                        label="Questionnaire ID"
                        v-model="questionnaireID"
                        class="row q-mb-md at-input"
                    />
                    <div class="row full-width justify-start">
                        <q-checkbox
                            label="Has Pre-Assessment"
                            v-model="hasPreAssessment"
                            dense
                        />
                    </div>
            </q-card-section>
            <q-card-section>
                <q-file
                    v-model="file"
                    style="max-width:300px"
                    filled
                    label="Select Prodticket HTML File"
                    accept=".html"
                />
                <q-btn
                    label="Go"
                    no-caps
                    :disable="missingData"
                    class="q-ma-sm text-white"
                    :class="missingData ? 'bg-negative' : 'bg-positive'"
                    @click="generate"
                />
                <div v-if="fileOutput" class="q-ma-sm">
                <q-btn 
                    v-if="fileOutput.activityXML"
                    label="Download Activity XML"
                    no-caps
                    class="bg-positive text-white q-mr-md"
                    @click="downloadResult('activity')"
                />
                <q-btn 
                    v-if="xmlResult"
                    label="Download Article XML"
                    no-caps
                    class="bg-positive text-white q-mr-md"
                    @click="downloadResult('xml')"
                />
                <q-btn 
                    v-if="fileOutput.checklistHTML"
                    label="Download Checklist"
                    no-caps
                    class="bg-positive text-white"
                    @click="downloadResult('checklist')"
                />
                </div>
            </q-card-section>
        </q-card>
        <template v-if="fileOutput">
            <div class="q-my-md text-white text-h6 q-ml-lg">Preview:</div>
            <q-card 
                class="q-mt-md q-pa-md preview q-mx-lg at-preview"
            >
                {{fileOutput.checklistHTML}}
            </q-card>
        </template>
    </div>
</template>

<script>
import articles from '../../../logic/articles'
import buildOutput from '../../mixins/buildOutput'
import utils from '../../../logic/utils'

export default {
    mixins: [buildOutput],
    data() {
        return {
            articleID: '',
            questionnaireID: '',
            hasPreAssessment: false,
            file: null,
            fileOutput: null,
            xmlResult: null
        }
    },
    methods: {
        build(val) {
            this.fileOutput = articles.clinicalBrief.buildClinicalBrief(val, this.program)
            this.xmlResult = this.fileOutput.finishedArticleObject ? utils.xmlOps.objectToXMLString(this.fileOutput.finishedArticleObject.toObjectLiteral()) : ''
        },
        downloadResult(type) {
            let href
            let download = this.articleID
            switch(type) {
                case 'activity':
                    href = `data:application/octet-stream;charset=utf-8;base64,${window.btoa(unescape(encodeURIComponent(this.fileOutput.activityXML)))}`
                    download += '_activity.xml'
                    break
                case 'xml':
                    href = `data:application/octet-stream;charset=utf-8;base64,${window.btoa(unescape(encodeURIComponent(this.xmlResult)))}`
                    download += '.xml'
                    break
                case 'checklist':
                default:
                    href = `data:application/octet-stream;charset=utf-8;base64,${window.btoa(unescape(encodeURIComponent(this.fileOutput.checklistHTML)))}`
                    download += '_checklist.html'
                    break
            }
            const link = document.createElement('a')
            link.href = href
            link.download = download
            link.click()
        }
    },
    computed: {
        program() {
            return {
                name: "Clinical Brief",
                codeName: "brief",
                dirName: "brief",
                profArticleType: "Article",
                articleID: this.articleID,
                qnaID: this.questionnaireID,
                hasPreAssessment: false,
                hasPostAssessment: false,
                hasOUS: false, 
                hasPeerReviewer: false, 
                hasCollectionPage: false,
                hasSlideDeck: false, 
                hasForYourPatient: false, 
                hasInLanguage: false 
            }
        },
        checklist() {
            return this.fileOutput && this.fileOutput.checklistHTML ? this.fileOutput.checklistHTML : ''
        },
        missingData() {
            return !this.articleID.length || !this.file || !this.questionnaireID.length
        }
    }
}
</script>

<style>
    .preview {
        white-space: pre-wrap;
        background-color: black;
        color: white;
        font-family: 'Courier New', monospace;
    }
</style>