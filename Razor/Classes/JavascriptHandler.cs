using System.Reflection;

using static Stockboy.Classes.Globals;

namespace Stockboy.Classes {

	public class JavascriptHandler {

		public static String? Parse (string? value, object data) {

			if (is_null (value)) return null;

			String [] parameter_names = value.Substr (value.IndexOf ("("), value.IndexOf (")")).Split (",");
			String command = value.Substr (0, value.IndexOf ("(") - 1, true).Trim ();

			List<String> parameters = null;

			foreach (String parameter in parameter_names) {
				parameters ??= new ();
				String property = parameter.Substr (parameter.IndexOf ("{{") + 2, parameter.IndexOf ("}}")).Trim ();
				if (not_null (property)) parameters.Add (data.GetValue (property) as String);
			}// foreach;

			return $"{command} ('{parameters.Join ("', '")}')";
		}// Parse;


	}// JavascriptHandler;

}// Stockboy.Classes;
