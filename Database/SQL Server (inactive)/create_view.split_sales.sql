-- drop function split_sales;

create view split_sales as select
	sle.id,
	sle.ticker_id,
	sle.broker_id,
	sle.sale_price,
	sle.sale_date,
	sle.settlement_date,
	sle.quantity,
	dbo.split (sle.quantity, sle.settlement_date, sle.ticker_id) as split_quantity
from
	sales as sle;
