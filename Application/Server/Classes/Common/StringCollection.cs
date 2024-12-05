using Newtonsoft.Json;
using System.Collections.Specialized;


namespace Common.Classes {

	public class StringValueCollection: Dictionary<String, String> {

		public static StringValueCollection? FromJson (String json) => JsonConvert.DeserializeObject<StringValueCollection> (json);

	}// StringValueCollection;

}// Common.Classes;