using Microsoft.EntityFrameworkCore;
using Stockboy.Models;
using System.Runtime.CompilerServices;

using static Stockboy.Classes.Globals;


namespace Stockboy.Classes {

	public static class Globals {

		public static char comma = ',';
		public static char space = ' ';

		public static Boolean is_null (object value) => value == null;

		public static Boolean not_null (object value) => !is_null (value);

		public static ConfigurationRoot AppSettings () => (ConfigurationRoot) new ConfigurationBuilder ().SetBasePath (Directory.GetCurrentDirectory()).AddJsonFile ("appsettings.json", true, true).Build ();

	}// Globals;

}// Stockboy.Classes;
