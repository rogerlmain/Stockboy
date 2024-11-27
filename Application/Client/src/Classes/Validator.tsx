export default class Validator {

	public static get Validated () { return (isset (localStorage.getItem ("key")) || isset (sessionStorage.getItem ("key"))) }

}// Validator;