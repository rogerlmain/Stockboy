using System.ComponentModel.DataAnnotations;

namespace Stockboy.Models {

	public interface IBaseModel {
		[Key]
		public Guid? id { get; set; }
	}

	public class BaseModel : IBaseModel {
		[Key]
		public Guid? id { get; set; } = null;
	}

    public class  OptionsModel : BaseModel, IBaseModel {
        public string description { get; set; } = string.Empty;
    }

    public class  StringModel {
        public string text { get; set; } = String.Empty;
    }

}
