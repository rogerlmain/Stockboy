-- drop function share_count;

create function share_count (@ticker_id uniqueidentifier = null) returns decimal as begin

	declare @result decimal;

	if @ticker_id is null
		select @result = sum (quantity) from purchases
	else
		select @result = sum (quantity) from purchases where ticker_id = @ticker_id;

	return @result;

end;