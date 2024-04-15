-- drop function split_purchases;

create function split_purchases () returns table as return select
	pch.id,
	pch.ticker_id,
	pch.broker_id,
	pch.purchase_price,
	pch.purchase_date,
	pch.settlement_date,
	pch.quantity,
	coalesce ((
		select
			cast (prh.quantity * (exp (sum (log (spl.before))) / exp (sum (log (spl.after)))) as decimal(14,6)) as quantity
		from 
			purchases as prh
		left outer join
			splits as spl
		on
			(spl.ticker_id = prh.ticker_id) and
			(spl.split_date >= prh.settlement_date)
		where 
			prh.id = pch.id
		group by
			prh.quantity
	), pch.quantity) 
	as split_quantity,
	pch.purchase_type_id
from
	purchases as pch;
