-- drop function share_count;

create function share_count (@ticker_id uniqueidentifier) returns decimal(14,6) as begin

	declare @result decimal (14,6);

	with quantities as (
		select
			(select sum(dbo.split (pch.quantity, pch.settlement_date, @ticker_id)) from purchases as pch where (pch.ticker_id = @ticker_id) or (@ticker_id is null)) as total_purchases,
			(select sum(dbo.split (sle.quantity, sle.settlement_date, @ticker_id)) from sales as sle where (sle.ticker_id = @ticker_id) or (@ticker_id is null)) as total_sales
	) select
		@result = greatest (coalesce (qty.total_purchases, 0) - coalesce (qty.total_sales, 0), 0)
	from
		quantities as qty;

	return @result;

end;


