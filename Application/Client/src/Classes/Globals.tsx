import APIHandler from "Classes/Data/APIHandler";
import BasePage from "Pages/Base";


export {}


export enum DateFormat {
	readable,
	database
}// DateFormat;


declare global {

	var api_handler: APIHandler;

	var Administrator: boolean;
	var UserId: string;
	var Validated: boolean;

	var base_page: BasePage;

	var is_assigned: Function;
	var not_assigned: Function;

}// global;


globalThis.base_page = null;

global.api_handler = new APIHandler ();

global.is_assigned = (value: any): boolean => isset (value) && not_empty (value);
global.not_assigned = (value: any): boolean => !is_assigned (value);


Object.defineProperties (globalThis, {

	// TO DO: Validate administrator
	// TO DO: Encrypt end user credentials including full name, administrator status and user id
	Administrator: { get: function (): boolean { return true }},

	UserId: { get: function (): string { return localStorage.getItem ("key") ?? sessionStorage.getItem ("key") }},
	Validated: { get: function (): boolean { return isset (UserId) }}
});