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
                    <div class="row full-width justify-start q-mb-md">
                        <q-checkbox
                            label="Has Pre-Assessment"
                            v-model="hasPreAssessment"
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
            <q-card-section>
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
        <checklist-preview :output="fileOutput" />
    </div>
</template>

<script>
import articles from '../../../logic/articles'
import buildOutput from '../../mixins/buildOutput'
import downloadResult from 'src/mixins/downloadResult'
import utils from '../../../logic/utils'
import tryCatch from 'src/mixins/tryCatch'
import ChecklistPreview from '../shared/ChecklistPreview.vue'

export default {
    components: { ChecklistPreview },
    mixins: [buildOutput, tryCatch, downloadResult],
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
        reset() {
            this.articleID = ''
            this.questionnaireID = ''
            this.hasPreAssessment = false
            this.file = null
            this.resetOutput()
        },
        resetOutput(){
            this.fileOutput = null
            this.xmlResult = null
        },
        build(val) {
            const createCB = () => {
                this.fileOutput = articles.clinicalBrief.buildClinicalBrief(val, this.program)
                this.xmlResult = this.fileOutput.finishedArticleObject ? utils.xmlOps.objectToXMLString(this.fileOutput.finishedArticleObject.toObjectLiteral()) : ''
                this.xmlResult = utils.cleanHTML.cleanEntities(this.xmlResult)
            }
            this.tryCatch(createCB, 'clinical brief')
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
                hasPreAssessment: this.hasPreAssessment,
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
        },
        hasData() {
            return !!this.articleID.length || !!this.file || !!this.questionnaireID.length || !!this.hasPreAssessment
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