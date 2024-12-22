export default class LocalDate extends Date {

	constructor (input_date: StringDate) {

		let gmt_date: Date = new Date (input_date);
		let new_date: Date = new Date (Date.UTC (gmt_date.getFullYear (), gmt_date.getMonth (), gmt_date.getDate (), gmt_date.getHours (), gmt_date.getMinutes (), gmt_date.getSeconds ()));

		super (new_date.toLocaleString ());

	}// constructor;

}// LocalDate;