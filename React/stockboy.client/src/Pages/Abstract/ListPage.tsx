import BasePage from "Pages/Abstract/BasePage";

import { IBaseProps, IBaseState } from "Controls/Abstract/BaseProperties";
import { ListControl } from "Controls/Abstract/ListControl";


export class ListPage<Props = IBaseProps, State = IBaseState> extends ListControl<Props, State> {}
