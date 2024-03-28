using Newtonsoft.Json.Linq;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Reflection;

using static Stockboy.Classes.Globals;

namespace Stockboy.Classes {
	public static class Objects {

		public static Object? value (this Object item, string name) => item.GetType ().GetProperty (name)?.GetValue (item, null);

		public static PropertyInfo KeyField (this Object item) => item.GetType ().GetProperties ().Where (property => property.GetCustomAttributes (typeof (KeyAttribute)).Any ()).First ();

		public static List<PropertyInfo> DisplayFields (this Object item) => item.GetType ().GetProperties ().Where (property => !property.GetCustomAttributes (typeof (KeyAttribute)).Any ()).ToList ();

	}

	public static class Lists {

		public static List<Model> OrderBy<Model> (this List<Model> values, string fieldname) where Model : class => values.OrderBy (item => item.value (fieldname)).ToList ();

	}

	public static class Types {

		public static int InheritanceLevel (this PropertyInfo info) {
			int result = 0;
			Type? info_type = info.DeclaringType;
			while (not_null (info_type?.BaseType)) {
				result++;
				info_type = info_type.BaseType;
			}
			return result;
		}

	}

	public static class Strings {

		public static String ToHeader (this String value) => $"{char.ToUpper (value [0])}{value.Substring (1)}".Replace ("_", " ");

	}
}
