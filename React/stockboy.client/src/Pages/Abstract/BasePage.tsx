import BaseControl from "Controls/Abstract/BaseControl";

import { IBaseProps, IBaseState } from "Controls/Abstract/BaseProperties";


export default abstract class BasePage<Props = IBaseProps, State = IBaseState> extends BaseControl<Props, State> {}