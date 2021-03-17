<template>
    <q-card>
        <q-card-section class="bg-primary text-white text-h4 q-pa-lg">
            Generate Curbside
        </q-card-section>
    </q-card>
</template>

<script>
export default {
    data() {
        return {
            articleID: '',
            hasTranscript: null,
            transcriptType: '',
            isLLA: null,
            isOUS: null,
            hasPeerReviewer: null,
            hasCollectionPage: null,
            hasDownloadableSlideDeck: null,
            hasPDF: null
        }
    }
}
</script>

<style>

</style>