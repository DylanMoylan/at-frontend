<template>
    <div class="row">
        <q-card class="secundo q-mx-lg">
            <q-card-section class="primo text-white text-h6 q-pa-md text-center">
                Certificate Links
            </q-card-section>
            <q-card-section>
                <q-input
                    filled
                    stack-label
                    label="Enter Activity ID"
                    v-model="activityID"
                    class="row q-ma-sm at-input"
                />
                <q-option-group
                    :options="eligibilityOptions"
                    v-model="eligibilities"
                    type="checkbox"
                    dense
                />
            </q-card-section>
            <q-separator />
            <q-card-section>
                <q-btn
                    label="Go"
                    no-caps
                    @click="generate"
                    :disable="missingData"
                    class="text-white q-mx-md"
                    :class="missingData ? 'bg-negative' : 'bg-positive'"
                />
                <q-btn
                    label="Reset"
                    no-caps
                    @click="reset"
                    class="text-white bg-negative"
                    v-if="hasData"
                />
            </q-card-section>
        </q-card>
        <q-card v-if="snippet.length" class="q-mt-md q-pa-md at-preview q-mx-lg">
            <q-card-section class="text-white text-h6 q-pa-md row justify-between items-center" style="white-space:normal">
                <span>{{ activityID }} Certificate Links</span>
                <q-btn
                    label="Copy to Clipboard"
                    no-caps
                    class="text-white bg-positive"
                    @click="copySnippet(snippet)"
                />
            </q-card-section>
            <q-separator color="white" />
            <q-card-section style="white-space:pre-line">
                {{ snippet }}
            </q-card-section>
        </q-card>
    </div>
</template>

<script>
import snippets from '../../../logic/snippets'
import copySnippet from 'src/mixins/copySnippet'

export default {
    mixins: [copySnippet],
    data() {
        return {
            activityID: '',
            eligibilities: [],
            snippet: ''
        }
    },
    computed: {
        hasData() {
            return this.activityID.length || this.eligibilities.length || this.snippet.length
        },
        eligibilityOptions() {
            return ['loc','cme','nurse_ce','pharma_ce'].map(item => {
                return {
                    label: item,
                    value: item
                }
            })
        },
        missingData() {
            return !this.activityID.length || !this.eligibilities.length
        },
        infoObject() {
            const includeID = (type) => this.eligibilities.includes(type)
            return {
                articleID: null,
                activityID: this.activityID,
                eligibilities: [
                    {type: 'loc', activityID: includeID('loc') ? this.activityID : null, inActivity: includeID('loc')},
                    {type: 'cme', activityID: includeID('cme') ? this.activityID : null, inActivity: includeID('cme')},
                    {type: 'nurse_ce', activityID: includeID('nurse_ce') ? this.activityID : null, inActivity: includeID('nurse_ce')},
                    {type: 'pharma_ce', activityID: includeID('pharma_ce') ? this.activityID : null, inActivity: includeID('pharma_ce')}
                ]
            }
        }
    },
    methods: {
        generate() {
            this.snippet = snippets.customForm.certificateLinks(this.infoObject.eligibilities)
        },
        reset() {
            this.activityID = ''
            this.eligibilities = []
            this.snippet = ''
        }
    }
}
</script>

<style>

</style>