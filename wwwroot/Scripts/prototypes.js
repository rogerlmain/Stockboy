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


Object.defineProperty (HTMLElement.prototype, "firstSibling", { get: function () { return this.parentNode?.children?.[0] } });


Object.defineProperties (String.prototype, {

	isEmpty: { get: function () { return this.trim () == blank } },

	isNumber: { get: function () { return parseInt (this).toString () == this } },

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


/********/


HTMLElement.prototype.getBoolean = function (fieldname) {
	return this.getAttribute (fieldname)?.matches ("true") ?? false;
}