namespace Stockboy.Classes {
	public static class Globals {

		public static char comma = ',';

		public static Boolean is_null (object? value) => value == null;
		public static Boolean not_null (object? value) => !is_null (value);

	}
}
