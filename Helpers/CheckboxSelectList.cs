using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.AspNetCore.Mvc.ViewFeatures;
using Microsoft.AspNetCore.Razor.TagHelpers;
using System.Text.Encodings.Web;
using System.Xml;

namespace Stockboy.Helpers {


    public class  CheckboxSelectItem {
		public string value { get; set; }
		public string text { get; set; }
    }


    [HtmlTargetElement ("checkbox-select-list")]
	public class CheckboxSelectListTagHelper : TagHelper {

		private IHtmlHelper html_helper;


		private void load_options_list (String option_string) {
			XmlDocument options = new ();
			options.LoadXml ($"<options>{option_string}</options>");

			foreach (XmlElement element in options.FirstChild.ChildNodes) {
				data ??= new ();
				data.Add (new CheckboxSelectItem () {
					value = element.GetAttribute ("value"),
					text = element.InnerText
				});
			}
		}


		[ViewContext]
		[HtmlAttributeNotBound]
		public ViewContext ViewContext { get; set; }

		public string id { get; set; }

		public string field { get; set; }

		public string onselect { get; set; }

		public List<CheckboxSelectItem>? data { get; set; } = null;

		public override async void Process (TagHelperContext context, TagHelperOutput output) {
			(html_helper as IViewContextAware).Contextualize (ViewContext);
			load_options_list ((await output.GetChildContentAsync ()).GetContent ());
			output.Content.SetHtmlContent (await html_helper.PartialAsync ("~/Views/Helpers/CheckboxSelectList.cshtml", this));
			output.TagName = null;
		}

		public CheckboxSelectListTagHelper (IHtmlHelper helper, HtmlEncoder encoder) { 
			html_helper = helper;
		}

	}// CheckboxSelectListTagHelper;

}// namespace;
