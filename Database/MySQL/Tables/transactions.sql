drop table if exists purchases;
drop table if exists sales;
drop table if exists transactions;

create table transactions (
	id varchar (36) unique primary key not null,
	ticker_id varchar (36) not null,
	broker_id varchar (36) not null,
	price decimal (14, 6),
	transaction_date datetime not null,
	settlement_date datetime null,
	quantity decimal (14, 6) not null,
	transaction_type_id varchar (36) not null,

	constraint FK_transactions_to_tickers foreign key (ticker_id) references tickers (id),
	constraint FK_transactions_to_brokers foreign key (broker_id) references brokers (id),
	constraint FK_transactions_to_transaction_types foreign key (transaction_type_id) references transaction_types (id)
);

insert into transactions values
	(uuid (), 'a68d31aa-7141-11ef-b1e8-a4f933c45288', 'bf6be2f3-7141-11ef-b1e8-a4f933c45288', 200.00, '2023-10-08', '2023-10-09', 51.414609, 'F5F589B0-71CE-4FEE-AF61-7516F11A90E2'),
	(uuid (), 'a68d31aa-7141-11ef-b1e8-a4f933c45288', 'bf6be2f3-7141-11ef-b1e8-a4f933c45288',   7.71, '2024-01-18', '2024-01-19', 1.542, 'F5F589B0-71CE-4FEE-AF61-7516F11A90E2'),
	(uuid (), 'a68d31aa-7141-11ef-b1e8-a4f933c45288', 'bf6be2f3-7141-11ef-b1e8-a4f933c45288', 135.00, '2024-02-18', '2024-02-20', 32.530353, 'F5F589B0-71CE-4FEE-AF61-7516F11A90E2'),
	(uuid (), 'a68d31aa-7141-11ef-b1e8-a4f933c45288', 'bf6be2f3-7141-11ef-b1e8-a4f933c45288',  12.82, '2024-04-18', '2024-04-20', 2.92694, 'F5F589B0-71CE-4FEE-AF61-7516F11A90E2'),

	(uuid (), 'a68d31aa-7141-11ef-b1e8-a4f933c45288', 'bf6be2f3-7141-11ef-b1e8-a4f933c45288',   4.44, '2024-04-22', '2024-04-23', 88.413902, '8d3196f9-715a-11ef-b1e8-a4f933c45288'),

	(uuid (), 'a68d31aa-7141-11ef-b1e8-a4f933c45288', 'bf6be2f3-7141-11ef-b1e8-a4f933c45288',   null, '2023-12-01',         null,         2, '8d3197e0-715a-11ef-b1e8-a4f933c45288'),
	(uuid (), 'a68d31aa-7141-11ef-b1e8-a4f933c45288', 'bf6be2f3-7141-11ef-b1e8-a4f933c45288',   null, '2024-01-31',         null,       3/2, '8d3197e0-715a-11ef-b1e8-a4f933c45288');