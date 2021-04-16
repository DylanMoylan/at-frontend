const formatQNAObjectives = require('../logic/utils/format-qna-objectives')
const objectives1Nested2 = `
<ul><li>Have increased knowledge regarding the
<ul><li>Consequences of the 2018 Farm Bill as it related to the sale of cannabidiol (CBD) to the general public</li>
<li>Considerations of the use of artisanal forms of cannabinoids</li></ul></li></ul>
`
const objectives2Nested1 = `
<ul><li>Have increased knowledge regarding the
<ul><li>Consequences of the 2018 Farm Bill as it related to the sale of cannabidiol (CBD) to the general public</li></ul></li>
<li>Demonstrate improved
<ul><li>Ability to check this out</li></ul></li></ul>
`

const objectives2Nested2 = `
<ul><li>Have increased knowledge regarding the
<ul><li>Consequences of the 2018 Farm Bill as it related to the sale of cannabidiol (CBD) to the general public</li>
<li>Considerations of the use of artisanal forms of cannabinoids</li></ul></li>
<li>Demonstrate improved
<ul><li>Ability to check this out</li>
<li>Awareness when verifying etc</li></ul></li></ul>
`

const nonHeaderObjectives = `
<ul><li>Assess the rate of renal allograft damage related to immune mediated causes</li>
<li>Distinguish the components and efficacy of a laboratory study to measure the risk for renal allograft rejection</li>
<li>Outline implications for the healthcare team</li></ul>
`
describe('Formatting QNA Objectives', () => {
    it('Handles empty string', () => {
        expect(formatQNAObjectives('')).toBe('Error formatting objectives')
    })
    it('Handles invalid data types', () => {
        // expect.assertions(2)
        expect(formatQNAObjectives(['test'])).toBe('Error formatting objectives')
        expect(formatQNAObjectives(null)).toBe('Error formatting objectives')
    })
    it('Handles a badly formatted string', () => {
        expect(formatQNAObjectives('Have increased knowledge of this thing')).toBe('Error formatting objectives.')
    })
    it('Handles a random string', () => {
        expect(formatQNAObjectives('Test string')).toBe('Test string')
    })
    it('Handles nested objective list', () => {
        expect(formatQNAObjectives(objectives1Nested2)).toMatch(/\n?Increased knowledge regarding the consequences of the 2018 Farm Bill as it related to the sale of cannabidiol \(CBD\) to the general public\nIncreased knowledge regarding the considerations of the use of artisanal forms of cannabinoids/)
    })
    it('Handles multiple objectives', () => {
        expect(formatQNAObjectives(objectives2Nested1)).toMatch(/\n?Increased knowledge regarding the consequences of the 2018 Farm Bill as it related to the sale of cannabidiol \(CBD\) to the general public\nImproved ability to check this out/)
    })
    it('Handles multiple nested objectives', () => {
        expect(formatQNAObjectives(objectives2Nested2)).toMatch(/\n?Increased knowledge regarding the consequences of the 2018 Farm Bill as it related to the sale of cannabidiol \(CBD\) to the general public\nIncreased knowledge regarding the considerations of the use of artisanal forms of cannabinoids\nImproved ability to check this out\nImproved awareness when verifying etc/)
    })
    it('Handles objectives that dont match any recognized headers', () => {
        expect(formatQNAObjectives(nonHeaderObjectives)).toMatch(/\n?Assess the rate of renal allograft damage related to immune mediated causes\nDistinguish the components and efficacy of a laboratory study to measure the risk for renal allograft rejection\nOutline implications for the healthcare team/)
    })
})