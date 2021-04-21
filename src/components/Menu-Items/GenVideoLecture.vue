<template>
    <div>
        <q-card class="secundo q-ma-lg">
            <q-card-section 
                class="text-white text-h6 q-pa-md text-center primo"
            >
                Generate Video Lecture
            </q-card-section>
            <q-card-section>
                <q-input
                    filled
                    stack-label
                    label="Article ID"
                    v-model="program.articleID"
                    class="row q-mb-md at-input"
                />
                <standard-form :program="program" @input="bindValues" />
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
        <checklist-preview :output="fileOutput" />
    </div>
</template>

<script>
import tryCatch from 'src/mixins/tryCatch'
import buildOutput from '../../mixins/buildOutput'
import downloadResult from 'src/mixins/downloadResult'
import utils from '../../../logic/utils'
import { spotlight } from '../../../logic/articles'
import StandardForm from '../shared/StandardForm.vue'
import ChecklistPreview from '../shared/ChecklistPreview.vue'
import Validator from '../shared/Validator.vue'

export default {
    mixins: [tryCatch, buildOutput, downloadResult],
    components: {
        StandardForm,
        ChecklistPreview,
        Validator
    },
    data() {
        return {
            file: null,
            fileOutput: null,
            xmlResult: null,
            program: {
                name: "Video Lecture",
                codeName: "video",
                dirName: "video-lecture",
                profArticleType: "SlidePresentation",
                articleID: "",
                qnaID: "",
                hasTranscript: false, 
                transcriptType: "",
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
            return !this.program.articleID.length || !this.file || 
            (!!this.program.hasTranscript && !this.program.transcriptType.length)
        },
        hasData() {
            return !!this.program.articleID.length || !!this.file || 
            [this.program.hasTranscript, this.program.hasOUS, this.program.hasPeerReviewer,this.program.hasCollectionPage,this.program.hasForYourPatient,this.program.hasLLA].findIndex(item => !!item) > -1
        }
    },
    methods: {
        reset() {
            this.program.articleID = ''
            this.program.hasTranscript = false
            this.transcriptType = ''
            this.program.hasOUS = false
            this.program.hasPeerReviewer = false
            this.program.hasCollectionPage = false
            this.program.hasForYourPatient = false
            this.program.hasLLA = false
            this.file = null
            this.resetOutput()
        },
        resetOutput() {
            this.fileOutput = null
            this.xmlResult = null
        },
        build(val) {
            const createVideoLecture = () => {
                this.fileOutput = spotlight.buildSpotlight(val, this.program)
                this.xmlResult = this.fileOutput.finishedArticleObject ? utils.xmlOps.objectToXMLString(this.fileOutput.finishedArticleObject.toObjectLiteral()) : ''
                this.xmlResult = utils.cleanHTML.cleanEntities(this.xmlResult)
            }
            this.tryCatch(createVideoLecture, 'video lecture')
        },
        bindValues(program) {
            this.program = Object.assign(this.program, program)
        }
    }
}
</script>

<style>

</style>