-- drop procedure select_purchase_by_id;

create procedure select_purchase_by_id (@id uniqueidentifier) as begin

	select
		id,
		ticker_id,
		broker_id,
		purchase_price,
		purchase_date,
		settlement_date,
		quantity,
		purchase_type_id
	from
		purchases
 	where
		id = @id;

end;