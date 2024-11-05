using System.Text.Json;
using System.Text.Json.Serialization;


namespace Stockboy.Classes {

	public class JsonDateParser: JsonConverter<DateTime?> {

		public override DateTime? Read (ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options) {
			try { 
				string? date_value = reader.GetString ();
				if (is_null (date_value)) return null;
				return DateTime.Parse (date_value!); 
			} catch {
				return null;//DateTime.MinValue;
			}// try;
		}// Read;

		public override void Write (Utf8JsonWriter writer, DateTime? value, JsonSerializerOptions options) {
			writer.WriteStringValue (value.ToString ());
		}// Write;

	}// JsonDateParser;


	public static class JsonParser {

		public static async Task<TModel?> Parse<TModel> (Stream json) {
			JsonSerializerOptions options = new JsonSerializerOptions ();
			options.Converters.Add (new JsonDateParser ());

			return await JsonSerializer.DeserializeAsync<TModel> (json, options);
		}// Parse;

	}// JsonParser;
 
}// Stockboy.Classes;
