import BasePage from "Pages/Base";


export {}


declare global {

	var Administrator: boolean;
	var UserId: string;
	var Validated: boolean;

	var base_page: BasePage;

}// global;


globalThis.base_page = null;


Object.defineProperties (globalThis, {

	// TO DO: Validate administrator
	// TO DO: Encrypt end user credentials including full name, administrator status and user id
	Administrator: { get: function (): boolean { return true }},

	UserId: { get: function (): string { return localStorage.getItem ("key") ?? sessionStorage.getItem ("key") }},
	Validated: { get: function (): boolean { return isset (UserId) }}
});