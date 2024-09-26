using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.AspNetCore.Mvc.ViewFeatures;
using Microsoft.AspNetCore.Razor.TagHelpers;
using Stockboy.Classes;
using Stockboy.Models;
using System.Reflection;
using System.Text.Encodings.Web;

namespace Stockboy.Helpers {


	public class DataTableModel {
 		public string id { get; set; } = String.Empty;
		public string? id_field { get; set; }
		public string onclick { get; set; } = String.Empty;
		public required List<String> fields { get; set; }
		public Dictionary<String, Decimal>? totals { get; set; } = null;
		public required TableModel data { get; set; }
	}


	[HtmlTargetElement ("data-table")]
	public class DataTableTagHelper : TagHelper {

		private IHtmlHelper html_helper;

		[ViewContext]
		[HtmlAttributeNotBound]
		public ViewContext ViewContext { get; set; }

		public string id { get; set; }
		public string? id_field { get; set; } = null;
		public string? totals { get; set; } = null;
		public string? order { get; set; } = null;
		public string onclick { get; set; }
		public TableModel data { get; set; }

		public override async void Process (TagHelperContext context, TagHelperOutput output) {
			(html_helper as IViewContextAware).Contextualize (ViewContext);

			List<PropertyInfo> property_fields = data.list.DisplayFields ().Where (field => field.Name != id_field).ToList ();

			DataTableModel model = new () {
				id = this.id,
				id_field = this.id_field,
				onclick = this.onclick,
				data = this.data,
				fields = ((order is not null) ? order.Split (",").Select (item => item.Trim ()) : property_fields.Select (item => item.Name)).ToList ()
			};

			if (totals is not null) {
				foreach (String field in totals.Split (",").Select (item => item.Trim ()).ToList ()) {
					Decimal total = 0;

					foreach (var row in data.list) {
						total += ((Decimal) (row?.GetValue (field) ?? 0));
					}

					model.totals ??= new ();
					model.totals.Add (field, total);
				};
			}

			output.Content.SetHtmlContent (await html_helper.PartialAsync ("~/Views/Helpers/DataTable.cshtml", model));
			output.TagName = null;
		}

		public DataTableTagHelper (IHtmlHelper helper, HtmlEncoder encoder) { 
			html_helper = helper;
		}

	}// DataTableTagHelper;

}// namespace;
