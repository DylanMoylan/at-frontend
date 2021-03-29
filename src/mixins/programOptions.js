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
            let selectedProgram = Object.assign({}, Object.keys(config.programs).find(key => config.programs[key].name == this.productType))
            selectedProgram.articleID = this.articleID
            selectedProgram.hasOUS = this.isOUS || false
            return selectedProgram
        }
    }
}