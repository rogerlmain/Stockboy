using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;
using System.Reflection;
using System.Runtime.CompilerServices;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;
using static Mysqlx.Expect.Open.Types.Condition.Types;


namespace Stockboy.Server.Classes {


	public static class DataExtensions {


		public static TModel? FindRecord<TModel> (this DbSet<TModel> source, TModel model) where TModel : class {

			IEnumerable<PropertyInfo>? keys = model.GetKeyFields ();
			if (is_null (keys) || is_null (model)) return null;

			Boolean KeyValuesMatch (TModel item) {

				foreach (PropertyInfo key in keys!) {
					if (is_null (item.GetValue (key.Name))) return false;
					if (!item.GetValue (key.Name)!.Matches (model.GetValue (key.Name))) return false;
				}// foreach;

				return true;

			}// KeyValuesMatch;

			foreach (TModel item in source) {
				if (KeyValuesMatch (item)) return item;
			}// foreach;

			return null;

		}// FindRecord;

		public static List<TModel> SelectAll<TModel> (this DbSet<TModel> dataset) where TModel : class => dataset.ToList ();

		public static Boolean UpdateRow<TModel> (this DbSet<TModel> dataset, TModel values, Boolean copy_nulls = false) where TModel : class {
			try {
				IEnumerable<PropertyInfo>? key_fields = values.GetKeyFields ();
				TModel? record = dataset.FindRecord (values);

				if (is_null (key_fields) || is_null (record)) {
					dataset.Add (values);
					return true;
				}// if;

				record!.Merge (values, copy_nulls);
				return true;

			} catch {
				return false;
			}// try;
		}// SaveChanged;

	}// DataExtensions;


	public static class ListExtensions {

		public static List<Model>? OrderBy<Model> (this List<Model> source, String sort_list) {

			String [] sort_fields = sort_list.Split (',');
			IOrderedQueryable<Model>? sorted_list = null;

			for (int i = 0; i < sort_fields.Count (); i++) {
				Boolean descending = sort_fields [i].Contains ("desc");
				if (i == 0) {
					sorted_list = source.SequentialOrderBy (sort_fields [i]);
					continue;
				}// if;
				sorted_list = sorted_list?.SequentialThenBy (sort_fields [i]);
			}// for;

			return sorted_list?.ToList ();
		}// OrderBy;

	}// ListExtensions;


	public static class ObjectExtensions {

		public static void Merge (this Object source, Object model, Boolean copy_nulls = false) {
			
			List<String>? keys = source.GetKeys ();

			if (source.GetType () != model.GetType ()) throw new Exception ("Cannot copy fields. Incompatible types.");
			if (is_null (keys)) throw new Exception ("Cannot copy fields. Nothing to copy.");

			foreach (String key in keys!) {
				if (is_null (model.GetValue (key)) && !copy_nulls) continue;
				source.GetType ().GetProperty (key)?.SetValue (source, model.GetValue (key));
			}// foreach;

		}// Merge;


		public static Model? Export<Model> (this Object model) => JsonConvert.DeserializeObject<Model> (JsonConvert.SerializeObject (model));


		public static IEnumerable<PropertyInfo>? GetKeyFields (this Object source) => source.GetType ().GetProperties ().Where (property => Attribute.IsDefined (property, typeof (KeyAttribute)));


		public static List<String>? GetKeys (this Object source) {
			List<String>? result = null;
			foreach (PropertyInfo property in source.GetType ().GetProperties ()) {
				result ??= new ();
				result.Add (property.Name);
			}
			return result;
		}// GetKeys;


		public static Object? GetValue (this Object source, String field) => source.GetType ().GetProperty (field)?.GetValue (source);


		public static Boolean IsGuid (this Object source) => source.GetType () == typeof (Guid);


		public static Boolean Matches (this Object source, Object? candidate) {
			if (candidate == null) return false;
			if (source.IsGuid ()) return source.Equals (candidate);
			if (source == candidate) return true;
			return false;
		}// Matches;

	}// ObjectExtensions;


	public static class PropertyInfoExtensions {
 		public static Boolean KeyAttribute (this PropertyInfo source) => Attribute.IsDefined (source, typeof (KeyAttribute));

	}// PropertyInfoExtensions;


	static class QueryableExtensions {

		public static IOrderedQueryable<Model> SequentialOrderBy<Model> (this List<Model> source, String sort_field) {
			Boolean descending = sort_field.Contains ("desc");
			if (descending) {
				sort_field = sort_field.Substring (0, sort_field.IndexOf ("desc")).Trim ();
				return source.AsQueryable ().OrderByDescending (item => item!.GetValue (sort_field));
			}
			return source.AsQueryable ().OrderBy (item => item!.GetValue (sort_field));
		}// SequentialOrderBy;


		public static IOrderedQueryable<Model>? SequentialThenBy<Model> (this IOrderedQueryable<Model> source, String sort_field) {
			Boolean descending = sort_field.Contains ("desc");
			if (descending) {
				sort_field = sort_field.Substring (0, sort_field.IndexOf ("desc")).Trim ();
				return (source.AsQueryable () as IOrderedQueryable<Model>)?.ThenByDescending (item => item!.GetValue (sort_field));
			}
			return (source.AsQueryable () as IOrderedQueryable<Model>)?.ThenBy (item => item!.GetValue (sort_field));
		}// SequentialThenBy;

	}// QueryableExtensions;

}// Stockboy.Server.Classes;