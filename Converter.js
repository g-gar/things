/*
 * Author: g-gar
 * Version: 1.0.0
 */

class Converter {
    constructor(){
        
    }
    static convert(string, unit){
        let units = void 0
        for (let i in this.UNITS) if (this.UNITS[i].indexOf(unit) > -1) units = this.UNITS[i]
        let temp = string.split(' ')
        return `${parseFloat(temp[0]) * Math.pow(10, units.indexOf(temp[1]) - units.indexOf(unit))}`
    }
    static get UNITS(){
        return {
            mass: "mg cg dg g dag hg kg".split(' '),
            length: "ym   zm   am X  fm  Å pm   nm   µm   mm cm dm m dam hm Km   Mm   Gm   Tm   Pm   Em   Zm   Ym".split(' ')
        }
    }
}
