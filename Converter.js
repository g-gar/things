/*
 * Author: g-gar
 * Version: 1.0.1
 */

class Converter {
    constructor(){
        
    }
    static basicConvert(quantity, unitFrom, unitTo){
    	let units = void 0
    	let unitFrom_position = void 0
    	let unitTo_position = void 0

    	for (let i in this.UNITS) {
    		if ((unitFrom_position = this.UNITS[i].units.indexOf(unitFrom)) > -1 && (unitTo_position = this.UNITS[i].units.indexOf(unitTo)) > -1) {
    			units = this.UNITS[i].units
    			break
    		} else unitFrom_position, unitTo_position = void 0
    	}
    	console.log(unitFrom_position, unitTo_position)
    	return units && unitFrom_position && unitTo_position ? quantity * Math.pow(10, unitFrom_position - unitTo_position) : units
    }
    static convertString(string, unitTo){
        let temp = string.split(' ')
        return this.convert(parseFloat(temp[0]), temp[1], unitTo) 
    }
    static convert(params, unitTo){
    	let res = void 0
    	if (typeof params == 'string') res = this.convertString(params, unitTo)
    	return res
    }
    static get UNITS(){
        return {
            mass: {
            	units: 'mg cg dg g dag hg kg'.split(' '),
            	unit: 'g'
            },
            length: {
            	units: 'ym   zm   am X  fm  Å pm   nm   µm   mm cm dm m dam hm Km   Mm   Gm   Tm   Pm   Em   Zm   Ym'.split(' '),
            	unit: 'm'
            }
        }
    }
}
