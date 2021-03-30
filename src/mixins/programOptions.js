import config from '../../logic/config'

export default {
    data() {
        return {
            productType: ''
        }
    },
    computed: {
        productTypeOptions() {
            return Object.keys(config.programs).map(key => {
              return config.programs[key].name
            })
        },
        program() {
            let p = Object.keys(config.programs).find(key => config.programs[key].name == this.productType)
            let selectedProgram = Object.assign({}, config.programs[p])
            selectedProgram.articleID = this.articleID
            selectedProgram.hasOUS = this.isOUS || false
            return selectedProgram
        }
    }
}