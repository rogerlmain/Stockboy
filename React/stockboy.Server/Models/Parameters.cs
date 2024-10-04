namespace Stockboy.Server.Models {

	public class GetParameters {
		public Guid? broker_id { get; set; } = null;
		public Guid? ticker_id { get; set; } = null;
	}// GetParameters;


	public class UpdateParameters {
		public Guid id { get; set; }
	}// UpdateParameters;

}// Stockboy.Server.Models;