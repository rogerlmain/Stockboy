alter table tickers 
	add column price decimal (14, 6) after name,
	add column last_updated datetime after dividend_frequency,
	add column volume int after price;

select * from tickers;