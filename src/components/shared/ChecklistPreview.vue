<template>
    <div>
        <template v-if="output">
            <div class="q-my-md text-white text-h6 q-ml-lg">Preview:</div>
            <q-card class="q-mx-lg q-mb-lg text-left" style="border-radius:0">
                <template v-if="outputIsString">
                    <editor :output="output" />
                </template>
                <template v-else>
                    <q-tabs
                        :value="defaultTab"
                        @input="val => tab = val"
                        dense
                        no-caps
                        align="left"
                        switch-indicator
                        indicator-color="positive"
                    >
                        <q-tab
                          v-for="(item, index) in outputToShow"
                          :name="item.value"
                          :label="item.label"
                          class="bg-black text-white q-mr-md"
                          :key="`tab${index}`" />
                    </q-tabs>
                    <q-separator />
                    <q-tab-panels :value="defaultTab">
                        <q-tab-panel
                            v-for="(item, index) in outputToShow"
                            :key="`tabP${index}`"
                            :name="item.value"
                        >
                            <editor :output="output[item.value]" buttons />
                        </q-tab-panel>
                    </q-tab-panels>
                </template>
            </q-card>
        </template>
    </div>
</template>

<script>
import Editor from './Editor.vue'

export default {
    props: ['output'],
    components: { Editor },
    data() {
        return {
            tab: '',
            cmOptions: {
                tabSize: 4,
                mode: 'text/html',
                theme: 'dracula',
                lineNumbers: true,
                line: true,
                lineWrapping: true
            },
        }
    },
    computed: {
        defaultTab() {
            if(this.tab.length > 0) {
                return this.tab
            }else{
                return Object.keys(this.output).includes('captionHTML') ? 'captionHTML' : 'checklistHTML'
            }
        },
        outputIsString() {
            return typeof this.output == 'string'
        },
        outputToShow() {
            return [
                {
                    value: 'checklistHTML', 
                    label: 'Checklist'
                },
                {
                    value: 'activityXML', 
                    label: 'Activity XML'
                },
                {
                    value: 'xmlResult', 
                    label: 'Article XML'
                },
                {
                    value: 'captionHTML', 
                    label: 'XML Captions'
                },
                {
                    value: 'vtt', 
                    label: 'VTT Captions'
                },
            ]
            .filter(item => Object.keys(this.output).includes(item.value))
        }
    }
}
</script>

<style scoped>
    .vue-codemirror >>> .CodeMirror {
        height: 500px!important;
        width: 60vw;
    }
</style>