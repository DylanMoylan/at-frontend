<template>
  <div>
      <template v-if="includeOption('hasTranscript')">
        <div class="row full-width justify-start">
            <q-checkbox
                label="Has Transcript"
                :value="program.hasTranscript"
                dense
                @input="val => emitValue('hasTranscript', val)"
            />
        </div>
        <div v-if="program.hasTranscript" class="row full-width items-center">
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
                :value="program.transcriptType"
                type="radio"
                inline
                @input="val => emitValue('transcriptType', val)"
            />
        </div>
      </template>
    <div class="row full-width justify-start"  v-if="includeOption('hasLLA')">
        <q-checkbox
            label="Has LLA"
            :value="program.hasLLA"
            dense
            @input="val => emitValue('hasLLA', val)"
        />
    </div>
    <div class="row full-width justify-start" v-if="includeOption('hasOUS')">
        <q-checkbox
            label="Program is OUS"
            :value="program.hasOUS"
            dense
            @input="val => emitValue('hasOUS', val)"
        />
    </div>
    <div class="row full-width justify-start" v-if="includeOption('hasPeerReviewer')">
        <q-checkbox
            label="Has Peer Reviewer"
            :value="program.hasPeerReviewer"
            dense
            @input="val => emitValue('hasPeerReviewer', val)"
        />
    </div>
    <div class="row full-width justify-start" v-if="includeOption('hasCollectionPage')">
        <q-checkbox
            label="Has Collection Page"
            :value="program.hasCollectionPage"
            dense
            @input="val => emitValue('hasCollectionPage', val)"
        />
    </div>
    <div class="row full-width justify-start q-mb-md" v-if="includeOption('hasForYourPatient')">
        <q-checkbox
            label="Has for your patient PDF"
            :value="program.hasForYourPatient"
            dense
            @input="val => emitValue('hasForYourPatient', val)"
        />
    </div>
  </div>
</template>

<script>
export default {
    props: {
        program: {
            type: Object,
            required: true,
            default: {
                hasTranscript: false,
                transcriptType: '',
                hasLLA: false,
                hasOUS: false,
                hasPeerReviewer: false,
                hasCollectionPage: false,
                hasForYourPatient: false
            }
        }
    },
    methods: {
        includeOption(string) {
            return Object.keys(this.program).includes(string)
        },
        emitValue(binding, val) {
            this.$emit('input', {[binding]: val})
        }
    }
}
</script>

<style>

</style>