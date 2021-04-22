<template>
    <div>
        <div v-if="buttons" class="row justify-end q-mb-md">
            <q-btn
                class="bg-positive text-white"
                no-caps
                label="Copy to Clipboard"
                @click="copySnippet(formattedOutput)"
            />
        </div>
        <codemirror
            :value="formattedOutput"
            :options="cmOptions"
        />
    </div>
</template>

<script>
import { codemirror } from 'vue-codemirror'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/dracula.css'
import 'codemirror/mode/xml/xml.js'
import jsbeautify from 'js-beautify'
import copySnippet from 'src/mixins/copySnippet'

export default {
    mixins: [copySnippet],
    props: {
        buttons: {
            type: Boolean,
            required: false,
            default: false
        },
        output: {
            type: String,
            required: true
        }
    },
    components: { codemirror },
    data() {
        return {
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
        formattedOutput() {
            return jsbeautify.html(this.output, {
                "indent_size": "4",
                "indent_char": " ",
                "max_preserve_newlines": "1",
                "preserve_newlines": true,
                "keep_array_indentation": false,
                "break_chained_methods": false,
                "indent_scripts": "normal",
                "brace_style": "collapse",
                "space_before_conditional": true,
                "unescape_strings": false,
                "jslint_happy": false,
                "end_with_newline": false,
                "wrap_line_length": "160",
                "indent_inner_html": false,
                "comma_first": false,
                "e4x": false,
                "indent_empty_lines": false,
                "unformatted": ["img"]
            })
        }
    }
}
</script>

<style scoped>
.vue-codemirror >>> .CodeMirror {
        width: 60vw;
    }
</style>