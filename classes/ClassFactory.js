const ClassFactory = function(json){
	const object = function(){
		const properties = {}
		const methods = {
			setProperty: (_param, _value)=>{
				if (properties.hasOwnProperty(_param))
					if (public_attributes.indexOf(_param) >= 0) properties[_param] = _value
				},
			getProperty: (..._params)=>{
				let res = new Object()
				_params = (_params.length == 0) ? public_attributes.concat(private_attributes) : _params
				_params.map(param=>{
					res[param] = properties[param]
				})
				return res
			}
		}

		let private_attributes = new Array()
		let public_attributes = new Array()
		let private_methods = new Array()
		let public_methods = 'setProperty,getProperty'.split(',')

		if (json.hasOwnProperty('properties'))
			Object.keys(json.properties).map(property=>{
				let temp = json.properties[property]
				properties[property] = temp.value
				if (temp.visibility === 0) private_attributes.push(property)
				else public_attributes.push(property)
			})
		if (json.hasOwnProperty('methods'))
			Object.keys(json.methods).map(method=>{
				let temp = json.methods[method]
				methods[method] = temp.value
				if (temp.visibility === 0) private_methods.push(method)
				else public_methods.push(method)
			})

		let public_properties = {}
		public_methods.map(property=>{ public_properties[property] = methods[property] })
		return public_properties
	}
	return object()
}