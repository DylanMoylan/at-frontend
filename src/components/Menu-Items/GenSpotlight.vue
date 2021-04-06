<template>
    <div>
        <q-card class="secundo q-ma-lg">
            <q-card-section 
                class="text-white text-h6 q-pa-md text-center primo"
            >
                Generate {{ program.name }}
            </q-card-section>
            <q-card-section>
                    <q-input
                        filled
                        stack-label
                        label="Article ID"
                        v-model="articleID"
                        style="width:350px"
                        class="row q-mb-md"
                    />
                    <div class="row full-width justify-start">
                        <q-checkbox
                            label="Has Transcript"
                            v-model="hasTranscript"
                            dense
                        />
                    </div>
                    <div v-if="hasTranscript" class="row full-width items-center">
                        <span>Transcript Type: </span>
                        <q-option-group
                            :options="[
                                {
                                    label: 'Slides',
                                    value: 'Slides'
                                },
                                {
                                    label: 'Text',
                                    value: 'Text'
                                }
                            ]"
                            v-model="transcriptType"
                            type="radio"
                            inline
                        />
                    </div>
                    <div class="row full-width justify-start">
                        <q-checkbox
                            label="Has LLA"
                            v-model="isLLA"
                            dense
                        />
                    </div>
                    <div class="row full-width justify-start">
                        <q-checkbox
                            label="Is OUS"
                            v-model="isOUS"
                            dense
                        />
                    </div>
                    <div class="row full-width justify-start">
                        <q-checkbox
                            label="Has Peer Reviewer"
                            v-model="hasPeerReviewer"
                            dense
                        />
                    </div>
                    <div class="row full-width justify-start">
                        <q-checkbox
                            label="Has Collection Page"
                            v-model="hasCollectionPage"
                            dense
                        />
                    </div>
                    <div class="row full-width justify-start">
                        <q-checkbox
                            label="Has For your patient PDF"
                            v-model="hasPDF"
                            dense
                        />
                    </div>
                    <q-file
                        v-model="file"
                        class="at-input q-mt-md"
                        filled
                        label="Select Prodticket HTML File"
                        accept=".html"
                        @input="resetOutput"
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
                    class="q-ma-sm text-white bg-negative"
                    @click="reset"
                    :disable="!hasData"
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
                class="q-mt-md q-pa-md at-preview q-mx-lg"
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
import tryCatch from 'src/mixins/tryCatch'

export default {
    props: ['product'],
    mixins: [buildOutput, tryCatch],
    data() {
        return {
            articleID: '',
            hasTranscript: false,
            transcriptType: '',
            isLLA: false,
            isOUS: false,
            hasPeerReviewer: false,
            hasCollectionPage: false,
            hasPDF: false,
            file: null,
            fileOutput: null,
            xmlResult: null
        }
    },
    methods: {
        resetOutput() {
            this.fileOutput = null
            this.xmlResult = null
        },
        reset() {
            this.articleID = ''
            this.hasTranscript = false,
            this.transcriptType = ''
            this.isOUS = false
            this.isLLA = false
            this.hasPeerReviewer = false
            this.hasCollectionPage = false
            this.hasPDF = false
            this.file = null
            this.resetOutput()
        },
        build(val) {
            const createCurb = () => {
                this.fileOutput = articles.spotlight.buildSpotlight(val, this.program)
                this.xmlResult = this.fileOutput.finishedArticleObject ? utils.xmlOps.objectToXMLString(this.fileOutput.finishedArticleObject.toObjectLiteral()) : ''
                this.xmlResult = utils.cleanHTML.cleanEntities(this.xmlResult)
            }
            this.tryCatch(createCurb)
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
                name: this.product == 'spotlight' ? "Spotlight" : 'Curbside',
                codeName: this.product,
                dirName: this.product,
                profArticleType: "SlidePresentation",
                articleID: this.articleID,
                qnaID: "",
                hasTranscript: this.hasTranscript, 
                transcriptType: this.transcriptType,
                hasLLA: this.isLLA,
                hasOUS: this.isOUS, 
                hasPeerReviewer: this.hasPeerReviewer, 
                hasCollectionPage: this.hasCollectionPage,
                hasSlideDeck: false, 
                hasForYourPatient: this.hasPDF, 
                hasInLanguage: false 
            }
        },
        checklist() {
            return this.fileOutput && this.fileOutput.checklistHTML ? this.fileOutput.checklistHTML : ''
        },
        missingData() {
            return !this.articleID.length || !this.file || 
            (!!this.hasTranscript && !this.transcriptType.length)
        },
        hasData() {
            return !!this.articleID.length || !!this.file ||
            [this.hasTranscript, this.isLLA, this.isOUS, this.hasPeerReviewer, this.hasCollectionPage, this.hasPDF].find(item => item === true)
        }
    }
}
</script>

<style>
</style>