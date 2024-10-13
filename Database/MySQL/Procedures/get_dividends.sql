drop procedure if exists get_dividends;

delimiter $$

create procedure get_dividends (broker_id varchar (36), ticker_id varchar (36)) begin

	select
		dvd.id,
        brk.name as broker,
        tck.name as ticker,
        dvd.broker_id,
        dvd.ticker_id,
        dvd.issue_date,
        dvd.amount_per_share,
        dvd.share_quantity,
        dvd.amount_per_share * dvd.share_quantity as payout
	from
		dividends as dvd
	join
		brokers as brk
	on
		brk.id = dvd.broker_id
	join
		tickers as tck
	on
		tck.id = dvd.ticker_id
	where
		((dvd.broker_id = broker_id) or (broker_id is null)) and
        ((dvd.ticker_id = ticker_id) or (ticker_id is null));

end$$

delimiter ;