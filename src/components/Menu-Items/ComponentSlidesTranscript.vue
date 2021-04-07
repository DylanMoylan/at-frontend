<template>
  <q-card class="secundo">
    <q-card-section class="primo text-white text-h6 q-pa-md text-center">
      Generate Slides Transcript (XML Code)
    </q-card-section>
    <q-card-section>
        <q-input
          filled
          stack-label
          label="Article ID"
          v-model="articleID"
          class="row q-mb-md at-input"
        />
        <q-select
          filled
          stack-label
          label="Select Product Type"
          v-model="productType"
          :options="filteredPrograms"
          class="row q-mb-md at-input"
        />
    </q-card-section>
    <q-card-section>
      <q-file
        v-model="file"
        class="at-input"
        filled
        label="Select Prodticket HTML File"
        accept=".html"
      />
    </q-card-section>
    <q-separator />
    <q-card-section>
      <q-btn
        label="Go"
        no-caps
        :disable="missingData"
        class="q-ma-sm text-white"
        :class="missingData ? 'bg-negative' : 'bg-positive'"
        @click="generate"
      />
      <q-btn
        label="Reset"
        no-caps
        :disable="!hasData"
        class="q-ma-sm text-white bg-negative"
        @click="reset"
      />
    </q-card-section>
    <template v-if="fileOutput">
      <q-separator />
      <q-card-section>
        <q-btn
          label="Download Transcript XML"
          no-caps
          class="bg-positive text-white q-mr-md"
          @click="downloadResult(null, `${articleID}_slides.xml`)"
        />
      </q-card-section>
    </template>
  </q-card>
</template>

<script>
import buildOutput from '../../mixins/buildOutput'
import downloadResult from 'src/mixins/downloadResult'
import programOptions from 'src/mixins/programOptions'
import tryCatch from 'src/mixins/tryCatch'
import articles from '../../../logic/articles'
import utils from '../../../logic/utils'
import prodticket from '../../../logic/prodticket'

export default {
  mixins: [buildOutput, programOptions, tryCatch, downloadResult],
  data() {
    return {
      articleID: '',
      file: null,
      fileOutput: null
    }
  },
  computed: {
    missingData() {
      return !this.articleID.length || !this.productType.length || !this.file
    },
    hasData() {
      return !!this.articleID.length || !!this.productType.length || !!this.file
    },
    filteredPrograms() {
        return this.productTypeOptions.filter(item => item != 'Clinical Brief' && item != 'Test and Teach')
    }
  },
  methods: {
    reset() {
      this.articleID = ''
      this.file = null
      this.fileOutput = null
    },
    build(ticket) {
      let slideComponents = null
      let slidesTOCs = null
      let transcriptXML = null 
      const program = this.program
      const createTranscript = () => {
        slideComponents = prodticket.getSlides(ticket, program);
        // SET TRANSCRIPT TO NULL IF THE RESULT RETURNED WAS AN ERROR 
        if (slideComponents instanceof Error) {
            throw slideComponents;
        } else {
            // If no transcriptXML --> then we ran brief or test and teach functions.
            if (
                program.codeName == "spotlight" ||
                program.codeName == "curbside" ||
                program.codeName == "video" 
            ) {
                slidesTOCs = articles.spotlight.getSlidesTOC(slideComponents, program);
                transcriptXML = utils.xmlOps.objectToXMLString(slidesTOCs.toObjectLiteral());
            } else if (program.codeName == "firstResponse") {
                var components = prodticket.getComponents(ticket, program);
                if (components instanceof Error) {
                    throw components;
                }
                slidesTOCs = articles.firstResponse.getSlidesTOCs(slideComponents, program, components);
                for (var i = 0; i < slidesTOCs.length; i++) {
                    transcriptXML += utils.xmlOps.objectToXMLString(slidesTOCs[i].toObjectLiteral()) + "\n\n\n";
                }
            } else if (program.codeName == "townHall") {
                slidesTOCs = articles.townHallEnduring.getSlidesTOC(slideComponents, program).slidesTOC;
                transcriptXML = utils.xmlOps.objectToXMLString(slidesTOCs.toObjectLiteral());
            } else {
                transcriptXML = "";
            }
        }
        this.fileOutput = utils.cleanHTML.cleanEntities(transcriptXML)
      }
      this.tryCatch(createTranscript)
    }
  }
}
</script>

<style>

</style>