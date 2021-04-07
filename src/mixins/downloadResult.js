export default {
    methods: {
        downloadResult(type, fileName = null) {
            let href
            let download = this.program.articleID
            switch(type) {
                case 'activity':
                    href = `data:application/octet-stream;charset=utf-8;base64,${window.btoa(unescape(encodeURIComponent(this.fileOutput.activityXML)))}`
                    download += '_activity.xml'
                    break
                case 'xml':
                    href = `data:application/octet-stream;charset=utf-8;base64,${window.btoa(unescape(encodeURIComponent(this.xmlResult)))}`
                    download += '.xml'
                    break
                case 'checklist':
                    href = `data:application/octet-stream;charset=utf-8;base64,${window.btoa(unescape(encodeURIComponent(this.fileOutput.checklistHTML)))}`
                    download += '_checklist.html'
                    break
                default:
                    href = `data:application/octet-stream;charset=utf-8;base64,${window.btoa(unescape(encodeURIComponent(this.fileOutput)))}`
                    download = fileName ? fileName : 'output.xml'
            }
            const link = document.createElement('a')
            link.href = href
            link.download = download
            link.click()
        }
    }
}