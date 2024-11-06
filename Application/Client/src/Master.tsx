import "Classes/Globals";
import "Classes/Handlers";
import "Classes/NumericCurrency";
import "Classes/Prototypes";

import { createRoot } from "react-dom/client";

import MainPage from "Pages/Main";
import TestPage from "Pages/Test";


let testing: boolean = false;


switch (testing) {
	case true: createRoot (document.getElementById ("main")).render (<TestPage />); break;
	default: createRoot (document.getElementById ("main")).render (<MainPage />); break;
}// switch;

