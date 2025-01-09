drop view if exists activity_view;

create view activity_view as select
	tac.id,
	tac.user_id,
	brk.id as broker_id,
	tck.id as ticker_id,
	brk.name as broker,
	tck.symbol,
	tck.name as company,
	tac.price as cost_price,
	tck.price as current_price,
	tac.quantity,
	null as payment_amount,
	ttp.name as transaction_type,
	tac.transaction_date as transaction_date
from
	transactions as tac
join
	brokers as brk
on
	brk.id = tac.broker_id
join
	tickers as tck
on
	tck.id = tac.ticker_id
join
	transaction_types as ttp
on
	ttp.id = tac.transaction_type_id
where
	(not tac.deleted)
union select
	spl.id,
	null as user_id,
	brk.id as broker_id,
	tck.id as ticker_id,
	brk.name as broker,
	tck.symbol,
	tck.name as company,
	null as cost_price,
	tck.price as current_price,
	spl.current / spl.previous as quantity,
	null as payment_amount,
	'Split' as transaction_type,
	spl.split_date as transaction_date
from
	splits as spl
join
	brokers as brk
on
	brk.id = spl.broker_id
join
	tickers as tck
on
	tck.id = spl.ticker_id
where
	(not spl.deleted)
union select
	dvd.id,
	dvd.user_id,
	brk.id as broker_id,
	tck.id as ticker_id,
	brk.name as broker,
	tck.symbol,
	tck.name as company,
	null as cost_price,
	tck.price as current_price,
	dvd.share_quantity as quantity,
	dvd.amount_per_share * dvd.share_quantity as payment_amount,
	'Dividend' as transaction_type,
	dvd.issue_date as transaction_date
from
	dividends as dvd
join
	brokers as brk
on
	brk.id = dvd.broker_id
join
	tickers as tck
on
	tck.id = dvd.ticker_id
where
	(not dvd.deleted)
order by
	broker,
    company,
	transaction_date,
    field(transaction_type, "Buy", "Split", "Sell");