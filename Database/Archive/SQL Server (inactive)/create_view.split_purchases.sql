-- drop view split_purchases;

create view split_purchases as select
	pch.id,
	pch.ticker_id,
	pch.broker_id,
	pch.purchase_price,
	pch.purchase_date,
	pch.settlement_date,
	pch.quantity,
	dbo.split (pch.quantity, pch.settlement_date, pch.ticker_id) as split_quantity,
	pch.purchase_type_id
from
	purchases as pch;
