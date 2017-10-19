
function asyncMap (callback, time=null) {
	let temp = this.slice(0)
	let c = true
	let interval = window.setInterval(()=>{
		c = callback(temp.shift(), this.length - temp.length, temp)
		if (temp.length == 0 || c == false) window.clearInterval(interval)
	}, time)
}

/*
 * Requires: asyncMap
 */
class Logger {
	constructor(){
		this.logs = new Array()
	}
	add(...messages){
		messages[0].map(message=>{console.log(message);this.logs.push(message)})
		return this
	}
	show(callback, async = false){
		let functionMapper = async ? asyncMap : Array.prototype.map
		functionMapper.bind(this.logs).bind(callback)
		return this
	}
}


// TEST
const l = new Logger()
l.add([1,2,3]).add([1,2,3]).show(e=>{
	console.log(e)
})

// TODO
/*
	Add events & listeners
*/
