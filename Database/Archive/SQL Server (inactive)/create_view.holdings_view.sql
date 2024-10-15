-- drop view holdings_view;

create view holdings_view as with qty as (
	select
		tck.id as ticker_id,
		brk.id as broker_id,
		tck.symbol,
		tck.name as asset,
		brk.name as broker,
		dbo.share_count (tck.id) as quantity,
		dbo.share_cost (tck.id) as cost
	from
		tickers as tck
	cross join
		brokers as brk
) select * from
	qty
where
	qty.quantity > 0;