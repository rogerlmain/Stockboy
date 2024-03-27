create or replace view holdings as select
	brk.name as broker,
	tck.ticker,
	tck.name,
	sum(pur.quantity) as amount,
	sum(pur.purchase_price * quantity) as cost
from
	purchases as pur
join
	brokers as brk
on
	brk.id = pur.broker_id
join
	tickers as tck
on
	tck.id = pur.ticker_id
group by
	brk.name,
	tck.ticker,
	tck.name;
