drop procedure if exists select_transactions;

delimiter $$

create procedure select_transactions () begin

	select 
		brk.name as broker,
		tck.name as ticker,
		trn.price,
		trn.quantity,
		trn.transaction_date,
		trn.settlement_date,
		ttp.name as transaction_type,
		trn.deleted
	from
		transactions as trn
	join
		brokers as brk
	on
		brk.id = trn.broker_id
	join
		tickers as tck
	on
		tck.id = trn.ticker_id
	join
		transaction_types as ttp
	on
		ttp.id = trn.transaction_type_id
	order by
		brk.name,
		tck.name,
		trn.transaction_date;
        
end$$

delimiter ;