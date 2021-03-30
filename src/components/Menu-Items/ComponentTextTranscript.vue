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
    </q-card-section>
    <template v-if="fileOutput">
      <q-separator />
      <q-card-section>
        <q-btn
          label="Download Transcript XML"
          no-caps
          class="bg-positive text-white q-mr-md"
          @click="downloadResult"
        />
      </q-card-section>
    </template>
  </q-card>
</template>

<script>
import buildOutput from '../../mixins/buildOutput'
import programOptions from 'src/mixins/programOptions'
import articles from '../../../logic/articles'
import utils from '../../../logic/utils'
import TOCElement from '../../../logic/classes/toc_element'
import prodticket from '../../../logic/prodticket'

export default {
  mixins: [buildOutput, programOptions],
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
    }
  },
  methods: {
    build(ticket) {
      let transcriptHTML = null
      let transcriptXML = null
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
        this.fileOutput = transcriptXML
    }
    },
    downloadResult() {
      const href = `data:application/octet-stream;charset=utf-8;base64,${window.btoa(unescape(encodeURIComponent(this.fileOutput)))}`
      const download = `${this.articleID}_transcript.xml`
      const link = document.createElement('a')
      link.href = href
      link.download = download
      link.click()
    }
  }
}
</script>

<style>

</style>