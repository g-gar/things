const Item = function(json){
	/* VARIABLES DEFINITION */
	let properties = {
		id: null,
		category: null,
		tags: new Array(),
		title: null,
		account: null,
		value: null,
		date: null,
		status: null,
		description: null
	}
	let private_attributes = 'id'.split(',')
	let public_attributes = Object.keys(properties).filter(e=>private_attributes.indexOf(e) < 0)
	let constructor_executed = false

	/* METHOD DEFINITION */
	let methods = {
		setProperty: (_param, _value)=>{
			if (properties.hasOwnProperty(_param))
				if (!constructor_executed) properties[_param] = _value
				else if (public_attributes.indexOf(_param) >= 0) properties[_param] = _value
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
	let public_methods = 'getProperty,setProperty'.split(',')
	/* CONSTRUCTOR */
	Object.keys(json).map((property, index, array)=>{
		methods.setProperty(property, json[property])
		if (index === array.length - 1) constructor_executed = true
	})
	
	/* PUBLIC PROPERTIES */
	let public_properties = {}
	public_attributes.concat(private_attributes).map(property=>{ public_properties[property] = properties[property] })
	public_methods.map(property=>{ public_properties[property] = methods[property] })

	return public_properties
}