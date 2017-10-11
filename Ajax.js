class Ajax {
	constructor(options){
		this.xml = function(){
			try { return new window.XMLHttpRequest() } catch(e) {
				try { return new ActiveXObject("Msxml2.XMLHTTP.6.0") } catch (e) {
					try { return new ActiveXObject("Msxml2.XMLHTTP.3.0") } catch (e) {
						try { return new ActiveXObject("Microsoft.XMLHTTP") } catch (e) {
							throw new Error("This browser does not support XMLHttpRequest.");
						}
					}
				}
			}
		}()

		this.stack = new Array()

		let interval = window.setInterval(()=>{
			if (this.xml.readyState == 0 && this.stack.length > 0) {
				this.open()
				if (this.xml.readyState == 1) this.send()
			}
		})

		this.setOptions(options)
	}
	open(){
		this.setOptions(this.stack.shift())
		this.xml.open(this.options.method, this.options.url, this.options.async, this.options.username, this.options.password)
	}
	execute(options=null){
		this.stack.push(options)
		
		this.options.headers.map(e=>{
			this.xml.setRequestHeader(e[0], e[1])
		})
		this.xml.onreadystatechange = ()=>{
			if (this.options.callbacks.onprogress) this.xml.onprogress = this.options.callbacks.onprogress
			if (this.xml.readyState == 4){
				if (this.xml.status == 200) {
					if (this.options.callbacks.onsuccess) this.options.callbacks.onsuccess(this.xml.response)
					this.xml.abort()
				}
			}
		}

		return this
	}
	setOptions(options){
		let a = (variable, value)=>{return (!this.hasOwnProperty(variable) ? value : this[variable]) }

		this.options = a.call(this, 'options', new Object())
		let defaultValues = ['GET', null, true, null, null, new Array(), null, new Object()]
		'method url async user password headers message callbacks'
			.split(' ')
			.map((variable, i)=>{
				this.options[variable] = a.call(this.options, variable, options && options.hasOwnProperty(variable) ? options[variable] : defaultValues[i])
				if (variable == 'headers') this.options[variable].map(e=>e.split(':'))
			})

		this.options.callbacks = a.call(this.options, 'callbacks', new Object())
		let defaultCallbacks = [
			function(result){console.log(result)}, 
			function(result){console.log(result)}, 
			function(event){
				if (event.lengthComputable) console.log(`computable ${event.loaded}, ${event.total}, ${event.loaded / event.total}`)
				else console.log('not computable')}
		]
		'error success progress'
			.split(' ')
			.map((callback,i)=>{
				callback = `on${callback}`
				this.options.callbacks[callback] = a.call(this.options.callbacks, callback, options && options.callbacks && options.callbacks.hasOwnProperty(callback) ? options.callbacks[callback] : defaultCallbacks[i])
			})
		return this
	}
	send(message=null){
		if (!message) message = this.options.message
		this.xml.send(message)
		return this
	}
}