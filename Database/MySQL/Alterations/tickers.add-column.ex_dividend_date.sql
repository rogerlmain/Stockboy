alter table tickers add column ex_dividend_date date default null after next_payment_date;
select * from tickers;