drop procedure if exists get_transaction_tickers;

delimiter $$

create procedure get_transaction_tickers (broker_id varchar (36)) begin

	select distinct
		tck.id,
        tck.name,
        tck.symbol
	from
		tickers as tck
	join
		transactions as tac
	on
		(tac.ticker_id = tck.id)
	where
		(tac.broker_id = broker_id)
	order by
		tck.name;
        
end$$

delimiter ;