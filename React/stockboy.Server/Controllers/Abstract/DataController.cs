using Microsoft.AspNetCore.Mvc;
using Stockboy.Server.Classes;
using Stockboy.Server.Models;
using System.Text;


namespace Stockboy.Server.Controllers {

	public abstract class DataController<TDataModel, TListModel> (DataContext context) : Controller where TDataModel : class, IBaseModel, new() where TListModel : class, IBaseModel, new() {

		public async Task<string> GetRequestBody () {
			if (!Request.Body.CanSeek) Request.EnableBuffering ();
			Request.Body.Position = 0;
			var reader = new StreamReader (Request.Body, Encoding.UTF8);
			var body = await reader.ReadToEndAsync ().ConfigureAwait (false);
			Request.Body.Position = 0;
			return body;
		}// GetRequestBody;


		public JsonResult GetData (string command, GetParameters parameters) {
			try {
				return new JsonResult (Database.CallProcedure<TListModel> (command, parameters));
			} catch (Exception except) {
				return new JsonResult (new { error = except.Message });
			}// try;
		}// GetData;

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

}// Stockboy.Server.Controllers;