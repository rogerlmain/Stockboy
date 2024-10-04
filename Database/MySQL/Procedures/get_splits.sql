drop procedure if exists get_splits;

delimiter $$

create procedure get_splits (broker_id varchar (36), ticker_id varchar (36)) begin

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
		((brk.id = broker_id) or (broker_id is null)) and
        ((tck.id = ticker_id) or (ticker_id is null));
        
end$$

delimiter ;