create view dividends_view as select
	brk.name as broker,
	tck.symbol,
	dvd.issue_date,
	dvd.amount_per_share,
	(select sum (quantity) from purchases where (ticker_id = tck.id) and (settlement_date < dvd.issue_date)) as number_of_shares
from
	dividends as dvd
left join
	brokers as brk
on
	brk.id = dvd.broker_id
left join
	tickers as tck
on
	tck.id = dvd.ticker_id;