-- drop function split;

create function split (@quantity decimal (14,6), @settlement_date datetime, @ticker_id uniqueidentifier) returns decimal (14,6) as begin

	declare @result decimal (14,6);

	select
		@result = coalesce ((
			select
				cast ((@quantity / spl.before * spl.after) as decimal(14,6))
			from 
				splits as spl
			where 
				(ticker_id = @ticker_id) and
				(spl.split_date >= @settlement_date)
		), @quantity)

	return @result;

end;