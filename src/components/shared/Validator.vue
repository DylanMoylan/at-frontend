<template>
  <div>
      <template v-if="hasData">
          <div class="q-my-md text-white text-h6 q-ml-lg">Preview:</div>
          <q-card class="q-mt-md q-pa-md q-mx-lg">
              <q-card-section>
                  <div
                    v-for="(validation, key) in validations"
                    :key="`vl${key}`"
                    >
                        <div class="row items-center justify-between q-mb-md">
                            <div>
                                <q-icon
                                :name="validation.valid ? 'check' : 'highlight_off'" 
                                :class="validation.valid ? 'text-positive' : 'text-negative'"
                                class="q-mr-sm"
                                />
                                <span 
                                class="q-mr-md"
                                :class="validation.valid ? 'text-positive' : 'text-negative'">{{ validation.title }}:</span>
                            </div>
                            <div class="previewSnippet">{{ validation.message }}</div>
                        </div>
                        <div v-if="validation.qna" class="row items-center justify-between q-mb-md">
                            <q-icon
                                name="check"
                                class="q-mr-sm text-positive"
                                />
                                <span 
                                class="q-mr-md text-positive">Learning Objectives (QnA):</span>
                                <div class="previewSnippet" v-html="validation.qna.replace(/\n/g, '<br /><br />')" />
                        </div>
                  </div>
              </q-card-section>
              <codemirror ref="myCm"
                :value="beautifyTest" 
                :options="cmOptions"></codemirror>
          </q-card>
      </template>
  </div>
</template>

<script>
import formatQnA from '../../../logic/utils/format-qna-objectives'
import formatLOs from '../../../logic/utils/format-learning-objectives'
import { codemirror } from 'vue-codemirror'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/dracula.css'
import 'codemirror/mode/xml/xml.js'
import jsbeautify from 'js-beautify'

export default {
    props: ['output'],
    data() {
        return {
            test: `<ul><li>Assess the rate of renal allograft damage related to immune mediated causes</li>
<li>Distinguish the components and efficacy of a laboratory study to measure the risk for renal allograft rejection</li>
<li>Outline implications for the healthcare team</li></ul>`,
            cmOptions: {
                tabSize: 4,
                mode: 'text/html',
                theme: 'dracula',
                lineNumbers: true,
                line: true,
                lineWrapping: true
            }
        }
    },
    computed: {
        beautifyTest() {
            return jsbeautify.html(this.output.checklistHTML)
        },
        validations() {
            let validations = {
                goalStatement: {
                    valid: /<p>.*<\/p>/.test(this.output.checklistRaw.properties.goalStatement.result),

                },
                defaults: ['abbreviations','byline', 'cmeReviewers','abbreviations', 'cpyrtHolder', 'learningObjectives', 'peerReviewer', 'title', 'targetAudience','references', 'bkmtrFront', 'contrbtrPreContent', 'downloadableSlides', 'transcript', 'clinicalContext', 'studyHighlights', 'synopsisAndPerspective'],
                default: (key) => {
                    return typeof this.output.checklistRaw.properties[key].result == 'string' && this.output.checklistRaw.properties[key].result.length > 0
                }
            }
            function toCaps(match, p1, offset, string) {
                return match.replace(p1, p1.toUpperCase())
            }
            return Object.keys(this.output.checklistRaw.properties)
            .filter(key => Object.keys(validations).includes(key) || validations.defaults.includes(key))
            .map(key => {
                let result = this.output.checklistRaw.properties[key]
                if(!result) {
                    return {
                        title: key,
                        message: `Error: ${key} not found.`,
                        valid: false
                    }
                }
                let valid = Object.keys(validations).includes(key) ? validations[key] :
                validations.default(key)
                let title = result.printName.toLowerCase()
                title = (title.charAt(0).toUpperCase() + title.slice(1)).replace(/[ ](.)/g, toCaps)
                let output = {
                    valid,
                    title,
                    message: result.result.length ? result.result : 'None found'
                }
                if(key == 'learningObjectives') {
                    output.message = formatLOs(output.message)
                    output.qna = formatQnA(output.message)
                }
                return output
            })
        },
        hasData() {
            return this.output && this.output.checklistRaw && this.output.checklistRaw.properties && Object.keys(this.output.checklistRaw.properties).length > 0
        },
    },
    components: { codemirror }
}
</script>

<style>
    
</style>