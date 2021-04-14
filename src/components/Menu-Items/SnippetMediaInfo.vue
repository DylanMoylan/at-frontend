<template>
  <div>
      <q-card class="secundo q-ma-lg">
      <q-card-section class="primo text-white text-h6 q-pa-md text-center">
          Media Info Snippet
      </q-card-section>
      <q-card-section>
        <q-input
            filled
            stack-label
            label="Enter Article ID"
            v-model="articleID"
            class="row q-ma-sm at-input"
        />
        <q-select
            filled
            stack-label
            label="Enter Video RSS Link(s)"
            multiple
            use-input
            hide-dropdown-icon
            new-value-mode="add"
            v-model="urls"
            use-chips
            bottom-slots
            class="row q-ma-sm"
            style="max-width:450px"
        >
            <template v-slot:hint>
                <div>Type a url and press enter to confirm. Repeat for each additional entry.</div>
            </template>
        </q-select>
      </q-card-section>
      <q-separator />
      <q-card-section>
          <q-btn
            label="Go"
            no-caps
            class="text-white q-mx-md"
            :class="missingData ? 'bg-negative' : 'bg-positive'"
            :disable="missingData"
            @click="generate"
          />
          <q-btn
            v-if="snippet.length"
            label="Reset"
            no-caps
            class="text-white bg-primary"
            @click="clear"
          />
      </q-card-section>
  </q-card>
  <q-card v-if="snippet.length" class="q-my-md q-pa-md at-preview q-mx-lg">
      <q-card-section class="text-white text-h6 q-pa-md row justify-between">
          <span>media-info.html</span>
          <div class="row">
            <q-btn
                label="Download File"
                no-caps
                class="bg-positive text-white q-mr-sm"
                @click="download"
            />
            <div>
              <q-btn
                label="Copy to Clipboard"
                no-caps
                class="bg-positive text-white"
                @click="copySnippet(snippet)"
              />
            </div>
          </div>
      </q-card-section>
      <q-separator color="white" />
      <q-card-section>
          <code>{{snippet}}</code>
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
            urls: null,
            articleID: '',
            snippet: ''
        }
    },
    computed: {
        missingData() {
            return !this.articleID.length || !this.urls || !this.urls.length
        },
        info() {
            return {
                articleID: this.articleID,
                isMultiComponent: this.urls.length > 1,
                componentCount: this.urls.length,
                rssLinks: this.urls,
                components: []
            }
        }
    },
    methods: {
        generate() {
            this.snippet = this.urls.reduce((prev, curr)=> {
                prev += snippets.customForm.mediaInfo(this.articleID, curr) + "\n\n\n"
                return prev
            }, '')
            console.log('this.snippet: ', this.snippet);
        },
        download() {
            let href = `data:application/octet-stream;charset=utf-8;base64,${window.btoa(unescape(encodeURIComponent(this.snippet)))}`
            let download = 'media-info.html'
            const link = document.createElement('a')
            link.href = href
            link.download = download
            link.click()
        },
        clear() {
            this.snippet = ''
            this.articleID = ''
            this.urls = null
        }
    }
}
</script>

<style>

</style>