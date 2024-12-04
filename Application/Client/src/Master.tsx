import "Classes/Common/Globals";
import "Classes/Common/NumericCurrency";
import "Classes/Common/Prototypes";
import "Classes/Common/Types";
import "Classes/Globals";
import "Classes/Handlers";

import BasePage from "Pages/Base";
import TestPage from "Pages/Test";

import { createRoot } from "react-dom/client";


const testing: boolean = true;


if (testing) {
	createRoot (document.getElementById ("main")).render (<TestPage />);
} else {
	createRoot (document.getElementById ("main")).render (<BasePage />);
}// if;

