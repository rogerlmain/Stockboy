enum OperationType {
	add = 0,
	multiply = 1,
	subtract = 2,
}// OperationType;


class DecimalValue {

	public value: number;
	public mantissa: number;

	public constructor (value: number) {

		let parts: Array<string> = (value?.toString () ?? "0").parts (".", 1, 2);
		let values: Array<number> = null;
		let sign: string = conditional (parts [0][0] == "-", "-");

		if (parts.length == 1) parts.push ("0");
		
		this.mantissa = parts [1]?.trimmedEnd ("0").length;
		this.value = parseFloat (`${sign}${(Math.abs (parts [0].parseInt ()) * 10**this.mantissa) + parts [1]?.trimmed ("0").parseInt ()}`);

	}// constructor;

}// DecimalValue;


export default class Decimal {

	private static float_value = (value: number, mantissa: number) => (value == 0)? 0 : parseFloat (`${Math.trunc (value / (10**mantissa))}.${Math.abs (value) % (10**mantissa)}`);


	public static add (...values: Array<number>): number {

		let decimals: Array<DecimalValue> = null;
		let total: number = 0;
		let mantissa: number = 0;

		values.forEach ((value: number) => {
			if (is_null (decimals)) decimals = new Array<DecimalValue> ();
			decimals.push (new DecimalValue (value));
		});

		decimals.forEach ((value: DecimalValue) => {
			if (value.mantissa > mantissa) mantissa = value.mantissa;
		});

		decimals.forEach ((decimal: DecimalValue) => {
			total += decimal.value * (10**(mantissa - decimal.mantissa));
		});

		return Decimal.float_value (total, mantissa);
		//return (total == 0)? 0 : parseFloat (`${Math.trunc (total / (10**mantissa))}.${Math.abs (total) % (10**mantissa)}`);

	}// add;


	public static subtract (...values: Array<number>): number {

		let decimals: Array<DecimalValue> = null;
		let total: number = null;
		let mantissa: number = 0;

		values.forEach ((value: number) => {
			if (is_null (decimals)) decimals = new Array<DecimalValue> ();
			decimals.push (new DecimalValue (value));
		});

		decimals.forEach ((value: DecimalValue) => {
			if (value.mantissa > mantissa) mantissa = value.mantissa;
		});

		decimals.forEach ((decimal: DecimalValue) => {
			total = is_null (total) ? decimal.value : total - (decimal.value * (10**(mantissa - decimal.mantissa)));
		});

		return Decimal.float_value (total, mantissa);
		//return (total == 0)? 0 : parseFloat (`${Math.trunc (total / (10**mantissa))}.${Math.abs (total) % (10**mantissa)}`);

	}// add;


	public static multiply (...values: Array<number>): number {

		let total: number = 1;
		let mantissa: number = 0;
		
		values.forEach ((value: number) => {

			let decimal_value: DecimalValue = new DecimalValue (value);

			total *= decimal_value.value;
			mantissa += decimal_value.mantissa;

		});

		return Decimal.float_value (total, mantissa);
		//return (total == 0)? 0 : parseFloat (`${Math.floor (total / (10**mantissa))}.${total % (10**mantissa)}`);

	}// multiply;


	public static padFractions (value: number, decimal_places: number): string {

		let parts: Array<string> = value.toString ().parts (".", 1, 2);

		if (parts.length == 1) parts.push ("0");
		parts [1] = parts [1].padEnd (decimal_places, "0");

		return `${parts [0]}.${parts [1]}`;

	}// padFractions;


	public static round (value: number, decimal_places: number): number {

		if (is_null (value)) return null;

		let decimal = new DecimalValue (value);
		let fraction = decimal.value % (10**decimal.mantissa);

		return parseFloat (`${Math.floor (decimal.value / (10**decimal.mantissa))}.${Math.round (fraction / 10**(fraction.length - decimal_places))}`);

	}// round;

}// Decimal;


