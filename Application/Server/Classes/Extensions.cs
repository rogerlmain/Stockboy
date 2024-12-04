using Common.Classes;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Newtonsoft.Json;
using Stockboy.Models;
using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;
using System.Reflection;


namespace Stockboy.Classes {

	public static class ControllerExtensions {

		[SuppressMessage ("Style", "IDE0060:Remove unused parameter", Justification = "Required")]
		public static JsonResult error_message (this Controller controller, string message) => new (new { error = message });


		[SuppressMessage ("Style", "IDE0060:Remove unused parameter", Justification = "Required")]
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


		public static Boolean LaterThan (this DateTime date, DateTime? comparison) => date > comparison;
		public static Boolean EarlierThan (this DateTime date, DateTime? comparison) => date < comparison;
		public static Boolean LaterThanNow (this DateTime date) => date.LaterThan (DateTime.Now);
		public static Boolean EarlierThanNow (this DateTime date) => date.EarlierThan (DateTime.Now);


	}// DateTimeExtensions;


	public static class DataExtensions {

		public static DbContext? GetContext<TModel> (this DbSet<TModel> dataset) where TModel : class {
			return ((dataset as IInfrastructure<IServiceProvider>).Instance.GetService (typeof (ICurrentDbContext)) as ICurrentDbContext)?.Context;
		}// GetContext;


		public static TModel SaveData<TModel> (this DbSet<TModel> dataset, TModel parameters) where TModel : class {

			Boolean new_record = not_set (parameters.GetValue ("id"));

			if (new_record) {
				parameters.SetValue ("id", Guid.NewGuid ());
				dataset.Add (parameters);
			} else {
				dataset.Update (parameters);
			}// if;

			dataset.GetContext ()?.SaveChanges ();
			return parameters;

		}// SaveData;


		public static JsonResult Save<TModel> (this DbSet<TModel> dataset, TModel parameters) where TModel : class {
			try {
				return new JsonResult (dataset.SaveData (parameters));
			} catch (Exception except) {
				return new JsonResult (new { error = except.Message });
			}// try;
		}// Save;

	}// DataExtensions;


	public static class DecimalExtensions {

		public static Decimal round (this Decimal value, int decimal_places) => Math.Round (value, decimal_places, MidpointRounding.AwayFromZero);

	}// DecimalExtensions;


	public static class HttpContextExtensions {

		private static String? ReadValues (this HttpContext context) {
			context.Request.EnableBuffering ();
			return new StreamReader (context.Request.Body).ReadEverything ();
		}// ReadValues;


		public static dynamic? GetValues (this HttpContext context, Type? model_type = null) {
			String? values = context.ReadValues ();
			if (is_null (values)) return null;
			if (is_null (model_type)) return StringCollection.FromJson (values!);
			return JsonConvert.DeserializeObject (values!, model_type!);
		}// GetValues;


		public static TModel? GetValues<TModel> (this HttpContext context) => GetValues (context, typeof (TModel));

	}// HttpContextExtensions;


	public static class ListExtensions {


		public static TModel? Find<TModel> (this IEnumerable<TModel> list, Func<TModel, Boolean> predicate) => list.FirstOrDefault<TModel> (next => predicate (next));


		public static List<TModel>? OrderBy<TModel> (this List<TModel> source, String sort_list) {

			String [] sort_fields = sort_list.Split (',');
			IOrderedQueryable<TModel>? sorted_list = null;

			for (int i = 0; i < sort_fields.Length; i++) {
				if (i == 0) {
					sorted_list = source.SequentialOrderBy (sort_fields [i]);
					continue;
				}// if;
				sorted_list = sorted_list?.SequentialThenBy (sort_fields [i]);
			}// for;

			return sorted_list?.ToList ();
		}// OrderBy;

	}// ListExtensions;


	public static class ModelBindingContextExtensions {

		public static Guid? GetGuid (this ModelBindingContext context, String name) {
			String? value = context.HttpContext.GetValues ()? [name];
			return isset (value) ? new Guid (value!) : null;
		}// GetGuid;

		public static dynamic? GetValues (this ModelBindingContext context) => context.HttpContext.GetValues (context.ModelType);

	}// ModelBindingContextExtensions;


	public static class ObjectExtensions {

		public static dynamic? Abort (this Object model) { throw new AbortException (); }


		public static TModel Merge<TModel> (this TModel source, Object model, Boolean copy_nulls = false) {

			StringList? keys = source?.GetKeys ();

			if (is_null (keys)) throw new Exception ("Cannot copy fields. Nothing to copy.");

			foreach (String key in keys!) {
				if (!model.HasKey (key)) continue;
				if (is_null (model.GetValue (key)) && !copy_nulls) continue;
				source?.GetType ().GetProperty (key)?.SetValue (source, model.GetValue (key));
			}// foreach;

			return source;

		}// Merge;


		public static Model? Export<Model> (this Object model) => JsonConvert.DeserializeObject<Model> (JsonConvert.SerializeObject (model));


		public static StringList? GetKeyFields (this Object source) {

			StringList? result = null;

			IEnumerable<PropertyInfo> keys = source.GetType ().GetProperties ().Where (property => Attribute.IsDefined (property, typeof (KeyAttribute)));

			foreach (PropertyInfo item in keys) {
				result ??= new ();
				result.Add (item.Name);
			}// foreach;

			return result;

		}// GetKeyFields;


		public static StringList? GetKeys (this Object source) {

			StringList? result = null;

			foreach (PropertyInfo property in source.GetType ().GetProperties ()) {
				result ??= new ();
				result.Add (property.Name);
			}// foreach;

			return result;

		}// GetKeys;


		public static Object? GetValue (this Object source, String field) => source.GetType ().GetProperty (field)?.GetValue (source);


		public static void SetValue (this Object source, String field, dynamic value) => source.GetType ().GetProperty (field)?.SetValue (source, value);


		public static Boolean HasKey (this Object source, String key) {

			StringList? keys = source.GetKeys ();

			if (is_null (keys)) return false;

			foreach (String source_key in keys!) {
				if (source_key == key) return true;
			}// foreach;

			return false;

		}// GetKeys;


		public static Boolean IsGuid (this Object source) => source.GetType () == typeof (Guid?);


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

		public static IOrderedQueryable<TModel> SequentialOrderBy<TModel> (this List<TModel> source, String sort_field) {
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


	static class SessionExtensions {
		
		public static void SetObject (this ISession session, String key, Object candidate) {
			session.SetString (key, JsonConvert.SerializeObject (candidate));
		}// SetObject;


		public static TModel? GetObject<TModel> (this ISession session, String key) {
			String? value = session.GetString (key);
			return isset (value) ? JsonConvert.DeserializeObject<TModel> (value!) : default;
		}// GetObject;

	}// SessionExtensions;


	public static class StreamReaderExtensions {

		public static dynamic? ReadEverything (this StreamReader reader) {
			if (reader.BaseStream.CanSeek) reader.BaseStream.Seek (0, SeekOrigin.Begin);
			String result = reader.ReadToEndAsync ().Result;
			if (reader.BaseStream.CanSeek) reader.BaseStream.Seek (0, SeekOrigin.Begin);
			return result;
		}// ReadEverything;

	}// StreamReaderExtensions;

}// Stockboy.Classes;