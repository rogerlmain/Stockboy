drop procedure if exists get_transaction_history;

delimiter $$

create procedure get_transaction_history (broker_id varchar (36), ticker_id varchar (36)) begin

	select
		tac.id,
        tck.name as company,
        tck.symbol as ticker,
		brk.name as broker,
        tac.price,
		tac.quantity,
		tac.transaction_date,
		tac.settlement_date,
		ttp.name as transaction_type
	from 
		transactions as tac
	join
		tickers as tck
	on
		tck.id = tac.ticker_id
	join
		brokers as brk
	on
		brk.id = tac.broker_id
	join
		transaction_types as ttp
	on
		ttp.id = transaction_type_id
	where
		((brk.id = broker_id) or (broker_id is null)) and
		((tck.id = ticker_id) or (ticker_id is null)) and
        (not tac.deleted);

end $$

delimiter ;