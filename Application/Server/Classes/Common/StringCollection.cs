using Newtonsoft.Json;


namespace Common.Classes {

	public class StringCollection: Dictionary<String, String> {

		public static StringCollection? FromJson (String json) => JsonConvert.DeserializeObject<StringCollection> (json);

	}// StringCollection;

}// Common.Classes;