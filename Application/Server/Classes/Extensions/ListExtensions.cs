using Newtonsoft.Json;

namespace Stockboy.Classes.Extensions {

	public static class ListExtensions {


		public static TModel? Downcast<TModel> (this IEnumerable<Object> list) {
			return JsonConvert.DeserializeObject<TModel> (JsonConvert.SerializeObject (list));
		}// Downcast;


		public static TModel? Find<TModel> (this IEnumerable<TModel> list, Func<TModel, bool> predicate) => list.FirstOrDefault (next => predicate (next));


		public static List<TModel> Concatenate<TModel> (this List<TModel> self, params List<TModel>? [] additions) {

			foreach (List<TModel>? addition in additions) {
				if (addition is null) continue;
				self.AddRange (addition);
			}// foreach;

			return self;
		}// Merge;


		public static List<TModel>? OrderBy<TModel> (this List<TModel> source, string sort_list) {

			string [] sort_fields = sort_list.Split (',');
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


		public static List<TModel>? SortBy<TModel> (this List<TModel> self, String fieldname, Boolean descending = false) {
			switch (descending) {
				case true: return self.OrderByDescending ((TModel item) => item?.GetValue (fieldname)).ToListOrNull ();
				default: return self.OrderBy ((TModel item) => item?.GetValue (fieldname)).ToListOrNull ();
			}// switch;
		}// SortBy;

		public static List<TModel> SortDescending<TModel> (this List<TModel> source, string field_name) {
			return source.OrderByDescending ((TModel item) => item?.GetValue (field_name)).ToList ();
		}// Sort;

		public static List<TModel>? ToListOrNull<TModel> (this IEnumerable<TModel> self) => self.Any () ? self.ToList () : null;


	}// ListExtensions;

}// Stockboy.Classes.Extensions;