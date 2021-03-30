<template>
  <q-card class="secundo">
      <q-card-section class="primo text-white text-h6 q-pa-md text-center">
          Generate Empty Slide Group TOC Elements (XML)
      </q-card-section>
      <q-card-section>
          <q-input
              filled
              stack-label
              label="Article ID"
              v-model="articleID"
              class="row q-ma-sm at-input"
          />
          <q-input
            filled
            stack-label
            label="Number of components"
            v-model="componentCount"
            class="row q-ma-sm at-input"
            type="number"
            :rules="[val => +val <= 20 || 'Limit 20 components']"
            @blur="setComponents"
          />
          <q-input
            v-for="component in components"
            :key="`comp${component.id}`"
            filled
            stack-label
            :label="`Number of Slides for Component #${component.id}`"
            v-model="component.value"
            class="row q-ma-sm at-input"
            type="number"
            :rules="[val => !!val || 'Field is required']"
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
            @click="go"
          />
          <q-btn
            :disable="!hasData"
            label="Reset"
            no-caps
            class="text-white bg-negative"
            @click="reset"
          />
      </q-card-section>
  </q-card>
</template>

<script>
import {TOCElement, SectionElement, SubsectionElement, SlideGroup, SlideComponent} from '../../../logic/classes'
import utils from '../../../logic/utils'
import Vue from 'Vue'

export default {
    data() {
        return {
            articleID: '',
            componentCount: '1',
            fileOutput: null,
            components: [{ id: '1', value: '1' }]
        }
    },
    computed: {
        missingData() {
            return !this.articleID.length || (this.components.findIndex(component => component.value.length === 0) > -1)
        },
        hasData() {
          return !!this.articleID.length || !!+this.componentCount > 1  || this.components.length > 1
        },
        infoObject() {
          return {
            articleID: this.articleID,
            isMultiComponent: +this.componentCount > 1 ? true : false,
            numberOfComponents: +this.componentCount,
            slideCount: this.components.map(component => +component.value)
          }
        }
    },
    methods: {
      reset() {
        this.articleID = ''
        this.componentCount = '1'
        this.fileOutput = null
        this.components = [{ id: '1', value: '1' }]
      },
        go() {
          let infoObject = this.infoObject
          let href, download, slidesTOC, slidesSection, slidesSubsection, slideGroup, slideComponent
          let tocArray = []; 
          let componentCount = infoObject.numberOfComponents;
          let result = ''
          let xmlString = ''
          for (var i = 0; i < componentCount; i++) {
              slidesTOC = new TOCElement();
              slidesSection = new SectionElement(); 
              slidesSubsection = new SubsectionElement(true, false, false);
              slideComponent = new SlideComponent(infoObject.articleID, (componentCount == 1 ? null: i + 1), '', infoObject.slideCount[i]).toObjectLiteral();
              for (var s = 0; s < slideComponent.numberOfSlides; s++) {
                  slideGroup = new SlideGroup(slideComponent.slidePath, s + 1);
                  slidesSubsection.insertSlideGroup(slideGroup);
              }
              slidesTOC.insertSectionElement(slidesSection);
              slidesSection.insertSubsectionElement(slidesSubsection);
              tocArray.push(slidesTOC);
          }
          for (var i = 0; i < tocArray.length; i++) {
              xmlString = utils.xmlOps.objectToXMLString(tocArray[i].toObjectLiteral());
              result += `${xmlString}\n\n`;
          } 
          try {
            result = utils.cleanHTML.cleanEntities(result)
            this.fileOutput = result
            try {
              href = `data:application/octet-stream;charset=utf-8;base64,${window.btoa(this.fileOutput)}`
              download = `${this.articleID}_slide-tocs.xml`
              continueDownload()
            } catch (error) {
              console.log('error: ', error);
            }
          } catch (error) {
            console.log('error: ', error.message);
          }
          function continueDownload() {
              const link = document.createElement('a')
              link.href = href
              link.download = download
              link.click()
          }
        },
        setComponents() {
          if(+this.componentCount <=20){
            let components = []
            for(let i=1; i<= +this.componentCount;i++) {
              components.push({
                id: i,
                value: '1'
              })
            }
            Vue.set(this, 'components', components)
          }
        }
    }
}
</script>

<style>

</style>