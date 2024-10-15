drop procedure if exists get_dividend_by_id;

delimiter $$

create procedure get_dividend_by_id (id varchar (36)) begin

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
		(dvd.id = id);

end$$

delimiter ;