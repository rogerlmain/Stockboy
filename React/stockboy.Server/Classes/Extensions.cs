using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System.Reflection;


namespace Stockboy.Server.Classes {


	public static class DataExtensions {

		public static List<Model> SelectAll<Model> (this DbSet<Model> dataset) where Model : class => dataset.ToList ();

	}// DataExtensions;

/*
	public static class DateOnlyExtensions {

		public static DateOnly Create (this DateOnly source, DateOnly date) {
			String [] parts = date.ToString ().Split ('-');
			return new DateOnly (int.Parse (parts [0]), int.Parse (parts [1]), int.Parse (parts [2]));
		}// Create;

	}// DateOnlyExtensions;


	public static class DbContextExtensions {

		public static Model ExecuteProcedure<Model> (this DbContext context, String query, Dictionary<String, Object> parameters) {

			int index = 0;
			string? parameter_list = null;
			SqlParameter [] query_parameters = new SqlParameter [parameters.Count];

			foreach (KeyValuePair<String, Object> next_parameter in parameters) {
				parameter_list = (parameter_list is null) ? String.Empty : $"{parameter_list}, ";
				parameter_list = $"{parameter_list} @{next_parameter.Key}";
				query_parameters [index] = new SqlParameter (next_parameter.Key, next_parameter.Value);
				index++;
			}

			return context.Database.SqlQueryRaw<Model> ($"{query} {parameter_list}", query_parameters).ToList ().First ();

		}// ExecuteProcedure;

	}// DbContextExtensions;

*/
	public static class ObjectExtensions {
/*
		public static Boolean IsList (this Object item) => item.GetType ().GetGenericTypeDefinition () == typeof (List<>);

		public static List<PropertyInfo> DisplayFields (this Object item) {
			List<PropertyInfo> result = new ();

			Type item_type = (item is Type) ? (Type) (item) : (item.IsList () ? item.GetType ().GetGenericArguments () [0] : item.GetType ());
			if (item_type?.BaseType is not null) result.AddRange (item_type?.BaseType.DisplayFields ());

			foreach (PropertyInfo info in item_type.GetProperties ().ToList ()) {
				if (result.Includes (info)) continue;
				result.Add (info);
			}

			return result;
		}// DisplayFields;


		public static String? Format (this Object row, String field) {

			Type type = row.GetType ();
			Object? value = row.GetValue (field);
			PropertyInfo? property = type.GetProperty (field);

			if (is_null (value) || is_null (property)) return null;
			if (property.IsCurrency ()) return String.Format ("{0:0.00}", row.GetValue (field));

			switch (value.GetType ().Name) {
				case "DateTime": return ((DateTime) value).ToString ("MM-dd-yyyy");
				case "Decimal": return value.ToString ();
			}// switch;

			return row.GetValue (field) as String;

		}// Format;
*/

		public static List<String>? GetKeys (this Object source) {
			List<String>? result = null;
			foreach (PropertyInfo property in source.GetType ().GetProperties ()) {
				result ??= new ();
				result.Add (property.Name);
			}
			return result;
		}// GetKeys;


		public static Object? GetValue (this Object source, String field) => source.GetType ().GetProperty (field)?.GetValue (source);


		public static Model? Export<Model> (this Object model) => JsonConvert.DeserializeObject<Model> (JsonConvert.SerializeObject (model));
/*
		public static PropertyInfo KeyField (this Object source) => source.GetType ().GetProperties ().Where (property => property.GetCustomAttributes (typeof (KeyAttribute)).Any ()).First ();


		public static Boolean IsNumeric (this Object source) {
			if ((source.GetType () == typeof (sbyte)) || (source.GetType () == typeof (sbyte?))) return true;
            if ((source.GetType () == typeof (byte)) || (source.GetType () == typeof (byte?))) return true;
            if ((source.GetType () == typeof (short)) || (source.GetType () == typeof (short?))) return true;
            if ((source.GetType () == typeof (ushort)) || (source.GetType () == typeof (ushort?))) return true;
            if ((source.GetType () == typeof (int)) || (source.GetType () == typeof (int?))) return true;
            if ((source.GetType () == typeof (uint)) || (source.GetType () == typeof (uint?))) return true;
            if ((source.GetType () == typeof (long)) || (source.GetType () == typeof (long?))) return true;
            if ((source.GetType () == typeof (ulong)) || (source.GetType () == typeof (ulong?))) return true;
            if ((source.GetType () == typeof (Int128)) || (source.GetType () == typeof (Int128?))) return true;
            if ((source.GetType () == typeof (UInt128)) || (source.GetType () == typeof (UInt128?))) return true;
            if ((source.GetType () == typeof (nint)) || (source.GetType () == typeof (nint?))) return true;
            if ((source.GetType () == typeof (nuint)) || (source.GetType () == typeof (nuint?))) return true;
            if ((source.GetType () == typeof (Half)) || (source.GetType () == typeof (Half?))) return true;
            if ((source.GetType () == typeof (float)) || (source.GetType () == typeof (float?))) return true;
            if ((source.GetType () == typeof (double)) || (source.GetType () == typeof (double?))) return true;
            if ((source.GetType () == typeof (decimal)) || (source.GetType () == typeof (decimal?))) return true;
			return false;
		}// IsNumeric;
*/
	}// ObjectExtensions;


	public static class ListExtensions {
/*
		public static Boolean Includes (this List<PropertyInfo> source, PropertyInfo value) {
			foreach (PropertyInfo property in source) {
				if (property.Name == value.Name)  return true;
			}
			return false;
		}// Includes;


		public static String Join (this List<String> source, String delimiter) => String.Join (delimiter, source.ToArray ());

*/
		public static List<Model>? OrderBy<Model> (this List<Model> source, String sort_list) {

			String [] sort_fields = sort_list.Split (',');
			IOrderedQueryable<Model>? sorted_list = null;

			for (int i = 0; i < sort_fields.Count (); i++) {
				Boolean descending = sort_fields [i].Contains ("desc");
				if (i == 0) {
					sorted_list = source.SequentialOrderBy (sort_fields [i]);
					continue;
				}
				sorted_list = sorted_list?.SequentialThenBy (sort_fields [i]);
			}

			return sorted_list?.ToList ();
		}// OrderBy;


	}// ListExtensions;
/*

	public static class PropertyInfoExtensions {
 		public static Boolean IsCurrency (this PropertyInfo source) => Attribute.IsDefined (source, typeof (Currency));

	}// PropertyInfoExtensions;

*/
	static class QueryableExtensions {

		public static IOrderedQueryable<Model> SequentialOrderBy<Model> (this List<Model> source, String sort_field) {
			Boolean descending = sort_field.Contains ("desc");
			if (descending) {
				sort_field = sort_field.Substring (0, sort_field.IndexOf ("desc")).Trim ();
				return source.AsQueryable ().OrderByDescending (item => item!.GetValue (sort_field));
			}
			return source.AsQueryable ().OrderBy (item => item!.GetValue (sort_field));
		}


		public static IOrderedQueryable<Model>? SequentialThenBy<Model> (this IOrderedQueryable<Model> source, String sort_field) {
			Boolean descending = sort_field.Contains ("desc");
			if (descending) {
				sort_field = sort_field.Substring (0, sort_field.IndexOf ("desc")).Trim ();
				return (source.AsQueryable () as IOrderedQueryable<Model>)?.ThenByDescending (item => item!.GetValue (sort_field));
			}
			return (source.AsQueryable () as IOrderedQueryable<Model>)?.ThenBy (item => item!.GetValue (sort_field));
		}

	}
/*

	public static class StringExtensions {

		public static String Substr (this String value, int start_index, int end_index, Boolean inclusive = false) {
			int modifier = inclusive ? 0 : 1;
			return value.Substring (start_index + modifier, end_index - (start_index + modifier));
		}// Substring;


		public static String ToHeader (this String value) => $"{char.ToUpper (value [0])}{value.Substring (1)}".Replace ("_", " ");

	}// StringExtensions;
*/
}// Stockboy.Server.Classes;