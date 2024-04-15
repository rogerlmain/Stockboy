drop table if exists dividends;

create table dividends (
	id uniqueidentifier not null,
	broker_id uniqueidentifier not null,
	ticker_id uniqueidentifier not null,
	issue_date date not null,
	amount_per_share decimal(7,2) not null,

	constraint PK_dividends primary key (id),
	constraint FK_dividends_to_brokers foreign key (broker_id) references brokers (id),
	constraint FK_dividends_to_tickers foreign key (ticker_id) references tickers (id)
)