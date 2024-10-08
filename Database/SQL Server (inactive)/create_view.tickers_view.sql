-- drop view tickers_view;

create view tickers_view as select
	tck.id,
	tck.symbol,
	tck.name,
	dbo.share_count (tck.id) as shares_held,
	dbo.share_count (tck.id) / dbo.share_count (null) * 100 as share_percentage
from 
	tickers as tck;