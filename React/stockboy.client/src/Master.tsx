import "Classes/Globals";
import "Classes/References";
import "Classes/Prototypes";

import { createRoot } from "react-dom/client";

import MainPage from "Main";
import StylesheetList from "Classes/StylesheetList";


createRoot (document.getElementById ("stylesheets")).render (<StylesheetList />);
createRoot (document.getElementById ("main")).render (<MainPage />);
