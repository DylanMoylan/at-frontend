<template>
    <div>
        <q-card class="secundo q-ma-lg">
            <q-card-section 
                class="text-white text-h6 q-pa-md text-center primo"
            >
                Generate Townhall Certificate XML
            </q-card-section>
            <disclaimer />
            <q-card-section>
                <q-input
                    filled
                    stack-label
                    label="Article ID"
                    v-model="program.articleID"
                    class="row q-mb-md at-input"
                />
                <div class="row full-width justify-start">
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
import downloadResult from 'src/mixins/downloadResult'
import buildOutput from '../../mixins/buildOutput'
import utils from '../../../logic/utils'
import { townHallCert } from '../../../logic/articles'
import ChecklistPreview from '../shared/ChecklistPreview.vue'
import Disclaimer from '../shared/Disclaimer.vue'

export default {
    mixins: [tryCatch, buildOutput,downloadResult],
    components: { ChecklistPreview, Disclaimer },
    data() {
        return {
            file: null,
            fileOutput: null,
            xmlResult: null,
            program: {
                name: "Town Hall Cert Page",
                codeName: "townHallCert",
                dirName: "townhall-cert",
                profArticleType: "Article",
                articleID: "",
                qnaID: "",
                hasTranscript: false, 
                transcriptType: 'Slides',
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
            return !!this.program.articleID.length || !!this.file
        }
    },
    methods: {
        reset() {
            this.program.articleID = ''
            this.program.hasOUS = false
            this.program.hasPeerReviewer = false
            this.file = null
            this.resetOutput()
        },
        resetOutput() {
            this.fileOutput = null
            this.xmlResult = null
        },
        build(val) {
            const createTownhallCert = () => {
                this.fileOutput = townHallCert.buildTownHallCert(val, this.program)
                this.xmlResult = this.fileOutput.finishedArticleObject ? utils.xmlOps.objectToXMLString(this.fileOutput.finishedArticleObject.toObjectLiteral()) : ''
                this.xmlResult = utils.cleanHTML.cleanEntities(this.xmlResult)
                this.fileOutput = Object.assign(this.fileOutput, {xmlResult: this.xmlResult})
            }
            this.tryCatch(createTownhallCert, 'TH Cert')
        }
    }
}
</script>

<style>

</style>