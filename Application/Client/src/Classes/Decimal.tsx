export default class Decimal {

	public static padFractions (value: number, decimal_places: number): string {

		let parts: StringArray = value.toString ().parts (".", 1, 2);

		if (parts.length == 1) parts.push ("0");
		parts [1] = parts [1].padEnd (decimal_places, "0");

		return `${parts [0]}.${parts [1]}`;

	}// padFractions;


	public static round (value: number, decimal_places: number): number {
		return Math.round (value * 10**decimal_places) / 10**decimal_places;
	}// round;

}// Decimal;


