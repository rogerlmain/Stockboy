using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.AspNetCore.Mvc.ViewFeatures;
using Microsoft.AspNetCore.Razor.TagHelpers;
using Stockboy.Models;
using System.Text.Encodings.Web;

namespace Stockboy.Helpers {

	[HtmlTargetElement ("data-table")]
	public class DataTableTagHelper : TagHelper {

		private IHtmlHelper html_helper;

		[ViewContext]
		[HtmlAttributeNotBound]
		public ViewContext ViewContext { get; set; }

		public string id { get; set; }

		public string? id_field { get; set; } = null;

		public string endpoint { get; set; }

		public TableModel data { get; set; }

		public override async void Process (TagHelperContext context, TagHelperOutput output) {
			(html_helper as IViewContextAware).Contextualize (ViewContext);
			output.Content.SetHtmlContent (await html_helper.PartialAsync ("~/Views/Helpers/DataTable.cshtml", this));
			output.TagName = null;
		}

		public DataTableTagHelper (IHtmlHelper helper, HtmlEncoder encoder) { 
			html_helper = helper;
		}

	}// DataTableTagHelper;

}// namespace;
