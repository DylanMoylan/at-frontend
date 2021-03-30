<template>
    <q-card class="secundo slides-snippet">
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
        <q-card-section class="at-preview">
            <div class="row justify-end">
                <q-btn
                    label="Copy to Clipboard"
                    class="text-white bg-positive"
                    no-caps
                    @click="copySnippet(slideSnippet)"
                />
            </div>
            {{slideSnippet}}
        </q-card-section>
    </q-card>
</template>

<script>
import copySnippet from 'src/mixins/copySnippet'

export default {
    mixins: [copySnippet],
    data() {
        return {
            articleID: ''
        }
    },
    computed: {
        slideSnippet() {
            return `<div id="dlSlides">
        <p>A Powerpoint version of the slides from this presentation<br />
            is available for use as a professional resource from Medscape Education.</p>
        <div class="dlBtn"><a class="cme_btn" href="https://img.medscapestatic.com/images/${this.computeArticleID.slice(0, 3)}/${this.computeArticleID.slice(3)}/${this.computeArticleID}_slides.pptx" target="_blank">Download Now</a></div>
</div>`
        },
        computeArticleID() {
            return this.articleID.length ? this.articleID : 'XXXXXX'
        }
    }
}
</script>

<style>
    @media only screen and (min-width:1024px) {
        .slides-snippet {
            width:35vw;
        }
    }
</style>