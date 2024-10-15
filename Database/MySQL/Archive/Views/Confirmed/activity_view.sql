drop view if exists activity_view;

create view activity_view as select
	tac.id,
	brk.id as broker_id,
    tck.id as ticker_id,
	brk.name as broker,
	tck.symbol,
	concat(tck.name, if(tck.price = -1, " (Defunct)", "")) as company,
	tac.price as cost_price,
    tck.price as current_price,
    tck.last_updated,
	tac.quantity,
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
	brk.id as broker_id,
    tck.id as ticker_id,
	brk.name as broker,
	tck.symbol,
	concat(tck.name, if(tck.price = -1, " (Defunct)", "")) as company,
	0 as cost_price,
    tck.price as current_price,
    tck.last_updated,   
	spl.current / spl.previous as quantity,
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
order by
	broker,
    company,
	transaction_date,
    field(transaction_type, "Buy", "Split", "Sell");