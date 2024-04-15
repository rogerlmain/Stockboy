create view holdings_view as with quantities as (
	select
		tck.id as ticker_id,
		brk.id as broker_id,
		tck.symbol,
		tck.name as asset,
		brk.name as broker,
		(select sum(pur.quantity * pur.purchase_price) from purchases as pur where (pur.ticker_id = tck.id) and (pur.broker_id = brk.id)) as purchase_price,
		(select sum(spp.split_quantity) from split_purchases () as spp where (spp.ticker_id = tck.id) and (spp.broker_id = brk.id)) as total_purchases,
		(select sum(sps.split_quantity) from split_sales () as sps where (sps.ticker_id = tck.id) and (sps.broker_id = brk.id)) as total_sales
	from
		tickers as tck
	cross join
		brokers as brk
) select
	qty.broker,
	qty.symbol,
	qty.asset,
	qty.total_purchases as quantity,
	qty.purchase_price as cost
from
	quantities as qty
where
	coalesce (total_sales - total_purchases, total_purchases) > 0;