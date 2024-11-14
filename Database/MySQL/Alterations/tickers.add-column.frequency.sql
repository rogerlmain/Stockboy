alter table tickers add column frequency int default null after next_payment_date;
select * from tickers;