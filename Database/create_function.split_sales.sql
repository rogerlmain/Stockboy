-- drop function split_sales;

create function split_sales () returns table as return select
	sle.id,
	sle.ticker_id,
	sle.broker_id,
	sle.sale_price,
	sle.sale_date,
	sle.settlement_date,
	sle.quantity,
	coalesce ((
		select 
			cast (sls.quantity * (exp (sum (log (spl.before))) / exp (sum (log (spl.after)))) as decimal(14,6)) as quantity
		from
			sales as sls
		left outer join
			splits as spl
		on
			(spl.ticker_id = sls.ticker_id) and
			(spl.split_date >= sls.settlement_date)
		where
			(sls.id = sle.id)
		group by
			sls.quantity
	), sle.quantity) as split_quantity
from
	sales as sle;
