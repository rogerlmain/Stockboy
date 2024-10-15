-- drop function share_cost;

create function share_cost (@ticker_id uniqueidentifier) returns decimal(14,6) as begin

	declare @result decimal (14,6);

	with costs as (
		select
			(select sum(pur.quantity * pur.purchase_price) from purchases as pur where pur.ticker_id = @ticker_id) as purchase_price,
			(select sum(sls.quantity * sls.sale_price) from sales as sls where sls.ticker_id = @ticker_id) as sale_price
	) select
		@result = cst.purchase_price - coalesce (cst.sale_price, 0)
	from
		costs as cst;

	return @result;

end;

