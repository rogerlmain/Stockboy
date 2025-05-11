global using TransactionDateList = System.Collections.Generic.List<Stockboy.Classes.TransactionDate>;
global using GuidList = System.Collections.Generic.List<System.Guid>;
global using IntegerList = System.Collections.Generic.List<int>;

global using ActivityViewQueryable = System.Linq.IQueryable<Stockboy.Models.ActivityView>;

using Stockboy.Classes.Extensions;
using Stockboy.Models;

using GroupedList = System.Collections.Generic.IEnumerable<System.Linq.IGrouping<dynamic, dynamic>>;
using StockTotalList = System.Collections.Generic.List<Stockboy.Models.StockTotal>;
using BaseStockModelList = System.Collections.Generic.List<Stockboy.Models.BaseStockModel>;


namespace Stockboy.Classes {


public class TransactionDate: BaseStockModel {
	public DateTime? transaction_date { get; set; } = null;
}// TransactionDate;


	public class HoldingsData {

		private const int batch_size = 5;


		private readonly DataContext data_context;
		private readonly StockAPIClient stock_api_client;


		private ActivityDataList? activity = null;
		private HoldingsStatusList? holdings_status = null;
		private Boolean refreshing = false;


		private static class TransactionTypes {
			public const string buy = "Buy";
			public const string sell = "Sell";
			public const string split = "Split";
			public const string reinvestment = "Reinvestment";
			public const string dividend = "Dividend";
		}// TransactionTypes;


		GuidList? DefunctStocks { get { return (from tck in data_context.tickers where tck.price == -1 select (Guid) tck.id!).ToList (); } }


		private IQueryable<BaseStockModel>? CompanyList { get {
			return (from broker in data_context.brokers 
				from ticker in data_context.tickers
				select new BaseStockModel () {
					broker = broker.name!,
					company = ticker.name!,
					symbol = ticker.symbol,
					broker_id = (Guid) broker.id!,
					ticker_id = (Guid) ticker.id!
				}
			);
		} }// CompanyList;


		private ActivityDataList? GetActivityData () {

			ActivityDataList? activity = (from atv in data_context.activity_view 
				where (atv.transaction_type != TransactionTypes.dividend)
				select atv
			).ToList ().Downcast<ActivityDataList> ();


			if (activity is not null) foreach (ActivityData view in activity) {

				ActivityData? previous = (from act in activity
					where
						(act.broker_id == view.broker_id) &&
						(act.ticker_id == view.ticker_id) &&
						(activity.IndexOf (act) == (activity.IndexOf (view) - 1))
					select act
				).OrderByDescending (view => view.transaction_date).FirstOrDefault ();

				if (previous is null) {
					view.total_quantity = view.quantity;
					view.total_cost = (view.quantity * view.cost_price);
					continue;
				}// if;

				if (view.transaction_type == TransactionTypes.split) {
					view.total_quantity = previous.total_quantity * view.quantity;
					view.total_cost = previous.total_cost * view.quantity;
					continue;
				}// if;

				if (view.transaction_type == TransactionTypes.sell) {
					view.total_quantity = previous.total_quantity - view.quantity;
					view.total_cost = previous.total_cost - (view.quantity * view.cost_price);
					continue;
				}// if;

				view.total_quantity = previous.total_quantity + view.quantity;
				view.total_cost = previous.total_cost + (view.quantity * view.cost_price);

			}// if;

			return activity;

		}// GetActivityData;


		private ActivityDataList? GetActivityData (string transaction_type) {

			ActivityDataList? activity_data = GetActivityData ();

			if (activity_data is null) return null;

			ActivityDataList? result = (from activity in activity_data
				where (activity.transaction_type == transaction_type)
				select activity.Merge (new {
					cost = activity.quantity * activity.cost_price,
					current_value = activity.quantity * activity.current_price
				})
			).ToListOrNull ();

			return result;

		}// GetActivityData;

		private DividendSummaryList GetDividendHoldings () {

			ActivityViewQueryable dividend_list = (from dividends in data_context.activity_view 
				where (dividends.transaction_type == TransactionTypes.dividend) &&
					(dividends.transaction_date > (from activity in data_context.activity_view 
						where (activity.transaction_type == TransactionTypes.sell)
						select activity.transaction_date
					).Max ())
				select dividends
			);

			DividendSummaryList result = (from dividends in dividend_list
				group dividends by new {dividends.broker_id, dividends.ticker_id} into totals
				select new DividendSummary () {
					broker_id = totals.Key.broker_id,
					ticker_id = totals.Key.ticker_id,
					payout = totals.Sum ((ActivityView activity) => activity.payment_amount) ?? 0
				}
			).ToList ();

			return result;

		}// GetDividendHoldings;


		private HoldingsData (HttpContext context) {
			data_context = context.RequestServices.GetRequiredService<DataContext> ();
			stock_api_client = context.RequestServices.GetRequiredService<StockAPIClient> ();
		}// constructor;


		private static DateTime? GetPaymentDate (TickerTableModel ticker, DateTime? last_payment_date, DateTime? next_payment_date) {
			if (isset (next_payment_date)) return next_payment_date;
			if (isset (ticker.frequency) && isset (last_payment_date)) {
				DateTime payment_date = (DateTime) last_payment_date!;
				return payment_date.AddMonths ((int) ticker.frequency!);
			}// if;
			return null;
		}// GetPaymentDate;


		private async Task<StockDividendHistory?> GetDividendHistories (StringList symbols) {

			int index = 0;
			StockDividendHistory? result = null;

			while (index < symbols.Count) {
				StockDividendHistory? sublist = await stock_api_client.GetDividendHistories (String.Join (comma, symbols.Skip (index).Take (batch_size)));
				if (isset (sublist)) {
					result ??= new ();
					result.historicalStockList = result.historicalStockList.Concat (sublist!.historicalStockList).ToArray ();
				}// if;
				index += batch_size;
			}// while;

			return result;

		}// GetDividendHistories;


		private List<DividendHistoryList>? DividendHistoryQuery (StockDividendHistory? history) {

			if (is_null (history)) return null;

			List<DividendHistoryList>? result = (from his in history!.historicalStockList
				join tck in data_context.tickers on his.symbol equals tck.symbol
				select (from hpy in his.historical select new DividendHistory () {
					ticker_id = tck.id,
					symbol = tck.symbol,
					payment_date = hpy.paymentDate ?? DateTime.MinValue
				}).OrderByDescending (dhq => dhq.payment_date).Take (2).ToList ()
			).ToList ();

			return result;

		}// DividendHistoryQuery;


		private StockDividendHistory? UpdateDividendFrequencyList (StockDividendHistory? history) {

			List<DividendHistoryList>? history_list = DividendHistoryQuery (history);

			if (is_null (history_list)) return null;

            foreach (DividendHistoryList items in history_list!) {
				if (items.Count < 2) continue;
				TickersTableList tickers = data_context.tickers.Where (tkr => tkr.id == items [0].ticker_id).ToList ();
				tickers.ForEach (tck => {
					tck.frequency = (int) Math.Round ((items [0].payment_date - items [1].payment_date).Days / 30.437);
					if (tck.frequency < 1) tck.frequency = 1;
				});
				data_context.SaveChanges ();
            }// foreach;

			return history;

		}// UpdateDividendFrequencies;


		private async Task UpdateStockData () {

			TickersTableList tickers = (from ticker in data_context.tickers.ToList () where (ticker.price != -1) select ticker).ToList ();

			if (tickers.Count == 0) return;

			StringList symbols = (from tck in tickers select tck.symbol).ToList ();
			ShortStockQuoteList? stock_prices = await stock_api_client.GetStockQuotes (String.Join (comma, symbols)) ?? this.Abort ();
			StockDividendHistory? dividend_data = UpdateDividendFrequencyList (await GetDividendHistories (symbols)) ?? this.Abort ();

			if (is_null (stock_prices) && is_null (dividend_data)) return; // Nothing to update

			symbols.ForEach ((string symbol) => {
				TickerTableModel ticker = (tickers!.Find ((TickerTableModel ticker) => ticker.symbol == symbol))!;
				ShortStockQuote? price = stock_prices?.Find ((ShortStockQuote stock_price) => stock_price.symbol == symbol);
				HistoricalStockList? dividends = dividend_data?.historicalStockList?.Find ((HistoricalStockList item) => item.symbol == symbol);

				if (isset (dividends?.historical)) SetStockData (ticker, dividends, price);
					
			});

		}// UpdateStockData;


		private async Task LoadStockPrices () {

  			SettingsTableRecord? settings = (from set in data_context.settings where set.name == "last_updated" select set).FirstOrDefault ();

			if (not_set (settings) || DateTime.Parse (settings!.value).EarlierThan (DateTime.Now.AddHours (-1)) || refreshing) {

				await UpdateStockData ();
				if (settings is null) settings = new () { name = "last_updated" };

				settings!.value = DateTime.Now.ToString ();
				data_context.settings.Save (settings);

			}// if;

		}// LoadStockPrices;


		/********/


		public ActivityDataList? GetActivity { get { return activity; } }
		public HoldingsStatusList? GetStatus { get { return holdings_status; } }


		public HoldingsModelList? GetActivityList (string? transaction_type = null) {

			ActivityDataList? activity_list = (transaction_type is null) ? activity : GetActivityData (transaction_type);

			HoldingsModelList? result = (activity_list is null) ? null : (from act in activity_list
				group act by new {
					act.broker_id,
					act.ticker_id
				} into gac
				select gac.Last () into lga
				select new HoldingsModel () {
					broker_id = lga.broker_id,
					ticker_id = lga.ticker_id,
  					broker = lga.broker,
					company = lga.company,
					symbol = lga.symbol,
					quantity = lga.total_quantity ?? 0,
					current_price = lga.current_price,
					current_purchase_cost = lga.total_cost,
					profit = (lga.total_quantity * lga.current_price)// - lga.total_cost
				}// select;
			).ToList ();

			return (result?.Count == 0) ? null : result;

		}// ActivityList;


		public static int? GetDividendFrequency (HistoricalStockList? history) {

			IntegerList? frequencies = null;
			DateTime? previous_paydate = null;

			if (history is null) return null;

			foreach (StockDividendData data in history!.historical.ToList ().Take (12).ToList ().SortBy ("paymentDate")!) {

				if ((previous_paydate is not null) && (data.paymentDate is not null)) {

					int lapse = (int) Math.Round (((DateTime) data.paymentDate! - (DateTime) previous_paydate!).Days / 30.437);

					if (lapse > 0) {
						frequencies ??= new ();
						frequencies.Add (lapse);
					}// if;

				}// if;

				previous_paydate = data.paymentDate;

			}// foreach;

			if (frequencies is null) return null;
			return (int) Math.Round (frequencies.Average ());

		}// GetDividendFrequency;


		public static async Task<StockStatistics> GetStockStatistics (HttpContext context, String symbol) {

			HoldingsData data = new HoldingsData (context);

			StockAPIClient api_client = context.RequestServices.GetRequiredService<StockAPIClient> ();
			ShortStockQuoteList? stock_prices = await data.stock_api_client.GetStockQuotes (String.Join (comma, symbol));

			return new StockStatistics () {
				price = (await data.stock_api_client.GetStockQuotes (String.Join (comma, symbol)))?.FirstOrDefault (),
				history = await api_client.GetDividendHistory (symbol)
			}; 

		}// GetStockStatistics;


		public static void SetStockData (TickerTableModel ticker, HistoricalStockList? dividends, ShortStockQuote? price) {

			StockDividendData last_payment_date = (from date in dividends!.historical
				where date.paymentDate < DateTime.Now
				select date
			).OrderByDescending (date => date.paymentDate).First ();

			StockDividendData? next_payment_date = (from date in dividends.historical
				where date.paymentDate > DateTime.Now select date
			).OrderBy (date => date.paymentDate).FirstOrDefault ();

			ticker.price = price?.price ?? -1;
			ticker.volume = price?.volume;

			ticker.last_payment_date = last_payment_date?.paymentDate;
			ticker.next_payment_date = GetPaymentDate (ticker, last_payment_date?.paymentDate, next_payment_date?.paymentDate);
			ticker.ex_dividend_date = next_payment_date?.recordDate;
			ticker.dividend_payout = next_payment_date?.dividend ?? last_payment_date?.dividend;

		}// SetStockData;


		public HoldingsStatusList? GetHoldingsStatus () {

			TickersTableList tickers = (from tck in data_context.tickers 
				where tck.price != -1
				select tck
			).ToList ();

			return (from tck in tickers
				join ftr in (
					from ftr in (
						from tra in (
							from act in activity
							group act by new {
								act.ticker_id,
								act.broker_id,
							} into gct
							select new {
								gct.Last ().ticker_id,
								gct.Last ().broker_id,
								quantity = gct.Last ().total_quantity
							}
						) 
						select new {
							tra.broker_id,
							tra.ticker_id,
							tra.quantity
						}
					) 
					group ftr by ftr.ticker_id into gtr
					select new {
						ticker_id = gtr.Key,
						quantity = gtr.Sum (hld => hld.quantity)
					}
				) on tck.id equals ftr.ticker_id into jtr
				from jtt in jtr.DefaultIfEmpty ()
				select new HoldingsStatusModel () {
					ticker_id = (Guid) tck.id!,
					status = (jtt?.quantity > 0) ? HoldingStatus.live : HoldingStatus.dead
				}
			).Union (from dst in (from dst in DefunctStocks select new HoldingsStatusModel () {
				ticker_id = dst,
				status = HoldingStatus.defunct
			}) select dst).ToList ();

		}// GetHoldingsStatus;


		public StockValueList? GetRecentTotals (ActivityDataList? activity_data, String transaction_type) {

			if (activity_data is null) return null;

			StockValueList? recent_activity = (from data in (
				from data in (
					from data in activity_data
						join recent_funny_business in (from data in (
						from data in activity_data
							where (data.transaction_type == TransactionTypes.sell) || (data.transaction_type == TransactionTypes.split)
							select data
						)
						group data by new {
							broker = data.broker_id,
							ticker = data.ticker_id
						} into grouped_data
						select grouped_data.Last ()
					) on new {
							data.broker_id,
							data.ticker_id
						} equals new {
							recent_funny_business.broker_id,
							recent_funny_business.ticker_id
						} into joined_funny_business
						from funny_business in joined_funny_business.DefaultIfEmpty ()
						where (data.transaction_date > funny_business?.transaction_date) || (funny_business == null)
						select data
					)
					where (data.transaction_type == transaction_type)
					select data
				)
				group data by new {
					data.broker_id,
					data.ticker_id,
				} into grouped_data

				select new StockValue () {
					broker_id = (Guid) grouped_data.Key.broker_id!,
					ticker_id = (Guid) grouped_data.Key.ticker_id!,
					quantity = grouped_data.Sum (item => item.quantity),
					cost = (decimal) grouped_data.Sum (item => item.cost_price * item.quantity)!
				}
			).ToListOrNull ();

			return recent_activity;

		}// GetRecentTotals;


		public ActivityDataList? GetTransactionsByType (ActivityDataList activity_data, String transaction_type) {
			
			ActivityDataList? result = (from data in activity_data
				where (data.transaction_type == transaction_type)
				select data
			).ToListOrNull ();

			return result;

		}// GetTransactionsByType;


		public StockValueList? GetActivityTotals (ActivityDataList? activity_data, String transaction_type, DateTime? start_date = null, DateTime? end_date = null) {

			StockValueList? result = (from data in (
					from data in activity_data
					where (data.transaction_type == transaction_type) &&
						((data.transaction_date >= start_date) || (start_date == null)) &&
						((data.transaction_date <= end_date) || (end_date == null))
					select data
				)
				group data by new {
					data.broker_id,
					data.ticker_id,
				} into grouped_data
				select new StockValue () {
					broker_id = grouped_data.Key.broker_id,
					ticker_id = grouped_data.Key.ticker_id,
					quantity = grouped_data.Sum (item => item.quantity),
					cost = (decimal) grouped_data.Sum (item => item.cost_price * item.quantity)!
				}
			).ToListOrNull ();

			return result;

		}// GetActivityTotals;


		public ActivityDataList? GetPurchases (ActivityDataList activity_data) {
			ActivityDataList? buys = GetTransactionsByType (activity_data, TransactionTypes.buy);
			ActivityDataList? reinvestments = GetTransactionsByType (activity_data, TransactionTypes.reinvestment);
			ActivityDataList result = new ActivityDataList ().Concatenate (buys, reinvestments);
			return (result.Count == 0) ? null : result;
		}// GetPurchases;


		public GroupedList GroupedData (ActivityDataList activity_data) {
			
			GroupedList result = from data in activity_data
				group data by new {
					data.company,
					data.broker,
					data.broker_id,
					data.ticker_id,
				} into grouped_data
				select grouped_data;

			return result;

		}// GroupedData;


		public ProfitLossModelList? GetProfitAndLoss () {

			ActivityDataList? activity_data = GetActivityData ();
			ActivityDataList? sales = (activity_data is null) ? null : GetTransactionsByType (activity_data, TransactionTypes.sell);
			ActivityDataList? purchases = (activity_data is null) ? null : GetPurchases (activity_data);


StockTotalList? sales_profit = (from sale in GroupedData (sales)
	select new StockTotal () {
		broker = sale.Key.broker,
		company = sale.Key.company,
		broker_id = sale.Key.broker_id,
		ticker_id = sale.Key.ticker_id,
		amount = sale.Sum (item => (Decimal) ((item.quantity * item.current_price) - (item.quantity * item.cost_price)))
	}
).ToListOrNull ();

TransactionDateList? recent_sales = (sales is null) ? null : (from data in GroupedData (sales)
	select new TransactionDate () {
		broker_id = data.Key.broker_id,
		ticker_id = data.Key.ticker_id,
		transaction_date = data.Max (item => item.transaction_date)
	}
).ToListOrNull ();


//StockTotalList? last_transaction = (from activity in activity_data
//	where (activity.transaction_date == (from data in activity_data
//		join sale in recent_sales on new {
//			activity.broker_id,
//			activity.ticker_id
//		} equals new {
//			sale.broker_id,
//			sale.ticker_id,
//		}
//		where (data.transaction_date < sale.transaction_date)
//		select data. (item => item.transaction_date)
//	))
//	select activity
//).ToListOrNull ();


StockTotalList? last_sales = (from activity in sales
	join sale in recent_sales on new {
		activity.broker_id,
		activity.ticker_id
	} equals new {
		sale.broker_id,
		sale.ticker_id,
	}
	where (sale.transaction_date == activity.transaction_date)
	select new StockTotal () {
		broker = activity.broker,
		company = activity.company,
		broker_id = activity.broker_id,
		ticker_id = activity.ticker_id,
		amount = (decimal) (activity.quantity * activity.current_price)! - (decimal) (activity.quantity * activity.cost_price)!
	}
).ToListOrNull ();


ActivityDataList? pre_sale_purchases = (recent_sales is null) ? null : (from data in purchases
	join sale in recent_sales on new {
		data.broker_id,
		data.ticker_id
	} equals new {
		sale.broker_id,
		sale.ticker_id
	}
	where (data.transaction_date <= sale.transaction_date)
	select data
).ToListOrNull ();

StockTotalList? purchase_totals = (pre_sale_purchases is null) ? null : (from data in GroupedData (pre_sale_purchases)
	select new StockTotal () {
		broker = data.Key.broker,
		company = data.Key.company,
		broker_id = data.Key.broker_id,
		ticker_id = data.Key.ticker_id,
		amount = data.Sum (item => (decimal) item.quantity) * data.Sum (item => (decimal) item.total_cost)!
	}
).ToListOrNull ();


StockTotalList? sale_totals = (from data in GroupedData (GetTransactionsByType (activity_data, TransactionTypes.sell))
	select new StockTotal () {
		broker = data.Key.broker,
		company = data.Key.company,
		broker_id = data.Key.broker_id,
		ticker_id = data.Key.ticker_id,
		amount = data.Sum (item => (decimal) item.quantity) * data.Sum (item => (decimal) item.total_cost)!
	}
).ToListOrNull ();


//StockTotalList? sales_profit = (from purchase in purchase_totals
//	join sale in sale_totals on new {
//		purchase.broker_id, 
//		purchase.ticker_id
//	} equals new {
//		sale.broker_id,
//		sale.ticker_id
//	} 
//	select new StockTotal () {
//		broker = purchase.broker,
//		company = purchase.company,
//		broker_id = purchase.broker_id,
//		ticker_id = purchase.ticker_id,
//		amount = purchase.amount - sale.amount
//	}
//).ToListOrNull ();


ProfitLossModelList result = (from profit in sales_profit
	select new ProfitLossModel () {
		broker = profit.broker,
		company = profit.company,
		symbol = profit.symbol!,
		dividend_payout = 0,//dividends.payout,
		sales_profit = profit.amount,		// FIX THIS - GET SALES SUBTRACTED FROM COSTS
		value_profit = 0, //activity.profit,
		reinvestment_profit = 0,//(reinvestment.quantity * activity.current_price) - reinvestment.cost,
		overall_profit = 0//activity.profit + dividends.payout
	}
).ToList ();


return result;

//var sale_itemss = (from sales_data in sale_items
//	join broker in data_context.brokers on sales_data.broker_id equals broker.id
//	join ticker in data_context.tickers on sales_data.ticker_id equals ticker.id
//	select new {
//		broker = broker.name,
//		company = ticker.name,
//		broker_id = broker.id,
//		ticker_id = ticker.id,
//		transaction_date = sales_data.transaction_date
//	}
//).ToListOrNull ();


			//StockValueList? reinvestments = GetRecentTotals (activity_data, TransactionTypes.reinvestment);
			//StockValueList? sales = GetActivityTotals (activity_data, TransactionTypes.sell);

			//HoldingsModelList? reinvestment_list = GetActivityList (TransactionTypes.reinvestment);
			//DividendSummaryList dividend_holdings = GetDividendHoldings ();

			//ProfitLossModelList result = (from activity in GetActivityList (/*TransactionTypes.buy*/)

			//	join reinvestment in (reinvestments ?? new StockValueList ()) on new {
			//		activity.broker_id,
			//		activity.ticker_id
			//	} equals new {
			//		reinvestment.broker_id,
			//		reinvestment.ticker_id
			//	} into joined_reinvestment
			//	from reinvestment in joined_reinvestment.DefaultIfEmpty ()

			//	join sale in (sales ?? new StockValueList ()) on new {
			//		activity.broker_id,
			//		activity.ticker_id
			//	} equals new {
			//		sale.broker_id,
			//		sale.ticker_id
			//	} into joined_sale
			//	from sale in joined_sale.DefaultIfEmpty ()

			//	join dividends in dividend_holdings on new {
			//		activity.broker_id,
			//		activity.ticker_id
			//	} equals new {
			//		dividends.broker_id,
			//		dividends.ticker_id
			//	}

			//	select new ProfitLossModel () {
			//		broker = activity.broker,
			//		company = activity.company,
			//		symbol = activity.symbol,
			//		dividend_payout = dividends.payout,
			//		sales_profit = 0,		// FIX THIS - GET SALES SUBTRACTED FROM COSTS
			//		value_profit = activity.profit,
			//		reinvestment_profit = (reinvestment.quantity * activity.current_price) - reinvestment.cost,
			//		overall_profit = activity.profit + dividends.payout
			//	}
			//).ToList ();

			return null;// result;

		}// GetProfitLossList;


		public HoldingsModelList? HoldingsPriceList (StockDateModelList dates) {
			// DO MORE HERE
			return null;
		}// HoldingsPriceList;


		public static async Task<HoldingsData> Current (HttpContext context, Boolean refresh = false) {

			HoldingsData? holdings_data = new (context);

			holdings_data.refreshing = refresh;
			
			await holdings_data.LoadStockPrices ();

			holdings_data.activity = refresh ? holdings_data.GetActivityData () : context.Session.GetSessionData<ActivityDataList> ("activity", holdings_data.GetActivityData);
			holdings_data.holdings_status = refresh ? holdings_data.GetHoldingsStatus () : context.Session.GetSessionData ("status", holdings_data.GetHoldingsStatus);

			holdings_data.activity = (from act in holdings_data.activity
				join hst in holdings_data.holdings_status! on act.ticker_id equals hst.ticker_id into jst
				from jha in jst.DefaultIfEmpty ()
				select act.Merge (new { jha.status })
			).ToList ();

			return holdings_data;

		}// Current;

	}// HoldingsData;

}// Stockboy.Classes;