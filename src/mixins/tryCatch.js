export default {
    methods: {
        tryCatch(fn) {
            try {
                fn()
            } catch (error) {
                console.log('error: ', error);
                this.$q.dialog({
                    title: 'There was an issue generating this file:',
                    message: error.toString()
                })
            }
        }
    }
}