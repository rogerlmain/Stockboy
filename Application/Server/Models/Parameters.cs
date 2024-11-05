namespace Stockboy.Models {

	public class GetParameters {
		public Guid? broker_id { get; set; } = null;
		public Guid? ticker_id { get; set; } = null;
	}// GetParameters;


	public class DeleteParameters {
		public Guid id { get; set; }
	}// DeleteParameters;

}// Stockboy.Models;