import "Classes/Globals";
import "Classes/Handlers";
import "Classes/Prototypes";

import { createRoot } from "react-dom/client";

import StylesheetList from "Classes/StylesheetList";
import MainPage from "Pages/Main";

createRoot (document.getElementById ("stylesheets")).render (<StylesheetList />);
createRoot (document.getElementById ("main")).render (<MainPage />);
