<template>
    <div>
        <q-card class="secundo">
            <q-card-section class="primo text-white text-h6 q-pa-md text-center">
                Format Learning Objectives
            </q-card-section>
            <q-card-section>
                <q-select
                    filled
                    stack-label
                    label="Select Product Type"
                    v-model="productType"
                    :options="productTypeOptions"
                    class="row q-mb-md at-input"
                    />
                <q-file
                    v-model="file"
                    filled
                    class="at-input"
                    label="Select Prodticket HTML file"
                    accept=".html"
                    @input="generate"
                />
            </q-card-section>
            <q-separator />
            <q-card-section>
                <q-btn
                    class="bg-negative text-white"
                    no-caps
                    label="Reset"
                    @click="reset"
                    :disable="!hasData"
                />
            </q-card-section>
        </q-card>
        <template v-if="fileOutput">
            <q-card class="q-mt-md q-pa-md q-mx-lg" v-if="fileOutput">
                <q-card-section class="text-white text-h6 q-pa-md row justify-between items-center" style="white-space:normal">
                    <span>Learning Objectives</span>
                    <q-btn
                        label="Copy to Clipboard"
                        no-caps
                        class="text-white bg-positive"
                        @click="copySnippet(fileOutput)"
                    />
                </q-card-section>
                <q-separator color="white" />
                <q-card-section class="at-preview">
                    <code>{{ fileOutput }}</code>
                </q-card-section>
            </q-card>
        </template>
    </div>
</template>

<script>
import buildOutput from 'src/mixins/buildOutput'
import tryCatch from 'src/mixins/tryCatch'
import programOptions from 'src/mixins/programOptions'
import copySnippet from 'src/mixins/copySnippet'
import utils from '../../../logic/utils'
import prodticket from '../../../logic/prodticket'

export default {
    mixins: [buildOutput, tryCatch, programOptions, copySnippet],
    data() {
        return {
            file: null,
            fileOutput: null
        }
    },
    methods: {
        build(ticket) {
            const buildLearningObjectives = () => {
                let learningObjectivesHTML
                let learningObjectives = prodticket.getLearningObjectives(ticket, this.program)
                console.log('learningObjectives: ', learningObjectives);
                learningObjectivesHTML = utils.cleanHTML.learningObjectives(learningObjectives)
                learningObjectivesHTML = utils.cleanHTML.onlyParagraphTags(learningObjectivesHTML, removeFluff = false).trim()
                this.fileOutput = utils.formatLearningObjectives(learningObjectivesHTML)
                this.fileOutput = utils.cleanHTML.cleanEntities(this.fileOutput)
            }
            this.tryCatch(buildLearningObjectives)
        },
        reset() {
            this.fileOutput = null
            this.file = null
            this.productType = ''
        }
    },
    computed: {
        hasData() {
            return !!this.file || !!this.fileOutput || !!this.productType.length
        }
    }
}
</script>

<style>

</style>