export interface IBaseModel { id: string }


export default abstract class BaseModel implements IBaseModel { public id: string = null }