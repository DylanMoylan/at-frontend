<template>
  <q-card class="secundo">
    <q-card-section class="primo text-white text-h6 q-pa-md text-center">
      Generate Sidebar Transcript (XML Code)
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
          :options="productTypeOptions"
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
        @input="fileOutput = null"
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
        class="q-ma-sm text-white bg-negative"
        :disable="!hasData"
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
          @click="downloadResult(null, `${articleID}_transcript.xml`)"
        />
      </q-card-section>
    </template>
  </q-card>
</template>

<script>
import buildOutput from '../../mixins/buildOutput'
import programOptions from 'src/mixins/programOptions'
import downloadResult from 'src/mixins/downloadResult'
import tryCatch from 'src/mixins/tryCatch'
import articles from '../../../logic/articles'
import utils from '../../../logic/utils'
import {TOCElement} from '../../../logic/classes'
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
    }
  },
  methods: {
    reset() {
      this.articleID = ''
      this.file = null
      this.fileOutput = null
    },
    build(ticket) {
      let transcriptHTML = null
      let transcriptXML = null
      const createTranscript = () => {
        if(this.program.codeName == 'brief'){
          var mainTOCInstance = new TOCElement();
          // CLINICAL CONTEXT  
          var clinicalContext = articles.clinicalBrief.getClinicalContext(ticket);
          // SYNOPSIS AND PERSPECTIVE 
          var synopsisAndPerspective = articles.clinicalBrief.getSynopsisAndPerspective(ticket);
          // STUDY HIGHLIGHTS 
          var studyHighlights = articles.clinicalBrief.getStudyHighlights(ticket);
          // CLINICAL IMPLICATIONS 
          var clinicalImplications = articles.clinicalBrief.getClinicalImplications(ticket);
          ;
          mainTOCInstance.insertSectionElement(clinicalContext);
          mainTOCInstance.insertSectionElement(synopsisAndPerspective);
          mainTOCInstance.insertSectionElement(studyHighlights);
          mainTOCInstance.insertSectionElement(clinicalImplications);
          transcriptXML = utils.xmlOps.objectToXMLString(mainTOCInstance.toObjectLiteral())
        }else if(this.program.codeName == 'testAndTeach'){
          var mainContentTOCs = articles.testAndTeach.getMainContent(ticket, this.program);
          var resultXML = "";
          for (var i = 0; i < mainContentTOCs.mainTOCs.length; i++) {
              resultXML += utils.xmlOps.objectToXMLString(mainContentTOCs.mainTOCs[i].toObjectLiteral()) + "\n\n\n";
          }
          transcriptXML = resultXML;
        }else{
          transcriptHTML = prodticket.getArticleContent(ticket, this.program);
        }

        if (transcriptHTML instanceof Error) {
          console.log(transcriptHTML.toString())
          throw transcriptHTML;
        } else if (!transcriptXML) {
            // If no transcriptXML --> then we ran brief or test and teach functions.
            if (
                this.program.codeName == "spotlight" ||
                this.program.codeName == "curbside" ||
                this.program.codeName == "video" 
            ) {
                transcriptXML = utils.xmlOps.objectToXMLString(articles.spotlight.getTranscriptTOC(transcriptHTML, this.program).toObjectLiteral());
            } else if (this.program.codeName == "firstResponse") {
                transcriptXML = utils.xmlOps.objectToXMLString(articles.firstResponse.getTranscriptTOC(transcriptHTML, this.program).toObjectLiteral());
            } else if (this.program.codeName == "townHall") {
                transcriptXML = utils.xmlOps.objectToXMLString(articles.townHallEnduring.getTranscriptTOC(transcriptHTML, this.program).toObjectLiteral());
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