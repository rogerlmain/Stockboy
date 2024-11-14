export default abstract class BaseClass {

	constructor (values?: any) {
		if (isset (values)) Object.assign (this, values);
	}// constructor;

}// BaseClass;