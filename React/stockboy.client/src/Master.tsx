import "Classes/Globals";
import "Classes/References";
import "Classes/Prototypes";
import "Classes/Handlers";

import { createRoot } from "react-dom/client";

import StylesheetList from "Classes/StylesheetList";
import MainPage from "Pages/Main";

createRoot (document.getElementById ("stylesheets")).render (<StylesheetList />);
createRoot (document.getElementById ("main")).render (<MainPage />);
