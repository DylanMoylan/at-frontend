<template>
    <q-card>
        <q-card-section class="primo text-white text-h6 q-pa-md row justify-between">
            <span>Misc Provider Statement Snippet</span>
            <q-btn
                label="Copy to Clipboard"
                class="text-white bg-positive"
                no-caps
                @click="copySnippet(snippet)"
            />
        </q-card-section>
        <q-card-section class="at-preview">
            <code>{{snippet}}</code>
        </q-card-section>
    </q-card>
</template>

<script>
import copySnippet from 'src/mixins/copySnippet'
import utils from '../../../logic/utils'
export default {
    mixins: [copySnippet],
    data() {
        return {
            articleID: ''
        }
    },
    computed: {
        snippet() {
            return utils.cleanHTML.cleanEntities(`
            <p>
                <img src="/webmd/professional_assets/medscape/images/provider/medscape1.150x34.gif" alt="Medscape" />
                <br />
                <img src="/webmd/professional_assets/medscape/images/provider/interprofessional-continuing-education.jpg?interpolation=lanczos-none&amp;resize=150:96" alt="Interprofessional Continuing Education" />
                <br />
                In support of improving patient care, Medscape, LLC is jointly accredited by the Accreditation Council for Continuing Medical Education (ACCME), the Accreditation Council for Pharmacy Education (ACPE), and the American Nurses Credentialing Center (ANCC), to provide continuing education for the healthcare team.
            </p>
            `)
        },
        computeArticleID() {
            return this.articleID.length ? this.articleID : 'XXXXXX'
        }
    }
}
</script>

<style>

</style>