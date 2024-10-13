class decimal_value {

	public value: number;
	public mantissa: number;


	public constructor (string_value: string) {

		let parts: Array<string> = string_value.parts (".", 1, 2);
		let values: Array<number> = null;

		if (parts.length == 1) parts.push ("0");
		
		parts [1] = parts [1].trimmedEnd ("0");
		values = parts.getIntegers ();

		this.mantissa = parts [1]?.length;
		this.value = (values [0] * 10**this.mantissa) + values [1];

	}// constructor;

}// decimal_value;


export default class Decimal {

	public static multiply (...floats: Array<string>): string {

		let decimals: Array<decimal_value> = null;
		let values: number = 0;
		let mantissae: number = 0;
		
		floats.forEach ((value: string) => {
			if (is_null (decimals)) decimals = new Array<decimal_value> ();
			decimals.push (new decimal_value (value));
		});

		decimals.forEach ((decimal: decimal_value) => {
			values = (values == 0) ? decimal.value : values *= decimal.value;
			mantissae += decimal.mantissa;
		});

		return (values == 0)? null : `${Math.floor (values / (10**mantissae))}.${values % (10**mantissae)}`;

	}// multiply;


	public static round (value: string, decimal_places: number): string {

		if (is_null (value)) return null;

		let decimal = new decimal_value (value);
		let fraction = decimal.value % (10**decimal.mantissa);

		return `${Math.floor (decimal.value / (10**decimal.mantissa))}.${Math.round (fraction / 10**(fraction.length - decimal_places))}`;

	}// round;

}// Decimal;


