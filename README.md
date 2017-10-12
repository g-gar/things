# Things
Just a bunch of code 

| Languages    |
|:------------:|
| Javascript   |
| Java 	       |
| CSS/HTML     |

## Description

### Ajax.js
ES6 JavaScript class which tries to make simpler AJAX requests by making instantiation, opening, sending, and setting methods (for success, error and download progress events) parts of the request more easy and faster to access. It also supports requests chaining and reusing configuration options between requests.
Still in progress. Feel free to suggest anything.

```JavaScript
let configuration = {
	url: 'https://www.your-domain.com?id=25',
	callbacks: {
		onsuccess: (result)=>{/* do something with result */}
	}
}
let ajax = void 0
ajax = new Ajax(configuration)
// OR
ajax = new Ajax().execute(condiguration)

// REQUEST CHAINING
function lengthInUtf8Bytes(str) {
	// FROM: https://stackoverflow.com/questions/5515869/string-length-in-bytes-in-javascript
	// Matches only the 10.. bytes that are non-initial characters in a multi-byte sequence.
	let m = encodeURIComponent(str).match(/%[89ABab]/g)
	return str.length + (m ? m.length : 0)
}
let content = 'abcdefghijklmnopqrstuvwxyz'
let configuration1 = {
	method: 'POST',
	url: 'https://www.your-domain.com?operation=upload',
	headers: ['Content-type: x-www-form-urlencoded', `content-length: ${lengthInUtf8Bytes(content)}`],
	message: content
	callbacks: {
		onsuccess: (result)=>{/* do something with result */},
		onerror: (result)=>{/* do something with result */}
	}
}
ajax = new Ajax(configuration).execute().execute(configuration1)
// OR
ajax = new Ajax().execute(configuration).execute(configuration1)
```
#### List of parameters
| Parameters | Required |
|:----------:|:--------:|
|   method   |   false  |
|    async   |   false  |
|  username  |   false  |
|   message  |   false  |
|   headers  |   false  |
|  callbacks |   false  |
|     url    |   true   |