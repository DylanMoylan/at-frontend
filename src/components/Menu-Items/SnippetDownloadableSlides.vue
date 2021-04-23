<template>
    <q-card class="secundo q-ma-lg">
        <q-card-section class="primo text-white text-h6 q-pa-md text-center">
            Downloadable Slides Snippet
        </q-card-section>
        <q-card-section>
            <q-input
                filled
                stack-label
                label="Enter Article ID"
                v-model="articleID"
                class="row q-ma-sm at-input"
                bottom-slots
            >
                <template v-slot:hint>
                    Article ID will be automatically filled into the text below while you type.
                </template>
            </q-input>
        </q-card-section>
        <q-separator />
        <q-card-section>
            <editor
                :output="slideSnippet"
                buttons
            />
        </q-card-section>
    </q-card>
</template>

<script>
import Editor from '../shared/Editor'

export default {
    components: { Editor },
    data() {
        return {
            articleID: ''
        }
    },
    computed: {
        slideSnippet() {
            return `<div id="dlSlides"><p>A Powerpoint version of the slides from this presentation<br />is available for use as a professional resource from Medscape Education.</p><div class="dlBtn"><a class="cme_btn" href="https://img.medscapestatic.com/images/${this.computeArticleID.slice(0, 3)}/${this.computeArticleID.slice(3)}/${this.computeArticleID}_slides.pptx" target="_blank">Download Now</a></div></div>`
        },
        computeArticleID() {
            return this.articleID.length ? this.articleID : 'XXXXXX'
        }
    }
}
</script>

<style scoped>
    .vue-codemirror >>> .CodeMirror {
        height: 200px!important;
    }
</style>