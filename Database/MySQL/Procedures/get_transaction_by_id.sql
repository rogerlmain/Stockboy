drop procedure if exists get_transaction_by_id;

delimiter $$

create procedure get_transaction_by_id (id varchar (36)) begin

	select
		tac.id,
        brk.id as broker_id,
        tck.id as ticker_id,
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
		(tac.id = id) and
        (not tac.deleted);

end $$

delimiter ;