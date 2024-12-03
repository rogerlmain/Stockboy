export {}


declare global {
	var Administrator: boolean;
	var UserId: string;
	var Validated: boolean;
}// global;


Object.defineProperties (globalThis, {

	// TO DO: Validate administrator
	// TO DO: Encrypt end user credentials including full name, administrator status and user id
	Administrator: { get: function (): boolean { return true }},

	UserId: { get: function (): string { return localStorage.getItem ("key") ?? sessionStorage.getItem ("key") }},
	Validated: { get: function (): boolean { return isset (UserId) }}
});