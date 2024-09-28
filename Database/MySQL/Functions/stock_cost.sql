drop function if exists stock_cost;

delimiter $$

create function stock_cost (ticker_id varchar (36), broker_id varchar (36)) returns decimal (18, 8) begin

	declare done boolean default false;
    
    declare cost decimal (18, 8) default null;
    declare transaction_type varchar (12) default null;
    
    declare total decimal (18, 8) default 0;
    
    declare row_cursor cursor for select
		tac.price * tac.quantity as cost,
        ttp.name as transaction_type
	from
		transactions as tac
	join
		transaction_types as ttp
	on
		ttp.id = tac.transaction_type_id
	where
		(tac.broker_id = broker_id) and
        (tac.ticker_id = ticker_id) and
        (not tac.deleted)
	order by
		tac.transaction_date;
        
	declare continue handler for not found set done = true;
    
    open row_cursor;
    
    row_loop: loop
    
		fetch row_cursor into cost, transaction_type;
        
        if done then
			leave row_loop;
		end if;
        
        if transaction_type = 'Buy' then select (total + cost) into total; end if;
        if transaction_type = 'Sell' then select (total - cost) into total; end if;
        if transaction_type = 'Split' then select (total * cost) into total; end if;
        
	end loop;
    
    close row_cursor;
        
	return total;
    
end$$

delimiter ;
			
	