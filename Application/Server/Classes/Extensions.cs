using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Newtonsoft.Json;
using Stockboy.Models;
using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;
using System.Reflection;


namespace Stockboy.Classes {

	public static class ControllerExtensions {

		public static JsonResult error_message (this Controller controller, string message) => new (new { error = message });


		public static JsonResult DeleteRecord<TModel> (this Controller controller, DbSet<TModel> dataset, IDataModel parameters) where TModel: DataModel {
			try {
				dataset.Where (item => item.id == parameters.id).ExecuteUpdate<IDataModel> (property => property.SetProperty (item => item.deleted, true));
				return new JsonResult (new { success = true });
			} catch (Exception except) {
				return new JsonResult (new { error = except.Message });
			}// try;
		}// DeleteBroker;

	}// ControllerExtensions;

	public static class DateTimeExtensions {
		
		public static long UnixTimestamp (this DateTime date) => (new DateTimeOffset (date).ToUnixTimeMilliseconds ());

	}// DateTimeExtensions;


	public static class DataExtensions {


		public static DbContext? GetContext<TModel> (this DbSet<TModel> dataset) where TModel : class {
			return ((dataset as IInfrastructure<IServiceProvider>).Instance.GetService (typeof (ICurrentDbContext)) as ICurrentDbContext)?.Context;
		}// GetContext;

		public static List<TModel> SelectAll<TModel> (this DbSet<TModel> dataset) where TModel : class => dataset.ToList ();


		public static JsonResult Save<TModel> (this DbSet<TModel> dataset, TModel parameters) where TModel : class {

			var key_fields = parameters.GetKeyFields ();

			try {
				switch (isset (parameters.GetKeyFields ()?.Find (next => isset (parameters.GetValue (next))))) {
					case true: dataset.Update (parameters); break;
					default: dataset.Add (parameters); break;
				}// switch;

				dataset.GetContext ()?.SaveChanges ();
				return new JsonResult (parameters);
			} catch (Exception except) {
				return new JsonResult (new { error = except.Message });
			}

		}// Save;

	}// DataExtensions;


	public static class DecimalExtensions {

		public static Decimal round (this Decimal value, int decimal_places) => Math.Round (value, decimal_places, MidpointRounding.AwayFromZero);

	}// DecimalExtensions;


	public static class ListExtensions {


		public static TModel? Find<TModel> (this IEnumerable<TModel> list, Func<TModel, Boolean> predicate) => list.FirstOrDefault<TModel> (next => predicate (next));


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

		public static dynamic? Abort (this Object model) { throw new AbortException (); }


		public static TModel Merge<TModel> ([NotNull] this TModel source, Object model, Boolean copy_nulls = false) {

			List<String>? keys = source?.GetKeys ();

			if (is_null (keys)) throw new Exception ("Cannot copy fields. Nothing to copy.");

			foreach (String key in keys!) {
				if (!model.HasKey (key)) continue;
				if (is_null (model.GetValue (key)) && !copy_nulls) continue;
				source?.GetType ().GetProperty (key)?.SetValue (source, model.GetValue (key));
			}// foreach;

			return source;

		}// Merge;


		public static Model? Export<Model> (this Object model) => JsonConvert.DeserializeObject<Model> (JsonConvert.SerializeObject (model));


		public static List<string>? GetKeyFields (this Object source) {

			List<string>? result = null;

			IEnumerable<PropertyInfo> keys = source.GetType ().GetProperties ().Where (property => Attribute.IsDefined (property, typeof (KeyAttribute)));

			foreach (PropertyInfo item in keys) {
				result ??= new ();
				result.Add (item.Name);
			}// foreach;

			return result;

		}// GetKeyFields;


		public static List<String>? GetKeys (this Object source) {

			List<String>? result = null;

			foreach (PropertyInfo property in source.GetType ().GetProperties ()) {
				result ??= new ();
				result.Add (property.Name);
			}// foreach;

			return result;

		}// GetKeys;


		public static Object? GetValue (this Object source, String field) => source.GetType ().GetProperty (field)?.GetValue (source);


		public static Boolean HasKey (this Object source, String key) {

			List<String>? keys = source.GetKeys ();

			if (is_null (keys)) return false;

			foreach (String source_key in keys!) {
				if (source_key == key) return true;
			}// foreach;

			return false;

		}// GetKeys;


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

}// Stockboy.Classes;