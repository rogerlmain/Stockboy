Document.prototype.broadcastEvent = function (event) {
	for (let element of document.querySelectorAll ("*")) {
		element.dispatchEvent (event);
	}
}


/**** Array Extensions ****/


Array.prototype.bump = function (element) {
	if (!this.includes (element)) return;
	this.remove (element);
	this.unshift (element);
}


Array.prototype.remove = function (element) {
	this.splice (this.indexOf (element), 1);
}


/**** Date Extensions ****/


Object.defineProperties (Date.prototype, {

	month: { get: function () { return (this.getMonth () + 1).toString ().leftPadded ("0", 2) } },
	day: { get: function () { return this.getDate ().toString ().leftPadded ("0", 2) } },
	year: { get: function () { return this.getFullYear () } },
	hour: { get: function () { return (this.getHours > 11 ? (this.getHours () - 12) : this.getHours ()) + 1 } },
	minute: { get: function () { return this.getMinutes ().toString ().leftPadded ("0", 2) } },
	meridian: { get: function () { return (this.getHours < 12) ? "AM" : "PM" } },

	now: { get: function () { return `${this.year}-${this.month}-${this.day}T${this.getHours ().toString ().leftPadded ("0", 2)}:${this.minute}` } },
	today: { get: function () { return `${this.year}-${this.month}-${this.day}`} }

});


/**** String Extensions ****/


Object.defineProperties (String.prototype, {

	isEmpty: { get: function () { return this.trim () == blank } },

	isNumber: { get: function () { 
		for (let char of this) {
			if (!digits.includes (parseInt (char))) return false;
		}
		//return parseInt (this).toString () == this } },
		return true;
	} },

	integerValue: { 
		get: function () {
			let result = parseInt (this);
			return (result.toString () == this) ? result : 0;
		} 
	},

	parseNumeric: { 
		get: function () {
			let result = blank;
			for (let char of this) {
				if (digits.includes (parseInt (char))) result += char;
			}
			return result;
		}
	}

});


String.prototype.leadingCharacters = function (char) {
	let result = 0;
	let value = this;
	while ((value.length > 0) && (value [0] == char)) {
		result++;
		value = value.substring (1);
	}
	return result;
}


String.prototype.matches = function (value) {
	return this.trim ().toLowerCase () == value.trim ().toLowerCase ();
}


String.prototype.leftPadded = function (char, size) {
	let result = this;
	while (result.length < size) result = `${char}${this}`;
	return result;
}


/**** HTMLElement Extensions ****/


Object.defineProperties (HTMLElement.prototype, {

	active: { 
		get: function () { return this.getAttribute ("active") },
		set: function (value) {
			if (value === true) {
				this.removeAttribute ("disabled");
				this.setAttribute ("required", "true");
				return;
			}
			this.removeAttribute ("required");
			this.setAttribute ("disabled", "true");
		}
	},

	firstSibling: { get: function () { return this.parentNode?.children?.[0] } }

});


HTMLElement.prototype.bindEvent = function (event, method) {
	this.removeEventListener (event, method);
	this.addEventListener (event, method);
}


HTMLElement.prototype.getBoolean = function (fieldname) {
	return this.getAttribute (fieldname)?.matches ("true") ?? false;
}


HTMLElement.prototype.broadcastEvent = Document.prototype.broadcastEvent;


/********/


