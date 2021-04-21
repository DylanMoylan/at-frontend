import firebase from 'firebase/app'
import 'firebase/analytics'

export default {
    methods: {
        tryCatch(fn, eventName) {
            try {
                fn()
                if(eventName && !this.isLocalHost) {
                    this.defaultAnalytics.logEvent(`Creating a ${eventName}`)
                }
            } catch (error) {
                console.log('error: ', error);
                if(eventName && !this.isLocalHost) {
                    this.defaultAnalytics.logEvent(`${eventName} Error`)
                }
                this.$q.dialog({
                    title: 'There was an issue generating this file:',
                    message: error.toString()
                })
            }
        }
    },
    computed: {
        isLocalHost() {
            return /localhost/.test(window.location.href)
        }
    },
    mounted() {
        if(!this.isLocalHost){
            this.defaultAnalytics = firebase.analytics()
        }
    }
}