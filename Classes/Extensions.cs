using Microsoft.AspNetCore.Http.Extensions;
using Microsoft.AspNetCore.Mvc.Razor;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;
using System.Linq.Expressions;
using System.Reflection;

using static Stockboy.Classes.Globals;

namespace Stockboy.Classes {


	public static class DataExtensions {
		public static List<Model> SelectAll<Model> (this DbSet<Model> dataset) where Model : class => dataset.ToList ();
	}


	public static class DateOnlyExtensions {
		public static DateOnly Create (this DateOnly source, DateOnly date) {
			String [] parts = date.ToString ().Split ('-');
			return new DateOnly (int.Parse (parts [0]), int.Parse (parts [1]), int.Parse (parts [2]));
		}
	}


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

		}
	}


	public static class ObjectExtensions {

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
		}

		public static Object? GetValue (this Object source, String field) => source.GetType ().GetProperty (field)?.GetValue (source);

		public static Model? Export<Model> (this Object model) => JsonConvert.DeserializeObject<Model> (JsonConvert.SerializeObject (model));

		public static PropertyInfo KeyField (this Object source) => source.GetType ().GetProperties ().Where (property => property.GetCustomAttributes (typeof (KeyAttribute)).Any ()).First ();

		public static Boolean IsNumeric (this Object source) => source.GetType ().IsNumeric ();

	}


	public static class ListExtensions {

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
		}


		public static Boolean Includes (this List<PropertyInfo> source, PropertyInfo value) {
			foreach (PropertyInfo property in source) {
				if (property.Name == value.Name)  return true;
			}
			return false;
		}

	}


	static class PropertyInfoExtensions {
		public static Boolean IsNumeric (this PropertyInfo source) {
			if ((source.PropertyType == typeof (sbyte)) || (source.PropertyType == typeof (sbyte?))) return true;
            if ((source.PropertyType == typeof (byte)) || (source.PropertyType == typeof (byte?))) return true;
            if ((source.PropertyType == typeof (short)) || (source.PropertyType == typeof (short?))) return true;
            if ((source.PropertyType == typeof (ushort)) || (source.PropertyType == typeof (ushort?))) return true;
            if ((source.PropertyType == typeof (int)) || (source.PropertyType == typeof (int?))) return true;
            if ((source.PropertyType == typeof (uint)) || (source.PropertyType == typeof (uint?))) return true;
            if ((source.PropertyType == typeof (long)) || (source.PropertyType == typeof (long?))) return true;
            if ((source.PropertyType == typeof (ulong)) || (source.PropertyType == typeof (ulong?))) return true;
            if ((source.PropertyType == typeof (Int128)) || (source.PropertyType == typeof (Int128?))) return true;
            if ((source.PropertyType == typeof (UInt128)) || (source.PropertyType == typeof (UInt128?))) return true;
            if ((source.PropertyType == typeof (nint)) || (source.PropertyType == typeof (nint?))) return true;
            if ((source.PropertyType == typeof (nuint)) || (source.PropertyType == typeof (nuint?))) return true;
            if ((source.PropertyType == typeof (Half)) || (source.PropertyType == typeof (Half?))) return true;
            if ((source.PropertyType == typeof (float)) || (source.PropertyType == typeof (float?))) return true;
            if ((source.PropertyType == typeof (double)) || (source.PropertyType == typeof (double?))) return true;
            if ((source.PropertyType == typeof (decimal)) || (source.PropertyType == typeof (decimal?))) return true;
			return false;
		}
	}


	static class QueryableExtensions {

		public static IOrderedQueryable<Model> SequentialOrderBy<Model> (this List<Model> source, String sort_field) {
			Boolean descending = sort_field.Contains ("desc");
			if (descending) {
				sort_field = sort_field.Substring (0, sort_field.IndexOf ("desc")).Trim ();
				return source.AsQueryable ().OrderByDescending (item => item.GetValue (sort_field));
			}
			return source.AsQueryable ().OrderBy (item => item.GetValue (sort_field));
		}


		public static IOrderedQueryable<Model>? SequentialThenBy<Model> (this IOrderedQueryable<Model> source, String sort_field) {
			Boolean descending = sort_field.Contains ("desc");
			if (descending) {
				sort_field = sort_field.Substring (0, sort_field.IndexOf ("desc")).Trim ();
				return (source.AsQueryable () as IOrderedQueryable<Model>)?.ThenByDescending (item => item.GetValue (sort_field));
			}
			return (source.AsQueryable () as IOrderedQueryable<Model>)?.ThenBy (item => item.GetValue (sort_field));
		}

	}


	public static class RazorBasePageExtensions {

		public static string UriPath (this RazorPageBase source) => source.ViewContext.HttpContext.Request.GetEncodedPathAndQuery ().Split ("?") [0];

	}


	public static class StringExtensions {

		public static String ToHeader (this String value) => $"{char.ToUpper (value [0])}{value.Substring (1)}".Replace ("_", " ");

	}
}
