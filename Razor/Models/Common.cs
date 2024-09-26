using System.ComponentModel.DataAnnotations;

namespace Stockboy.Models {

	public class Currency: Attribute {}


	public interface IBaseModel {
		[Key]
		public Guid? id { get; set; }
	}


	public class BaseModel : IBaseModel {
		[Key]
		public Guid? id { get; set; } = null;
	}


    public class  OptionsData : BaseModel {
        public string description { get; set; } = String.Empty;
    }


    public class  StringData {
        public string text { get; set; } = String.Empty;
    }


    public class  TableData {
        public string []? sort_fields { get; set; } = null;
		public string []? filters { get; set; } = null;
    }

	public class TableModel {
		public IEnumerable<Object>? list { get; set; }
		public TableData? data_fields { get; set; }
	}

}
