using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.AspNetCore.Mvc.ModelBinding.Binders;
using Newtonsoft.Json;
using Stockboy.Models;


namespace Stockboy.Classes {

	public class BinderProvider: IModelBinderProvider {

		public IModelBinder? GetBinder (ModelBinderProviderContext context) {
			ArgumentNullException.ThrowIfNull (context);
			return new BinderTypeModelBinder (typeof (CustomBinder));
		}// GetBinder;

	}// BinderProvider;


	public class CustomBinder (DataContext data_context): IModelBinder {

		public Task BindModelAsync (ModelBindingContext binding_context) {
			try {

				Guid? user_id = binding_context.GetGuid ("user_id");

				if (not_set (user_id)) return Task.CompletedTask;

				UserRecord? user = binding_context.HttpContext.Session.GetObject<UserRecord> ("user");

				if (is_null (user)) {

					user = (from usr in data_context.users where usr.id == user_id select new UserRecord () {
						user_id = usr.id,
						first_name = usr.first_name,
						last_name = usr.last_name,
						email_address = usr.email_address,
						administrator = usr.administrator
					}).FirstOrDefault ();

					if (is_null (user)) throw new Exception ("Invalid User ID - User not found.");
					binding_context.HttpContext.Session.SetObject ("user", user!);
					return Task.CompletedTask;

				}// if;

				if (user!.user_id != user_id) throw new Exception ("Invalid User ID: User ID does not match.");
				return Task.CompletedTask;

			} finally {
				binding_context.Result = ModelBindingResult.Success (binding_context.GetValues ());
			}// try;

		}// BindModelAsync;

	}// CustomBinder;

}// Stockboy.Classes;