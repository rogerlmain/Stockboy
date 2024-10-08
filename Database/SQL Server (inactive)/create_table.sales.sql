drop table if exists sales;

create table sales (
	id uniqueidentifier not null,
	ticker_id uniqueidentifier not null,
	broker_id uniqueidentifier not null,
	sale_price decimal(14,6) not null,
	sale_date datetime not null,
	settlement_date datetime not null,
	quantity decimal(14,6) not null,

	constraint PK_sales primary key (id),
	constraint FK_sales_to_tickers foreign key (ticker_id) references tickers (id),
	constraint FK_sales_to_brokers foreign key (broker_id) references brokers (id)
);

select * from sales;