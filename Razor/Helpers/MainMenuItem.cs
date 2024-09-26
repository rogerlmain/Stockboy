using Microsoft.AspNetCore.Http.Extensions;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.AspNetCore.Mvc.ViewFeatures;
using Microsoft.AspNetCore.Razor.TagHelpers;
using System.Text.Encodings.Web;

namespace Stockboy.Helpers {

	[HtmlTargetElement ("main-menu-item")]
	public class MainMenuItemTagHelper : TagHelper {

		private IHtmlHelper html_helper;

		[ViewContext]
		[HtmlAttributeNotBound]
		public ViewContext ViewContext { get; set; }

		public string href { get; set; }

		public string text { get; set; }

		public string path { get { return ViewContext.HttpContext.Request.GetEncodedPathAndQuery ().Split ("?") [0]; } }

		public IEnumerable<Object> data { get; set; }

		public override async void Process (TagHelperContext context, TagHelperOutput output) {
			(html_helper as IViewContextAware).Contextualize (ViewContext);
			output.Content.SetHtmlContent (await html_helper.PartialAsync ("~/Views/Helpers/MainMenuItem.cshtml", this));
			output.TagName = null;
		}

		public MainMenuItemTagHelper (IHtmlHelper helper, HtmlEncoder encoder) { 
			html_helper = helper;
		}

	}// DataTableTagHelper;

}// namespace;
