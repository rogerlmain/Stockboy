using Stockboy.Models;

namespace Stockboy.Classes {

	public static partial class Globals {

		private static IHttpContextAccessor context { get; set; } = new HttpContextAccessor ();

		public static UserRecord? current_user {

			get { return context.HttpContext?.Session.GetObject<UserRecord> ("user"); }

			set { 
				if (is_null (value)) throw new Exception ("Current user candidate is not defined.");
				context.HttpContext?.Session.SetObject ("user", value!); 
			}// setter;

		}// UserRecord;

	}// Globals;

}// Stockboy;