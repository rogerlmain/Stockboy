-- drop function share_count;

create function share_count (@ticker_id uniqueidentifier, @broker_id uniqueidentifier = null) returns decimal(14,6) as begin

	declare @result decimal;

	with quantities as (
		select
			(select sum(spp.split_quantity) from split_purchases () as spp where (spp.ticker_id = @ticker_id) and ((spp.broker_id = @broker_id) or (@broker_id is null))) as total_purchases,
			(select sum(sps.split_quantity) from split_sales () as sps where (sps.ticker_id = @ticker_id) and ((sps.broker_id = @broker_id) or (@broker_id is null))) as total_sales
	) select
		@result = qty.total_purchases - coalesce (qty.total_sales, 0) -- as holdings
	from
		quantities as qty;

	return @result;

end;