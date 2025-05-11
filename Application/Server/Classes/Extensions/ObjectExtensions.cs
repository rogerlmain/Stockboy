using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;
using System.Reflection;


namespace Stockboy.Classes.Extensions {
	public static class ObjectExtensions {

		public static dynamic? Abort (this object model) { throw new AbortException (); }


		public static TModel Merge<TModel> (this TModel source, object? model, bool copy_nulls = false) {

			if (model is null) return source;

			StringList? keys = source?.GetKeys ();

			if (is_null (keys)) throw new Exception ("Cannot copy fields. Nothing to copy.");

			foreach (string key in keys!) {
				if (!model.HasKey (key)) continue;
				if (is_null (model.GetValue (key)) && !copy_nulls) continue;
				source?.GetType ().GetProperty (key)?.SetValue (source, model.GetValue (key));
			}// foreach;

			return source;

		}// Merge;


		public static Model? Export<Model> (this object model) => JsonConvert.DeserializeObject<Model> (JsonConvert.SerializeObject (model));


		public static StringList? GetKeyFields (this object source) {

			StringList? result = null;

			IEnumerable<PropertyInfo> keys = source.GetType ().GetProperties ().Where (property => Attribute.IsDefined (property, typeof (KeyAttribute)));

			foreach (PropertyInfo item in keys) {
				result ??= new ();
				result.Add (item.Name);
			}// foreach;

			return result;

		}// GetKeyFields;


		public static StringList? GetKeys (this object source) {

			StringList? result = null;

			foreach (PropertyInfo property in source.GetType ().GetProperties ()) {
				result ??= new ();
				result.Add (property.Name);
			}// foreach;

			return result;

		}// GetKeys;


		public static object? GetValue (this object source, string field) => source.GetType ().GetProperty (field)?.GetValue (source);


		public static void SetValue (this object source, string field, dynamic value) => source.GetType ().GetProperty (field)?.SetValue (source, value);


		public static bool HasKey (this object source, string key) {

			StringList? keys = source.GetKeys ();

			if (is_null (keys)) return false;

			foreach (string source_key in keys!) {
				if (source_key == key) return true;
			}// foreach;

			return false;

		}// GetKeys;


		public static bool IsGuid (this object source) => source.GetType () == typeof (Guid?);


		public static bool Matches (this object source, object? candidate) {
			if (candidate == null) return false;
			if (source.IsGuid ()) return source.Equals (candidate);
			if (source == candidate) return true;
			return false;
		}// Matches;

	}// ObjectExtensions;

}// Stockboy.Classes.Extensions;
