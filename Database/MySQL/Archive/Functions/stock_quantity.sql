drop function if exists stock_quantity;

delimiter $$

create function stock_quantity (broker_id varchar (36), ticker_id varchar (36)) returns decimal (18, 8) begin

	declare done boolean default false;
    
    declare quantity decimal (18, 8) default null;
    declare transaction_type varchar (12) default null;
    declare transaction_date date default null;
    
    declare total decimal (18, 8) default 0;
    
    declare row_cursor cursor for select
		tac.quantity as quantity,
        ttp.name as transaction_type,
        tac.transaction_date as transaction_date
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
	union select
		spl.current / spl.previous as quantity,
		'Split' as transaction_type,
		spl.split_date as transaction_date
	from
		splits as spl
	where
		(spl.broker_id = broker_id) and
        (spl.ticker_id = ticker_id) and
        (not spl.deleted)
	order by
		transaction_date;
        
	declare continue handler for not found set done = true;
    
    open row_cursor;
    
    row_loop: loop
    
		fetch row_cursor into quantity, transaction_type, transaction_date;
        
        if done then
			leave row_loop;
		end if;
        
        if transaction_type = 'Buy' then select (total + quantity) into total; end if;
        if transaction_type = 'Sell' then select (total - quantity) into total; end if;
        if transaction_type = 'Split' then select (total * quantity) into total; end if;
        
	end loop;
    
    close row_cursor;
        
	return total;
    
end$$

delimiter ;
			
	