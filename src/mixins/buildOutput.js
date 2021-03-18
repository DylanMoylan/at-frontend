export default {
    methods: {
        generate() {
            const displayContents = this.build
            const reader = new FileReader()
            reader.onload = function(e) {
                displayContents(e.target.result)
            }
            reader.readAsText(this.file)
        }
    }
}