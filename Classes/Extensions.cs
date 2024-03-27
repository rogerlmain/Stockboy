using Newtonsoft.Json.Linq;
using System.ComponentModel;

namespace Stockboy.Classes {
	public static class Objects {

		public static Dictionary<String, dynamic?> ToDictionary (dynamic item) {
			Dictionary<string, Object?> dictionary = new ();
			foreach (PropertyDescriptor propertyDescriptor in TypeDescriptor.GetProperties (item)) {
				dynamic? value = propertyDescriptor.GetValue (item);
				if (value?.GetType () == typeof (JObject)) {
					dictionary.Add (propertyDescriptor.Name, ToDictionary (value));
					continue;
				}
				dictionary.Add (propertyDescriptor.Name, value);
			}
			return dictionary;
		}

		public static object? value (this object item, string name) => item.GetType ().GetProperty (name)?.GetValue (item, null);

		public static List<Model> OrderBy<Model> (this List<Model> values, string fieldname) where Model : class => values.OrderBy (item => item.value (fieldname)).ToList ();

	}
}
