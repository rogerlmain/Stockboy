using Microsoft.AspNetCore.Mvc;
using Stockboy.Classes;
using Stockboy.Models;
using System.Text;


// DEPRECATED - Use LINQ instead
namespace Stockboy.Controllers {

	public abstract class DataController<TDataModel, TListModel> (DataContext context): Controller where TDataModel : class, IBaseModel, new() where TListModel : class, IBaseModel, new() {

		public JsonResult GetData (string command, GetParameters parameters) {
			try {
				return new JsonResult (Database.CallProcedure<TListModel> (command, parameters));
			} catch (Exception except) {
				return this.error_message (except.Message);
			}// try;
		}// GetData;


		public TDataModel? SaveData (TDataModel parameters) {

			TDataModel? result = default;

			if (is_null (parameters)) throw new Exception ("Parameters is null - bad data.");
			Boolean new_record = is_null (parameters.id);

			if (new_record) parameters.id = Guid.NewGuid ();
			result = new_record ? context.Set<TDataModel> ().Add (parameters).Entity : context.Set<TDataModel> ().Update (parameters).Entity;

			if (is_null (result)) throw new Exception ("Record could not be saved (don't ask me why)");

			context?.SaveChanges ();

			return result;

		}// SaveData;


		public JsonResult SaveData (string command, TDataModel parameters) {
			try {

				TDataModel? result = default;

				if (is_null (parameters)) throw new Exception ("Parameters is null - bad data.");
				Boolean new_record = is_null (parameters.id);

				if (new_record) parameters.id = Guid.NewGuid ();
				result = new_record ? context.Set<TDataModel> ().Add (parameters).Entity : context.Set<TDataModel> ().Update (parameters).Entity;

				if (is_null (result)) throw new Exception ("Record could not be saved (don't ask me why)");

				context?.SaveChanges ();

				TListModel? return_value = Database.CallProcedure<TListModel> (command, new BaseModel () { id = result!.id })?.First ();

				if (is_null (return_value)) throw new Exception ("Saved record could not be read (don't ask me why)");

				return new JsonResult (return_value);

			} catch (Exception except) {
				return new JsonResult (new { error = except.Message });
			}// try;
		}// SaveData;

	}// DataController;

}// Stockboy.Controllers;