<template>
    <q-card style="max-width:90%">
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
                        label="Has Downloadable Slide Deck"
                        v-model="hasDownloadableSlideDeck"
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
                @click="generate"
            />
        </q-card-section>
        <q-separator />
        <q-card-section>
            <div v-html="checklist" />
        </q-card-section>
    </q-card>
</template>

<script>
import articles from '../../../logic/articles'
import buildOutput from 'src/mixins/buildOutput'

export default {
    mixins: [buildOutput],
    data() {
        return {
            articleID: '',
            hasTranscript: false,
            transcriptType: '',
            isLLA: false,
            isOUS: false,
            hasPeerReviewer: false,
            hasCollectionPage: false,
            hasDownloadableSlideDeck: false,
            hasPDF: false,
            file: null,
            fileOutput: null
        }
    },
    methods: {
        build(val) {
            this.fileOutput = articles.spotlight.buildSpotlight(val, this.program)
        }
    },
    computed: {
        program() {
            return {
                name: "Curbside Consult",
                codeName: "curbside",
                dirName: "curbside",
                profArticleType: "SlidePresentation",
                articleID: this.articleID,
                qnaID: "",
                hasTranscript: this.hasTranscript, 
                transcriptType: this.transcriptType,
                hasLLA: this.isLLA,
                hasOUS: this.isOUS, 
                hasPeerReviewer: this.hasPeerReviewer, 
                hasCollectionPage: this.hasCollectionPage,
                hasSlideDeck: this.hasDownloadableSlideDeck, 
                hasForYourPatient: this.hasPDF, 
                hasInLanguage: false 
            }
        },
        checklist() {
            return this.fileOutput && this.fileOutput.checklistHTML ? this.fileOutput.checklistHTML : ''
        }
    }
}
</script>

<style>

</style>