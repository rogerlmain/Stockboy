export default class TypedArray extends Array {

	public type: any;


	public assign (values: AnyArray | Object): typeof this {
		this.clear ();
		if (!Array.isArray (values)) values = [values];
		(values as AnyArray).forEach ((value: any) => this.push (new this.type ().assign (value)));
		return this;
	};// assign;


	public assign_values = (values: any) => {

		this.clear ();

		for (let item of values) {
			this.push (new this.type ().assign (item));
		}// for;

		return this;

	};// assign_values;


	public clear = () => this.splice (0, this.length);


	public update = (value: any, fieldname: string = "id"): TypedArray => {

		let current_value = this.find ((item: any) => item [fieldname] == fieldname);

		if (isset (current_value)) this.splice (this.indexOf (current_value), 1);
		this.push (new this.type ().assign (value));
		return this;

	};// update;


	public constructor (element_type: any) {
		super ();
		this.type = element_type;
	}// constructor;

}// TypedArray;