drop view if exists holdings_view;

create view holdings_view as select
	tck.id as ticker_id,
    brk.id as broker_id,
	brk.name as broker,
	tck.symbol,
	tck.name as company,
    tck.price,
	stock_quantity (tck.id, brk.id) as quantity,
    stock_cost (tck.id, brk.id) as cost,
    tck.last_updated
from
	tickers as tck
join
	brokers as brk
group by
	tck.id,
    brk.id
having
	(quantity > 0)
order by
	tck.symbol;