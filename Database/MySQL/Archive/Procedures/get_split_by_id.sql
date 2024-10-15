drop procedure if exists get_split_by_id;

delimiter $$

create procedure get_split_by_id (id varchar (36)) begin

	select
		spl.id,
        brk.id as broker_id,
        tck.id as ticker_id,
		brk.name as broker,
        tck.name as company,
        tck.symbol,
		previous,
        current,
        split_date
	from
		splits as spl
	join
		brokers as brk
	on
		(brk.id = spl.broker_id)
	join
		tickers as tck
	on
		tck.id = spl.ticker_id
	where
		(spl.id = id);
        
end$$

delimiter ;