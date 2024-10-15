drop procedure if exists get_tickers;

delimiter $$

create procedure get_tickers (broker_id varchar (36)) begin

	select distinct
		tck.id,
        tck.name,
        tck.symbol
	from
		tickers as tck
	where
		(tck.broker_id = broker_id)
	order by
		tck.name;
        
end$$

delimiter ;