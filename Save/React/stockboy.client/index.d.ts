import "react";


declare module "react" {

	interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
		active?: string;
		name?: string;
	}// HTMLAttributes;

}// module;

