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
            </q-card-section>
        </q-card>
        <q-card v-if="snippet.length" class="q-mt-md q-pa-md at-preview q-mx-lg">
            <q-card-section class="text-white text-h6 q-pa-md" style="white-space:normal">
                {{ activityID }} Certificate Links
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

export default {
    data() {
        return {
            activityID: '',
            eligibilities: [],
            snippet: ''
        }
    },
    computed: {
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
            let hasLoc = this.eligibilities.includes('loc')
            let hasCme = this.eligibilities.includes('cme')
            let hasNurse = this.eligibilities.includes('nurse_ce')
            let hasPharma = this.eligibilities.includes('pharma_ce')
            return {
                articleID: null,
                activityID: this.activityID,
                eligibilities: [
                    {type: 'loc', activityID: hasLoc ? this.activityID : null, inActivity: hasLoc},
                    {type: 'cme', activityID: hasCme ? this.activityID : null, inActivity: hasCme},
                    {type: 'nurse_ce', activityID: hasNurse ? this.activityID : null, inActivity: hasNurse},
                    {type: 'pharma_ce', activityID: hasPharma ? this.activityID : null, inActivity: hasPharma}
                ]
            }
        }
    },
    methods: {
        generate() {
            this.snippet = snippets.customForm.certificateLinks(this.infoObject.eligibilities)
        }
    }
}
</script>

<style>

</style>