drop procedure if exists get_transactions;

delimiter $$

create procedure get_transactions (broker_id varchar (36), ticker_id varchar (36)) begin

	select
		tac.id,
        brk.id as broker_id,
        tck.id as ticker_id,
        tck.name as company,
		brk.name as broker,
        tck.symbol as ticker,
        tac.price,
		tac.quantity,
        tac.price * tac.quantity as cost,
		tac.transaction_date,
		tac.settlement_date,
		ttp.name as transaction_type,
        ttp.id as transaction_type_id
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