<template>
    <div>
        <q-card class="secundo q-ma-lg">
            <q-card-section 
                class="text-white text-h6 q-pa-md text-center primo"
            >
                Generate Test and Teach
            </q-card-section>
            <q-card-section>
                <q-input
                    filled
                    stack-label
                    label="Article ID"
                    v-model="program.articleID"
                    class="row q-mb-md at-input"
                />
                <div class="row full-width justify-start q-mb-md">
                    <q-checkbox
                        label="Has Transcript"
                        v-model="program.hasTranscript"
                        dense
                    />
                </div>
                <div class="row full-width justify-start q-mb-md">
                    <q-checkbox
                        label="Program is OUS"
                        v-model="program.hasOUS"
                        dense
                    />
                </div>
                <div class="row full-width justify-start q-mb-md">
                    <q-checkbox
                        label="Has Peer Reviewer"
                        v-model="program.hasPeerReviewer"
                        dense
                    />
                </div>
                <div class="row full-width justify-start q-mb-md">
                    <q-checkbox
                        label="Has Collection Page"
                        v-model="program.hasCollectionPage"
                        dense
                    />
                </div>
                <div class="row full-width justify-start q-mb-md">
                    <q-checkbox
                        label="Has for your patient PDF"
                        v-model="program.hasForYourPatient"
                        dense
                    />
                </div>
                <q-file
                    v-model="file"
                    class="at-input"
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
            </q-card-section>
            <q-separator />
            <q-card-section v-if="!!fileOutput">
                <q-btn
                    label="Download Activity XML"
                    no-caps
                    class="bg-positive text-white q-mr-md"
                    @click="downloadResult('activity')"
                />
                <q-btn 
                    v-if="!!xmlResult"
                    label="Download Article XML"
                    no-caps
                    class="bg-positive text-white q-mr-md"
                    @click="downloadResult('xml')"
                />
                <q-btn 
                    label="Download Checklist"
                    no-caps
                    class="bg-positive text-white"
                    @click="downloadResult('checklist')"
                />
            </q-card-section>
        </q-card>
        <template v-if="!!fileOutput">
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
import tryCatch from 'src/mixins/tryCatch'
import buildOutput from '../../mixins/buildOutput'
import {testAndTeach} from '../../../logic/articles'
import utils from '../../../logic/utils'

export default {
    mixins: [tryCatch, buildOutput],
    data() {
        return {
            file: null,
            fileOutput: null,
            xmlResult: null,
            program: {
                name: "Test and Teach",
                codeName: "testAndTeach",
                dirName: "test-and-teach",
                profArticleType: "Article",
                articleID: '',
                qnaID: "",
                hasTranscript: false, 
                hasLLA: false,
                hasOUS: false, 
                hasPeerReviewer: false, 
                hasCollectionPage: false,
                hasSlideDeck: false, 
                hasForYourPatient: false, 
                hasInLanguage: false 
            }
        }
    },
    computed: {
        missingData() {
            return !this.program.articleID.length || !this.file
        },
        hasData() {
            return !!this.program.articleID.length || !!this.file || 
            [this.program.hasTranscript, this.program.hasOUS, this.program.hasPeerReviewer,this.program.hasCollectionPage,this.program.hasForYourPatient].findIndex(item => !!item) > -1
        }
    },
    methods: {
        reset() {
            this.program.articleID = ''
            this.program.hasTranscript = false
            this.program.hasOUS = false
            this.program.hasPeerReviewer = false
            this.program.hasCollectionPage = false
            this.program.hasForYourPatient = false
            this.resetOutput()
        },
        resetOutput() {
            this.fileOutput = null
            this.xmlResult = null
        },
        build(val) {
            const createTestAndTeach = () => {
                this.fileOutput = testAndTeach.buildTestAndTeach(val, this.program)
                this.xmlResult = this.fileOutput.finishedArticleObject ? utils.xmlOps.objectToXMLString(this.fileOutput.finishedArticleObject.toObjectLiteral()) : ''
                this.xmlResult = utils.cleanHTML.cleanEntities(this.xmlResult)

            }
            this.tryCatch(createTestAndTeach)
        },
        downloadResult(type) {
            let href
            let download = this.program.articleID
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
    }
}
</script>

<style>

</style>