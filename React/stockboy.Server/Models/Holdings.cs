﻿using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;
using Newtonsoft.Json;


namespace Stockboy.Server.Models {

	[Keyless]
	public class HoldingsModel {
		public Guid? broker_id { get; set; } = null;
		public Guid? ticker_id { get; set; } = null;
		public string? broker { get; set; } = null;
		public string? symbol { get; set; } = null;
		public string? company { get; set; } = null;
		public decimal cost_price { get; set; } = Decimal.Zero;
		public decimal? current_price { get; set; } = null;
		public decimal quantity { get; set; } = Decimal.Zero;
		public decimal current_purchase_cost { get; set; } = Decimal.Zero;
		public decimal total_purchase_cost { get; set; } = Decimal.Zero;
		public decimal total_sales_amount { get; set; } = Decimal.Zero;
		public decimal? value { get; set; } = null;
		public decimal sales_profit { get; set; } = Decimal.Zero;
		public DateTime? last_updated { get; set; } = null;
	}// HoldingsModel;


	[Keyless]
	public class ActivityView: StockModel {
		public string broker { get; set; } = String.Empty;
		public string symbol { get; set; } = String.Empty;
		public string company { get; set; } = String.Empty;
		public decimal cost_price { get; set; } = Decimal.Zero;
		public decimal? current_price { get; set; } = null;
		public DateTime? last_updated { get; set; } = null;
		public decimal quantity { get; set; } = Decimal.Zero;
		public string transaction_type { get; set; } = String.Empty;
		public DateTime transaction_date { get; set; } = DateTime.Now;
	}// ActivityView;


}// Stockboy.Server.Models;