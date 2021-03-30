export default {
    methods: {
        copySnippet(snippet) {
            const text = document.createElement('textarea')
            document.body.appendChild(text)
            text.value = snippet
            text.select()
            document.execCommand('copy')
            document.body.removeChild(text)
            this.$q.notify({
                message: 'Copied to clipboard',
                icon: 'check',
                color: 'primary',
                textColor: 'white',
                position: 'bottom-right'
            })
        }
    }
}