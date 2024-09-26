export interface IBaseModel {

	id: String;

}// IBaseModel;


export default abstract class BaseModel implements IBaseModel {

	public id: String = null;

}// BaseModel;