drop view if exists activity_view;

create view activity_view as select
	tac.id,
    ust.user_id,
	brk.id as broker_id,
    tck.id as ticker_id,
	brk.name as broker,
	tck.symbol,
	concat(tck.name, if(tck.price = -1, " (Defunct)", "")) as company,
	tac.price as cost_price,
    tck.price as current_price,
	tac.quantity,
	ttp.name as transaction_type,
	tac.transaction_date as transaction_date
from
	transactions as tac
join
	user_stocks as ust
on
	ust.id = tac.user_stocks_id
join
	brokers as brk
on
	brk.id = ust.broker_id
join
	tickers as tck
on
	tck.id = ust.ticker_id
join
	transaction_types as ttp
on
	ttp.id = tac.transaction_type_id
where
	(not tac.deleted)
union select
	spl.id,
    ust.user_id,
	brk.id as broker_id,
    tck.id as ticker_id,
	brk.name as broker,
	tck.symbol,
	tck.name,
	0 as cost_price,
    tck.price as current_price,
	spl.current / spl.previous as quantity,
	'Split' as transaction_type,
	spl.split_date as transaction_date
from
	splits as spl
join
	user_stocks as ust
on
	ust.id = spl.user_stocks_id
join
	brokers as brk
on
	brk.id = ust.broker_id
join
	tickers as tck
on
	tck.id = ust.ticker_id
where
	(not spl.deleted)
order by
	broker,
    company,
	transaction_date,
    field(transaction_type, "Buy", "Split", "Sell");