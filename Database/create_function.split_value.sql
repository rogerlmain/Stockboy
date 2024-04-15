-- drop function split_value;

create function split_value (@ticker_id uniqueidentifier) returns table as return
	select 
		pch.id as purchase_id,
		cast (pch.quantity * (exp (sum (log (spl.before))) / exp (sum (log (spl.after)))) as decimal(14,8)) as quantity
	from
		purchases as pch
	left outer join
		splits as spl
	on
		(spl.ticker_id = pch.ticker_id) and
		(spl.split_date > pch.settlement_date)
	where
		(spl.ticker_id = @ticker_id)
	group by
		pch.id,
		pch.quantity;

-- select split_value ('BE88161A-760B-4BE9-AD32-08DC51A2C11C');

