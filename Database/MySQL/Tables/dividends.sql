drop table if exists dividends;

create table dividends (
	id varchar (36) unique primary key not null,
	broker_id varchar (36) not null,
	ticker_id varchar (36) not null,
	issue_date date not null,
	amount_per_share decimal (14,6) not null,
    share_quantity decimal (14,6) not null,
    deleted boolean not null default false,

	constraint FK_dividends_to_brokers foreign key (broker_id) references brokers (id),
	constraint FK_dividends_to_tickers foreign key (ticker_id) references tickers (id)
)