import "Classes/Common/Globals";
import "Classes/Common/Prototypes";
import "Classes/Common/NumericCurrency";
import "Classes/Common/Types";
import "Classes/Globals";
import "Classes/Handlers";

import BasePage from "Pages/Base";
import TestPage from "Test";

import { createRoot } from "react-dom/client";


const testing: Boolean = false;


switch (testing) {
	case true: createRoot (document.getElementById ("main")).render (<TestPage />); break;
	default: createRoot (document.getElementById ("main")).render (<BasePage />); break;
}// switch;

