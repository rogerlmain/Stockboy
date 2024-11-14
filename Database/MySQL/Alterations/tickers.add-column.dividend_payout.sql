alter table tickers add column dividend_payout decimal (14,6) default null after ex_dividend_date; 
select * from tickers where ex_dividend_date is not null;