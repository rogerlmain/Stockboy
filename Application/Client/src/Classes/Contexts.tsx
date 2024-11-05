import HoldingsData from "Classes/HoldingsData";
//import EditFormControl from "Controls/EditFormControl";
import MainPage from "Pages/Main";

import { Context, createContext } from "react";


export const MainPageContext: Context<MainPage> = createContext (null);
export const HoldingsDataContext: Context<HoldingsData> = createContext (null);
//export const EditFormContext: Context<EditFormControl> = createContext (null);


