export interface IBaseModel {

	id: string;

}// IBaseModel;


export default abstract class BaseModel implements IBaseModel {

	public id: string = null;

}// BaseModel;