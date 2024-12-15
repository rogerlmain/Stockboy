using Server.Classes;
using Stockboy.Models;

namespace Stockboy.Classes {

	public class AbortException: Exception {
		public AbortException () : base ("aborted") { }
	}// AbortException;


	public static partial class Globals {

		public const char comma = ',';
		public const char space = ' ';

		public const string no_data = "No data available";


		public static bool is_null (object? value) => value == null;
		public static bool not_null (object? value) => !is_null (value);
		public static bool isset (object? value) => !not_set (value);
		public static bool not_set (object? value) => is_null (value) || value is string && value.ToString () == string.Empty || value is Array && (value as Array)!.Length == 0;

		private static HttpContextAccessor context { get; set; } = new HttpContextAccessor ();


		public static ConfigurationRoot AppSettings () => (ConfigurationRoot) new ConfigurationBuilder ().SetBasePath (Directory.GetCurrentDirectory ()).AddJsonFile ("appsettings.json", true, true).Build ();


		public static UserRecord? current_user {

			get { return context.HttpContext?.Session.GetObject<UserRecord> ("user"); }

			set { 
				if (is_null (value)) throw new Exception ("Current user candidate is not defined.");
				context.HttpContext?.Session.SetObject ("user", value!); 
			}// setter;

		}// UserRecord;

	}// Globals;

}// Stockboy;