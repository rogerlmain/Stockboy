-- drop view if exists purchase_data;

create view purchase_data as select
	pch.id as purchase_id,
	brk.name as broker,
	tck.ticker as symbol,
	tck.name as asset,
	pch.purchase_price,
	pch.purchase_date,
	pch.settlement_date,
	pch.quantity,
	ptp.description as purchase_type
from
	purchases as pch
left join
	brokers as brk
on
	brk.id = pch.broker_id
left join
	tickers as tck
on
	tck.id = pch.ticker_id
left join
	purchase_types as ptp
on
	ptp.id = pch.purchase_type_id;