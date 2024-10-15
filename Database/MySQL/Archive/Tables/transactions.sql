drop table if exists transactions;

create table transactions (
	id varchar (36) unique primary key not null,
	broker_id varchar (36) not null,
	ticker_id varchar (36) not null,
	price decimal (14, 6),
	quantity decimal (14, 6) not null,
	transaction_date datetime not null,
	settlement_date datetime null,
	transaction_type_id varchar (36) not null,
    deleted boolean not null default false,

	constraint FK_transactions_to_tickers foreign key (ticker_id) references tickers (id),
	constraint FK_transactions_to_brokers foreign key (broker_id) references brokers (id),
	constraint FK_transactions_to_transaction_types foreign key (transaction_type_id) references transaction_types (id)
);

insert into transactions values
	('5b081641-7172-11ef-b1e8-a4f933c45288', 'bf6be2f3-7141-11ef-b1e8-a4f933c45288', '153d4589-7168-11ef-b1e8-a4f933c45288', 0.000000, 1.000000, '2020-05-07 00:00:00', '2020-05-07 00:00:00', 'F5F589B0-71CE-4FEE-AF61-7516F11A90E2', false),
	('5b081ed5-7172-11ef-b1e8-a4f933c45288', 'bf6be2f3-7141-11ef-b1e8-a4f933c45288', '153d35c6-7168-11ef-b1e8-a4f933c45288', 0.120000, 35.000000, '2023-06-09 00:00:00', '2023-06-13 00:00:00', '8d3196f9-715a-11ef-b1e8-a4f933c45288', false),
	('5b082182-7172-11ef-b1e8-a4f933c45288', 'bf6be2f3-7141-11ef-b1e8-a4f933c45288', '153d35c6-7168-11ef-b1e8-a4f933c45288', 0.120000, 35.000000, '2023-06-09 00:00:00', '2023-06-13 00:00:00', 'F5F589B0-71CE-4FEE-AF61-7516F11A90E2', false),
	('5b0822e2-7172-11ef-b1e8-a4f933c45288', 'bf6be2f3-7141-11ef-b1e8-a4f933c45288', '153d3272-7168-11ef-b1e8-a4f933c45288', 0.260000, 50.000000, '2023-06-01 00:00:00', '2023-06-05 00:00:00', '8d3196f9-715a-11ef-b1e8-a4f933c45288', false),
	('5b082432-7172-11ef-b1e8-a4f933c45288', 'bf6be2f3-7141-11ef-b1e8-a4f933c45288', '153d3272-7168-11ef-b1e8-a4f933c45288', 0.260000, 50.000000, '2023-05-30 00:00:00', '2023-06-01 00:00:00', 'F5F589B0-71CE-4FEE-AF61-7516F11A90E2', false),
	('5b082623-7172-11ef-b1e8-a4f933c45288', 'bf6be2f3-7141-11ef-b1e8-a4f933c45288', '153d4626-7168-11ef-b1e8-a4f933c45288', 0.270000, 50.000000, '2023-06-22 00:00:00', '2023-06-26 00:00:00', 'F5F589B0-71CE-4FEE-AF61-7516F11A90E2', false),
	('5b082938-7172-11ef-b1e8-a4f933c45288', 'bf6be2f3-7141-11ef-b1e8-a4f933c45288', '153d4626-7168-11ef-b1e8-a4f933c45288', 0.280000, 50.000000, '2023-06-23 00:00:00', '2023-06-27 00:00:00', '8d3196f9-715a-11ef-b1e8-a4f933c45288', false),
	('5b082acd-7172-11ef-b1e8-a4f933c45288', 'bf6be2f3-7141-11ef-b1e8-a4f933c45288', '153d3c55-7168-11ef-b1e8-a4f933c45288', 0.300000, 40.000000, '2023-06-30 00:00:00', '2023-07-05 00:00:00', 'F5F589B0-71CE-4FEE-AF61-7516F11A90E2', false),
	('5b082c44-7172-11ef-b1e8-a4f933c45288', 'bf6be2f3-7141-11ef-b1e8-a4f933c45288', '153d3c55-7168-11ef-b1e8-a4f933c45288', 0.320000, 40.000000, '2023-09-05 00:00:00', '2023-09-07 00:00:00', '8d3196f9-715a-11ef-b1e8-a4f933c45288', false),
	('5b082d7b-7172-11ef-b1e8-a4f933c45288', 'bf6be2f3-7141-11ef-b1e8-a4f933c45288', '153d398e-7168-11ef-b1e8-a4f933c45288', 0.340000, 10.000000, '2023-06-15 00:00:00', '2023-06-20 00:00:00', 'F5F589B0-71CE-4FEE-AF61-7516F11A90E2', false),
	('5b082ece-7172-11ef-b1e8-a4f933c45288', 'bf6be2f3-7141-11ef-b1e8-a4f933c45288', '153d398e-7168-11ef-b1e8-a4f933c45288', 0.360000, 10.000000, '2023-06-15 00:00:00', '2023-06-20 00:00:00', '8d3196f9-715a-11ef-b1e8-a4f933c45288', false),
	('5b083009-7172-11ef-b1e8-a4f933c45288', 'bf6be2f3-7141-11ef-b1e8-a4f933c45288', '153d4fe6-7168-11ef-b1e8-a4f933c45288', 0.490000, 25.000000, '2023-06-23 00:00:00', '2023-06-27 00:00:00', 'F5F589B0-71CE-4FEE-AF61-7516F11A90E2', false),
	('5b083185-7172-11ef-b1e8-a4f933c45288', 'bf6be2f3-7141-11ef-b1e8-a4f933c45288', '153d34df-7168-11ef-b1e8-a4f933c45288', 0.630000, 20.000000, '2023-07-05 00:00:00', '2023-07-07 00:00:00', 'F5F589B0-71CE-4FEE-AF61-7516F11A90E2', false),
	('5b0832c8-7172-11ef-b1e8-a4f933c45288', 'bf6be2f3-7141-11ef-b1e8-a4f933c45288', '153d38bb-7168-11ef-b1e8-a4f933c45288', 0.630000, 25.000000, '2023-06-27 00:00:00', '2023-06-29 00:00:00', 'F5F589B0-71CE-4FEE-AF61-7516F11A90E2', false),
	('5b083497-7172-11ef-b1e8-a4f933c45288', 'bf6be2f3-7141-11ef-b1e8-a4f933c45288', '153d4752-7168-11ef-b1e8-a4f933c45288', 0.640000, 7.000000, '2023-06-09 00:00:00', '2023-06-13 00:00:00', 'F5F589B0-71CE-4FEE-AF61-7516F11A90E2', false),
	('5b0835f5-7172-11ef-b1e8-a4f933c45288', 'bf6be2f3-7141-11ef-b1e8-a4f933c45288', '153d4b99-7168-11ef-b1e8-a4f933c45288', 0.730000, 5.000000, '2023-09-11 00:00:00', '2023-09-11 00:00:00', 'F5F589B0-71CE-4FEE-AF61-7516F11A90E2', false),
	('5b083747-7172-11ef-b1e8-a4f933c45288', 'bf6be2f3-7141-11ef-b1e8-a4f933c45288', '153d3e18-7168-11ef-b1e8-a4f933c45288', 0.780000, 20.000000, '2023-06-01 00:00:00', '2023-06-05 00:00:00', '8d3196f9-715a-11ef-b1e8-a4f933c45288', false),
	('5b083886-7172-11ef-b1e8-a4f933c45288', 'bf6be2f3-7141-11ef-b1e8-a4f933c45288', '153d3e18-7168-11ef-b1e8-a4f933c45288', 0.800000, 20.000000, '2023-05-31 00:00:00', '2023-06-02 00:00:00', 'F5F589B0-71CE-4FEE-AF61-7516F11A90E2', false),
	('5b083d13-7172-11ef-b1e8-a4f933c45288', 'bf6be2f3-7141-11ef-b1e8-a4f933c45288', '153d405a-7168-11ef-b1e8-a4f933c45288', 0.830000, 10.000000, '2023-05-31 00:00:00', '2023-06-02 00:00:00', 'F5F589B0-71CE-4FEE-AF61-7516F11A90E2', false),
	('5b083ebd-7172-11ef-b1e8-a4f933c45288', 'bf6be2f3-7141-11ef-b1e8-a4f933c45288', '153d405a-7168-11ef-b1e8-a4f933c45288', 0.840000, 10.000000, '2023-05-31 00:00:00', '2023-06-02 00:00:00', '8d3196f9-715a-11ef-b1e8-a4f933c45288', false),
	('5b084007-7172-11ef-b1e8-a4f933c45288', 'bf6be2f3-7141-11ef-b1e8-a4f933c45288', '153d4f53-7168-11ef-b1e8-a4f933c45288', 0.880000, 10.000000, '2023-06-01 00:00:00', '2023-06-05 00:00:00', '8d3196f9-715a-11ef-b1e8-a4f933c45288', false),
	('5b084161-7172-11ef-b1e8-a4f933c45288', 'bf6be2f3-7141-11ef-b1e8-a4f933c45288', '153d3a59-7168-11ef-b1e8-a4f933c45288', 0.910000, 13.000000, '2023-06-16 00:00:00', '2023-06-21 00:00:00', 'F5F589B0-71CE-4FEE-AF61-7516F11A90E2', false),
	('5b0842b9-7172-11ef-b1e8-a4f933c45288', 'bf6be2f3-7141-11ef-b1e8-a4f933c45288', '153d4f53-7168-11ef-b1e8-a4f933c45288', 0.910000, 10.000000, '2023-05-31 00:00:00', '2023-06-02 00:00:00', 'F5F589B0-71CE-4FEE-AF61-7516F11A90E2', false),
	('5b08440d-7172-11ef-b1e8-a4f933c45288', 'bf6be2f3-7141-11ef-b1e8-a4f933c45288', '153d3a59-7168-11ef-b1e8-a4f933c45288', 0.920000, 14.000000, '2023-06-30 00:00:00', '2023-07-05 00:00:00', 'F5F589B0-71CE-4FEE-AF61-7516F11A90E2', false),
	('5b0845a4-7172-11ef-b1e8-a4f933c45288', 'bf6be2f3-7141-11ef-b1e8-a4f933c45288', '153d44ac-7168-11ef-b1e8-a4f933c45288', 0.920000, 13.000000, '2023-06-29 00:00:00', '2023-07-03 00:00:00', 'F5F589B0-71CE-4FEE-AF61-7516F11A90E2', false),
	('5b0846ff-7172-11ef-b1e8-a4f933c45288', 'bf6be2f3-7141-11ef-b1e8-a4f933c45288', '153d5114-7168-11ef-b1e8-a4f933c45288', 0.920000, 13.000000, '2023-06-16 00:00:00', '2023-06-21 00:00:00', 'F5F589B0-71CE-4FEE-AF61-7516F11A90E2', false),
	('5b084878-7172-11ef-b1e8-a4f933c45288', 'bf6be2f3-7141-11ef-b1e8-a4f933c45288', '153d3ba4-7168-11ef-b1e8-a4f933c45288', 0.960000, 10.000000, '2023-05-31 00:00:00', '2023-06-02 00:00:00', 'F5F589B0-71CE-4FEE-AF61-7516F11A90E2', false),
	('5b0849cc-7172-11ef-b1e8-a4f933c45288', 'bf6be2f3-7141-11ef-b1e8-a4f933c45288', '153d3eb2-7168-11ef-b1e8-a4f933c45288', 0.960000, 12.000000, '2023-06-23 00:00:00', '2023-06-27 00:00:00', 'F5F589B0-71CE-4FEE-AF61-7516F11A90E2', false),
	('5b084b75-7172-11ef-b1e8-a4f933c45288', 'bf6be2f3-7141-11ef-b1e8-a4f933c45288', '153d5114-7168-11ef-b1e8-a4f933c45288', 0.970000, 13.000000, '2023-07-03 00:00:00', '2023-07-06 00:00:00', '8d3196f9-715a-11ef-b1e8-a4f933c45288', false),
	('5b084d53-7172-11ef-b1e8-a4f933c45288', 'bf6be2f3-7141-11ef-b1e8-a4f933c45288', '153d3ba4-7168-11ef-b1e8-a4f933c45288', 0.980000, 10.000000, '2023-05-31 00:00:00', '2023-06-02 00:00:00', '8d3196f9-715a-11ef-b1e8-a4f933c45288', false),
	('5b084ef4-7172-11ef-b1e8-a4f933c45288', 'bf6be2f3-7141-11ef-b1e8-a4f933c45288', '153d3ba4-7168-11ef-b1e8-a4f933c45288', 0.990000, 4.000000, '2023-06-15 00:00:00', '2023-06-20 00:00:00', 'F5F589B0-71CE-4FEE-AF61-7516F11A90E2', false),
	('5b085064-7172-11ef-b1e8-a4f933c45288', 'bf6be2f3-7141-11ef-b1e8-a4f933c45288', '153d3a59-7168-11ef-b1e8-a4f933c45288', 1.000000, 13.000000, '2023-06-21 00:00:00', '2023-06-23 00:00:00', '8d3196f9-715a-11ef-b1e8-a4f933c45288', false),
	('5b0851c6-7172-11ef-b1e8-a4f933c45288', 'bf6be2f3-7141-11ef-b1e8-a4f933c45288', '153d3a59-7168-11ef-b1e8-a4f933c45288', 1.000000, 4.000000, '2023-07-24 00:00:00', '2023-07-26 00:00:00', '8d3196f9-715a-11ef-b1e8-a4f933c45288', false),
	('5b085317-7172-11ef-b1e8-a4f933c45288', 'bf6be2f3-7141-11ef-b1e8-a4f933c45288', '153d3a59-7168-11ef-b1e8-a4f933c45288', 1.000000, 10.000000, '2023-07-24 00:00:00', '2023-07-26 00:00:00', '8d3196f9-715a-11ef-b1e8-a4f933c45288', false),
	('5b085449-7172-11ef-b1e8-a4f933c45288', 'bf6be2f3-7141-11ef-b1e8-a4f933c45288', '153d3eb2-7168-11ef-b1e8-a4f933c45288', 1.000000, 12.000000, '2023-06-29 00:00:00', '2023-07-03 00:00:00', '8d3196f9-715a-11ef-b1e8-a4f933c45288', false),
	('5b08567a-7172-11ef-b1e8-a4f933c45288', 'bf6be2f3-7141-11ef-b1e8-a4f933c45288', '153d37fc-7168-11ef-b1e8-a4f933c45288', 1.050000, 10.000000, '2023-06-01 00:00:00', '2023-06-05 00:00:00', '8d3196f9-715a-11ef-b1e8-a4f933c45288', false),
	('5b085849-7172-11ef-b1e8-a4f933c45288', 'bf6be2f3-7141-11ef-b1e8-a4f933c45288', '153d37fc-7168-11ef-b1e8-a4f933c45288', 1.060000, 10.000000, '2023-05-30 00:00:00', '2023-06-01 00:00:00', 'F5F589B0-71CE-4FEE-AF61-7516F11A90E2', false),
	('5b0859c7-7172-11ef-b1e8-a4f933c45288', 'bf6be2f3-7141-11ef-b1e8-a4f933c45288', '153d46b6-7168-11ef-b1e8-a4f933c45288', 1.150000, 18.000000, '2023-07-12 00:00:00', '2023-07-14 00:00:00', 'F5F589B0-71CE-4FEE-AF61-7516F11A90E2', false),
	('5b085b37-7172-11ef-b1e8-a4f933c45288', 'bf6be2f3-7141-11ef-b1e8-a4f933c45288', '153d3745-7168-11ef-b1e8-a4f933c45288', 1.200000, 10.000000, '2023-06-01 00:00:00', '2023-06-05 00:00:00', '8d3196f9-715a-11ef-b1e8-a4f933c45288', false),
	('5b085ca5-7172-11ef-b1e8-a4f933c45288', 'bf6be2f3-7141-11ef-b1e8-a4f933c45288', '153d46b6-7168-11ef-b1e8-a4f933c45288', 1.210000, 3.000000, '2023-07-27 00:00:00', '2023-07-31 00:00:00', '8d3196f9-715a-11ef-b1e8-a4f933c45288', false),
	('5b085ea5-7172-11ef-b1e8-a4f933c45288', 'bf6be2f3-7141-11ef-b1e8-a4f933c45288', '153d46b6-7168-11ef-b1e8-a4f933c45288', 1.210000, 1.000000, '2023-07-27 00:00:00', '2023-07-31 00:00:00', '8d3196f9-715a-11ef-b1e8-a4f933c45288', false),
	('5b08601c-7172-11ef-b1e8-a4f933c45288', 'bf6be2f3-7141-11ef-b1e8-a4f933c45288', '153d46b6-7168-11ef-b1e8-a4f933c45288', 1.210000, 3.000000, '2023-07-28 00:00:00', '2023-08-01 00:00:00', '8d3196f9-715a-11ef-b1e8-a4f933c45288', false),
	('5b086187-7172-11ef-b1e8-a4f933c45288', 'bf6be2f3-7141-11ef-b1e8-a4f933c45288', '153d46b6-7168-11ef-b1e8-a4f933c45288', 1.210000, 1.000000, '2023-07-28 00:00:00', '2023-08-01 00:00:00', '8d3196f9-715a-11ef-b1e8-a4f933c45288', false),
	('5b0862d7-7172-11ef-b1e8-a4f933c45288', 'bf6be2f3-7141-11ef-b1e8-a4f933c45288', '153d46b6-7168-11ef-b1e8-a4f933c45288', 1.210000, 1.000000, '2023-07-28 00:00:00', '2023-08-01 00:00:00', '8d3196f9-715a-11ef-b1e8-a4f933c45288', false),
	('5b086400-7172-11ef-b1e8-a4f933c45288', 'bf6be2f3-7141-11ef-b1e8-a4f933c45288', '153d46b6-7168-11ef-b1e8-a4f933c45288', 1.220000, 9.000000, '2023-07-27 00:00:00', '2023-07-31 00:00:00', '8d3196f9-715a-11ef-b1e8-a4f933c45288', false),
	('5b08652b-7172-11ef-b1e8-a4f933c45288', 'bf6be2f3-7141-11ef-b1e8-a4f933c45288', '153d1cbf-7168-11ef-b1e8-a4f933c45288', 1.220000, 15.000000, '2023-07-12 00:00:00', '2023-07-14 00:00:00', 'F5F589B0-71CE-4FEE-AF61-7516F11A90E2', false),
	('5b086689-7172-11ef-b1e8-a4f933c45288', 'bf6be2f3-7141-11ef-b1e8-a4f933c45288', '153d3745-7168-11ef-b1e8-a4f933c45288', 1.250000, 10.000000, '2023-05-31 00:00:00', '2023-06-02 00:00:00', 'F5F589B0-71CE-4FEE-AF61-7516F11A90E2', false),
	('5b0867d0-7172-11ef-b1e8-a4f933c45288', 'bf6be2f3-7141-11ef-b1e8-a4f933c45288', '153d1cbf-7168-11ef-b1e8-a4f933c45288', 1.280000, 15.000000, '2023-07-12 00:00:00', '2023-07-14 00:00:00', '8d3196f9-715a-11ef-b1e8-a4f933c45288', false),
	('5b086bd4-7172-11ef-b1e8-a4f933c45288', 'bf6be2f3-7141-11ef-b1e8-a4f933c45288', '153d51bf-7168-11ef-b1e8-a4f933c45288', 1.460000, 12.000000, '2023-07-13 00:00:00', '2023-07-17 00:00:00', 'F5F589B0-71CE-4FEE-AF61-7516F11A90E2', false),
	('5b086cee-7172-11ef-b1e8-a4f933c45288', 'bf6be2f3-7141-11ef-b1e8-a4f933c45288', '153d51bf-7168-11ef-b1e8-a4f933c45288', 1.530000, 12.000000, '2023-07-24 00:00:00', '2023-07-26 00:00:00', '8d3196f9-715a-11ef-b1e8-a4f933c45288', false),
	('5b086db5-7172-11ef-b1e8-a4f933c45288', 'bf6be2f3-7141-11ef-b1e8-a4f933c45288', '153d3ba4-7168-11ef-b1e8-a4f933c45288', 1.810000, 0.160000, '2024-04-23 00:00:00', '2024-04-25 00:00:00', '8d3196f9-715a-11ef-b1e8-a4f933c45288', false),
	('5b086e78-7172-11ef-b1e8-a4f933c45288', 'bf6be2f3-7141-11ef-b1e8-a4f933c45288', '153d4805-7168-11ef-b1e8-a4f933c45288', 2.000000, 0.863633, '2024-04-23 00:00:00', '2024-04-25 00:00:00', '8d3196f9-715a-11ef-b1e8-a4f933c45288', false),
	('5b086f35-7172-11ef-b1e8-a4f933c45288', 'bf6be2f3-7141-11ef-b1e8-a4f933c45288', '153d4805-7168-11ef-b1e8-a4f933c45288', 2.020000, 53.119995, '2024-04-23 00:00:00', '2024-04-25 00:00:00', '8d3196f9-715a-11ef-b1e8-a4f933c45288', false),
	('5b087011-7172-11ef-b1e8-a4f933c45288', 'bf6be2f3-7141-11ef-b1e8-a4f933c45288', '153d4ae0-7168-11ef-b1e8-a4f933c45288', 2.900000, 0.796901, '2024-09-10 00:00:00', '2024-09-11 00:00:00', 'F5F589B0-71CE-4FEE-AF61-7516F11A90E2', false),
	('5b0870cf-7172-11ef-b1e8-a4f933c45288', 'bf6be2f3-7141-11ef-b1e8-a4f933c45288', '153d4ae0-7168-11ef-b1e8-a4f933c45288', 2.910000, 76.951391, '2024-09-10 00:00:00', '2024-09-11 00:00:00', 'F5F589B0-71CE-4FEE-AF61-7516F11A90E2', false),
	('5b087191-7172-11ef-b1e8-a4f933c45288', 'bf6be2f3-7141-11ef-b1e8-a4f933c45288', '153d507e-7168-11ef-b1e8-a4f933c45288', 3.000000, 1.000000, '2024-04-23 00:00:00', '2024-04-25 00:00:00', '8d3196f9-715a-11ef-b1e8-a4f933c45288', false),
	('5b08729f-7172-11ef-b1e8-a4f933c45288', 'bf6be2f3-7141-11ef-b1e8-a4f933c45288', '153d38bb-7168-11ef-b1e8-a4f933c45288', 3.040000, 2.000000, '2024-04-23 00:00:00', '2024-04-25 00:00:00', '8d3196f9-715a-11ef-b1e8-a4f933c45288', false),
	('5b087369-7172-11ef-b1e8-a4f933c45288', 'bf6be2f3-7141-11ef-b1e8-a4f933c45288', '153d38bb-7168-11ef-b1e8-a4f933c45288', 3.080000, 0.500000, '2024-04-23 00:00:00', '2024-04-25 00:00:00', '8d3196f9-715a-11ef-b1e8-a4f933c45288', false),
	('5b08741c-7172-11ef-b1e8-a4f933c45288', 'bf6be2f3-7141-11ef-b1e8-a4f933c45288', '153d507e-7168-11ef-b1e8-a4f933c45288', 3.140000, 0.300000, '2024-04-23 00:00:00', '2024-04-25 00:00:00', '8d3196f9-715a-11ef-b1e8-a4f933c45288', false),
	('5b0874eb-7172-11ef-b1e8-a4f933c45288', 'bf6be2f3-7141-11ef-b1e8-a4f933c45288', '153d3d87-7168-11ef-b1e8-a4f933c45288', 3.210000, 0.985614, '2024-04-23 00:00:00', '2024-04-25 00:00:00', '8d3196f9-715a-11ef-b1e8-a4f933c45288', false),
	('5b0875a1-7172-11ef-b1e8-a4f933c45288', 'bf6be2f3-7141-11ef-b1e8-a4f933c45288', '153d3d87-7168-11ef-b1e8-a4f933c45288', 3.270000, 4.000000, '2024-04-23 00:00:00', '2024-04-25 00:00:00', '8d3196f9-715a-11ef-b1e8-a4f933c45288', false),
	('5b0876b8-7172-11ef-b1e8-a4f933c45288', 'bf6be2f3-7141-11ef-b1e8-a4f933c45288', '153d3d87-7168-11ef-b1e8-a4f933c45288', 3.290000, 0.042553, '2024-04-08 00:00:00', '2024-04-10 00:00:00', 'F5F589B0-71CE-4FEE-AF61-7516F11A90E2', false),
	('5b087781-7172-11ef-b1e8-a4f933c45288', 'bf6be2f3-7141-11ef-b1e8-a4f933c45288', '153d3d87-7168-11ef-b1e8-a4f933c45288', 3.290000, 0.173252, '2024-04-08 00:00:00', '2024-04-10 00:00:00', 'F5F589B0-71CE-4FEE-AF61-7516F11A90E2', false),
	('5b087843-7172-11ef-b1e8-a4f933c45288', 'bf6be2f3-7141-11ef-b1e8-a4f933c45288', '153d4626-7168-11ef-b1e8-a4f933c45288', 3.360000, 10.000000, '2023-08-04 00:00:00', '2023-08-08 00:00:00', 'F5F589B0-71CE-4FEE-AF61-7516F11A90E2', false),
	('5b087906-7172-11ef-b1e8-a4f933c45288', 'bf6be2f3-7141-11ef-b1e8-a4f933c45288', '153d3d87-7168-11ef-b1e8-a4f933c45288', 3.490000, 4.584527, '2023-11-01 00:00:00', '2023-11-03 00:00:00', 'F5F589B0-71CE-4FEE-AF61-7516F11A90E2', false),
	('5b0879fc-7172-11ef-b1e8-a4f933c45288', 'bf6be2f3-7141-11ef-b1e8-a4f933c45288', '153d4626-7168-11ef-b1e8-a4f933c45288', 3.720000, 10.000000, '2023-08-07 00:00:00', '2023-08-09 00:00:00', '8d3196f9-715a-11ef-b1e8-a4f933c45288', false),
	('5b087abc-7172-11ef-b1e8-a4f933c45288', 'bf6be2f3-7141-11ef-b1e8-a4f933c45288', '153d3d87-7168-11ef-b1e8-a4f933c45288', 3.720000, 0.147849, '2024-01-09 00:00:00', '2024-01-11 00:00:00', 'F5F589B0-71CE-4FEE-AF61-7516F11A90E2', false),
	('5b087b8f-7172-11ef-b1e8-a4f933c45288', 'bf6be2f3-7141-11ef-b1e8-a4f933c45288', '153d3d87-7168-11ef-b1e8-a4f933c45288', 3.740000, 0.037433, '2024-01-09 00:00:00', '2024-01-11 00:00:00', 'F5F589B0-71CE-4FEE-AF61-7516F11A90E2', false),
	('5b087c47-7172-11ef-b1e8-a4f933c45288', 'bf6be2f3-7141-11ef-b1e8-a4f933c45288', '153d4805-7168-11ef-b1e8-a4f933c45288', 3.820000, 0.141361, '2024-02-16 00:00:00', '2024-02-21 00:00:00', 'F5F589B0-71CE-4FEE-AF61-7516F11A90E2', false),
	('5b087d05-7172-11ef-b1e8-a4f933c45288', 'bf6be2f3-7141-11ef-b1e8-a4f933c45288', '153d4805-7168-11ef-b1e8-a4f933c45288', 3.890000, 1.000000, '2023-10-09 00:00:00', '2023-10-11 00:00:00', 'F5F589B0-71CE-4FEE-AF61-7516F11A90E2', false),
	('5b087dcc-7172-11ef-b1e8-a4f933c45288', 'bf6be2f3-7141-11ef-b1e8-a4f933c45288', '153d4805-7168-11ef-b1e8-a4f933c45288', 3.890000, 0.475578, '2023-10-09 00:00:00', '2023-10-11 00:00:00', 'F5F589B0-71CE-4FEE-AF61-7516F11A90E2', false),
	('5b087e9e-7172-11ef-b1e8-a4f933c45288', 'bf6be2f3-7141-11ef-b1e8-a4f933c45288', '153d4805-7168-11ef-b1e8-a4f933c45288', 3.890000, 49.937578, '2023-10-09 00:00:00', '2023-10-11 00:00:00', 'F5F589B0-71CE-4FEE-AF61-7516F11A90E2', false),
	('5b087f59-7172-11ef-b1e8-a4f933c45288', 'bf6be2f3-7141-11ef-b1e8-a4f933c45288', 'a68d31aa-7141-11ef-b1e8-a4f933c45288', 3.890000, 0.588688, '2023-10-09 00:00:00', '2023-10-11 00:00:00', 'F5F589B0-71CE-4FEE-AF61-7516F11A90E2', false),
	('5b087ffe-7172-11ef-b1e8-a4f933c45288', 'bf6be2f3-7141-11ef-b1e8-a4f933c45288', 'a68d31aa-7141-11ef-b1e8-a4f933c45288', 3.890000, 50.825921, '2023-10-09 00:00:00', '2023-10-11 00:00:00', 'F5F589B0-71CE-4FEE-AF61-7516F11A90E2', false),
	('5b0880a2-7172-11ef-b1e8-a4f933c45288', 'bf6be2f3-7141-11ef-b1e8-a4f933c45288', 'a68d31aa-7141-11ef-b1e8-a4f933c45288', 4.150000, 0.272289, '2024-02-20 00:00:00', '2024-02-22 00:00:00', 'F5F589B0-71CE-4FEE-AF61-7516F11A90E2', false),
	('5b088148-7172-11ef-b1e8-a4f933c45288', 'bf6be2f3-7141-11ef-b1e8-a4f933c45288', 'a68d31aa-7141-11ef-b1e8-a4f933c45288', 4.150000, 32.258064, '2024-02-20 00:00:00', '2024-02-22 00:00:00', 'F5F589B0-71CE-4FEE-AF61-7516F11A90E2', false),
	('5b0881ef-7172-11ef-b1e8-a4f933c45288', 'bf6be2f3-7141-11ef-b1e8-a4f933c45288', 'a68d31aa-7141-11ef-b1e8-a4f933c45288', 4.380000, 2.926940, '2024-04-19 00:00:00', '2024-04-23 00:00:00', 'F5F589B0-71CE-4FEE-AF61-7516F11A90E2', false),
	('5b08829f-7172-11ef-b1e8-a4f933c45288', 'bf6be2f3-7141-11ef-b1e8-a4f933c45288', 'a68d31aa-7141-11ef-b1e8-a4f933c45288', 4.440000, 0.413902, '2024-04-23 00:00:00', '2024-04-25 00:00:00', '8d3196f9-715a-11ef-b1e8-a4f933c45288', false),
	('5b088361-7172-11ef-b1e8-a4f933c45288', 'bf6be2f3-7141-11ef-b1e8-a4f933c45288', 'a68d31aa-7141-11ef-b1e8-a4f933c45288', 4.440000, 88.000000, '2024-04-23 00:00:00', '2024-04-25 00:00:00', '8d3196f9-715a-11ef-b1e8-a4f933c45288', false),
	('5b088419-7172-11ef-b1e8-a4f933c45288', 'bf6be2f3-7141-11ef-b1e8-a4f933c45288', 'a68d31aa-7141-11ef-b1e8-a4f933c45288', 4.630000, 0.023297, '2024-05-28 00:00:00', '2024-05-29 00:00:00', '8d3196f9-715a-11ef-b1e8-a4f933c45288', false),
	('5b08caaf-7172-11ef-b1e8-a4f933c45288', 'bf6be2f3-7141-11ef-b1e8-a4f933c45288', 'a68d31aa-7141-11ef-b1e8-a4f933c45288', 4.630000, 21.574973, '2024-05-28 00:00:00', '2024-05-29 00:00:00', '8d3196f9-715a-11ef-b1e8-a4f933c45288', false),
	('5b08cbfb-7172-11ef-b1e8-a4f933c45288', 'bf6be2f3-7141-11ef-b1e8-a4f933c45288', 'a68d31aa-7141-11ef-b1e8-a4f933c45288', 4.660000, 10.706630, '2024-05-31 00:00:00', '2024-06-03 00:00:00', '8d3196f9-715a-11ef-b1e8-a4f933c45288', false),
	('5b08ccc5-7172-11ef-b1e8-a4f933c45288', 'bf6be2f3-7141-11ef-b1e8-a4f933c45288', 'a68d31aa-7141-11ef-b1e8-a4f933c45288', 4.970000, 34.750503, '2024-05-15 00:00:00', '2024-05-17 00:00:00', 'F5F589B0-71CE-4FEE-AF61-7516F11A90E2', false),
	('5b08ce23-7172-11ef-b1e8-a4f933c45288', 'bf6be2f3-7141-11ef-b1e8-a4f933c45288', 'a68d31aa-7141-11ef-b1e8-a4f933c45288', 5.000000, 1.542000, '2024-01-19 00:00:00', '2024-01-23 00:00:00', 'F5F589B0-71CE-4FEE-AF61-7516F11A90E2', false),
	('5b08cef9-7172-11ef-b1e8-a4f933c45288', 'bf6be2f3-7141-11ef-b1e8-a4f933c45288', 'a68d31aa-7141-11ef-b1e8-a4f933c45288', 5.010000, 33.000000, '2024-08-15 00:00:00', '2024-08-16 00:00:00', 'F5F589B0-71CE-4FEE-AF61-7516F11A90E2', false),
	('5b08cfd9-7172-11ef-b1e8-a4f933c45288', 'bf6be2f3-7141-11ef-b1e8-a4f933c45288', 'a68d31aa-7141-11ef-b1e8-a4f933c45288', 5.010000, 0.033932, '2024-08-15 00:00:00', '2024-08-16 00:00:00', 'F5F589B0-71CE-4FEE-AF61-7516F11A90E2', false),
	('5b08d0c4-7172-11ef-b1e8-a4f933c45288', 'bf6be2f3-7141-11ef-b1e8-a4f933c45288', 'a68d31aa-7141-11ef-b1e8-a4f933c45288', 5.020000, 0.898305, '2024-08-15 00:00:00', '2024-08-16 00:00:00', 'F5F589B0-71CE-4FEE-AF61-7516F11A90E2', false),
	('5b08d183-7172-11ef-b1e8-a4f933c45288', 'bf6be2f3-7141-11ef-b1e8-a4f933c45288', 'a68d31aa-7141-11ef-b1e8-a4f933c45288', 5.180000, 23.925172, '2024-09-12 00:00:00', '2024-09-13 00:00:00', 'F5F589B0-71CE-4FEE-AF61-7516F11A90E2', false),
	('5b08d291-7172-11ef-b1e8-a4f933c45288', 'bf6be2f3-7141-11ef-b1e8-a4f933c45288', '153d4805-7168-11ef-b1e8-a4f933c45288', 5.290000, 2.429111, '2023-11-17 00:00:00', '2023-11-21 00:00:00', 'F5F589B0-71CE-4FEE-AF61-7516F11A90E2', false),
	('5b08d391-7172-11ef-b1e8-a4f933c45288', 'bf6be2f3-7141-11ef-b1e8-a4f933c45288', '153d3b07-7168-11ef-b1e8-a4f933c45288', 5.840000, 50.000000, '2023-10-09 00:00:00', '2023-10-11 00:00:00', 'F5F589B0-71CE-4FEE-AF61-7516F11A90E2', false),
	('5b08d44b-7172-11ef-b1e8-a4f933c45288', 'bf6be2f3-7141-11ef-b1e8-a4f933c45288', '153d4b99-7168-11ef-b1e8-a4f933c45288', 5.870000, 5.000000, '2023-08-04 00:00:00', '2023-08-08 00:00:00', 'F5F589B0-71CE-4FEE-AF61-7516F11A90E2', false),
	('5b08d4fa-7172-11ef-b1e8-a4f933c45288', 'bf6be2f3-7141-11ef-b1e8-a4f933c45288', '153d3b07-7168-11ef-b1e8-a4f933c45288', 5.960000, 22.818791, '2024-02-20 00:00:00', '2024-02-22 00:00:00', 'F5F589B0-71CE-4FEE-AF61-7516F11A90E2', false),
	('5b08d5b5-7172-11ef-b1e8-a4f933c45288', 'bf6be2f3-7141-11ef-b1e8-a4f933c45288', '153d3b07-7168-11ef-b1e8-a4f933c45288', 5.990000, 0.694490, '2024-02-27 00:00:00', '2024-02-29 00:00:00', 'F5F589B0-71CE-4FEE-AF61-7516F11A90E2', false),
	('5b08d65e-7172-11ef-b1e8-a4f933c45288', 'bf6be2f3-7141-11ef-b1e8-a4f933c45288', '153d3b07-7168-11ef-b1e8-a4f933c45288', 6.090000, 0.656814, '2023-11-28 00:00:00', '2023-11-30 00:00:00', 'F5F589B0-71CE-4FEE-AF61-7516F11A90E2', false),
	('5b08d708-7172-11ef-b1e8-a4f933c45288', 'bf6be2f3-7141-11ef-b1e8-a4f933c45288', '153d3b07-7168-11ef-b1e8-a4f933c45288', 6.200000, 0.661290, '2024-01-26 00:00:00', '2024-01-30 00:00:00', 'F5F589B0-71CE-4FEE-AF61-7516F11A90E2', false),
	('5b08d827-7172-11ef-b1e8-a4f933c45288', 'bf6be2f3-7141-11ef-b1e8-a4f933c45288', '153d3b07-7168-11ef-b1e8-a4f933c45288', 6.390000, 0.633802, '2023-12-27 00:00:00', '2023-12-29 00:00:00', 'F5F589B0-71CE-4FEE-AF61-7516F11A90E2', false),
	('5b08d8dc-7172-11ef-b1e8-a4f933c45288', 'bf6be2f3-7141-11ef-b1e8-a4f933c45288', '153d3b07-7168-11ef-b1e8-a4f933c45288', 6.700000, 76.344371, '2024-04-23 00:00:00', '2024-04-25 00:00:00', '8d3196f9-715a-11ef-b1e8-a4f933c45288', false),
	('5b08d996-7172-11ef-b1e8-a4f933c45288', 'bf6be2f3-7141-11ef-b1e8-a4f933c45288', '153d4b99-7168-11ef-b1e8-a4f933c45288', 6.850000, 5.000000, '2024-04-23 00:00:00', '2024-04-25 00:00:00', '8d3196f9-715a-11ef-b1e8-a4f933c45288', false),
	('5b08da65-7172-11ef-b1e8-a4f933c45288', 'bf6be2f3-7141-11ef-b1e8-a4f933c45288', '153d3b07-7168-11ef-b1e8-a4f933c45288', 6.870000, 0.879184, '2024-03-26 00:00:00', '2024-03-28 00:00:00', 'F5F589B0-71CE-4FEE-AF61-7516F11A90E2', false),
	('5b08db52-7172-11ef-b1e8-a4f933c45288', 'bf6be2f3-7141-11ef-b1e8-a4f933c45288', '153d3b07-7168-11ef-b1e8-a4f933c45288', 6.930000, 0.023088, '2024-09-10 00:00:00', '2024-09-11 00:00:00', 'F5F589B0-71CE-4FEE-AF61-7516F11A90E2', false),
	('5b08dc2f-7172-11ef-b1e8-a4f933c45288', 'bf6be2f3-7141-11ef-b1e8-a4f933c45288', '153d3b07-7168-11ef-b1e8-a4f933c45288', 6.930000, 32.705118, '2024-09-10 00:00:00', '2024-09-11 00:00:00', 'F5F589B0-71CE-4FEE-AF61-7516F11A90E2', false),
	('5b08dd02-7172-11ef-b1e8-a4f933c45288', 'bf6be2f3-7141-11ef-b1e8-a4f933c45288', '153d3b07-7168-11ef-b1e8-a4f933c45288', 6.950000, 18.000000, '2024-09-11 00:00:00', '2024-09-12 00:00:00', 'F5F589B0-71CE-4FEE-AF61-7516F11A90E2', false),
	('5b08de37-7172-11ef-b1e8-a4f933c45288', 'bf6be2f3-7141-11ef-b1e8-a4f933c45288', '153d4752-7168-11ef-b1e8-a4f933c45288', 8.210000, 0.466667, '2023-06-14 00:00:00', '2023-06-16 00:00:00', '8d3196f9-715a-11ef-b1e8-a4f933c45288', false),
	('5b08e063-7172-11ef-b1e8-a4f933c45288', 'bf6be2f3-7141-11ef-b1e8-a4f933c45288', '153d3cf3-7168-11ef-b1e8-a4f933c45288', 9.330000, 6.066168, '2023-10-09 00:00:00', '2023-10-11 00:00:00', 'F5F589B0-71CE-4FEE-AF61-7516F11A90E2', false),
	('5b08e183-7172-11ef-b1e8-a4f933c45288', 'bf6be2f3-7141-11ef-b1e8-a4f933c45288', '153d3cf3-7168-11ef-b1e8-a4f933c45288', 9.330000, 0.025723, '2023-10-09 00:00:00', '2023-10-11 00:00:00', 'F5F589B0-71CE-4FEE-AF61-7516F11A90E2', false),
	('5b08e252-7172-11ef-b1e8-a4f933c45288', 'bf6be2f3-7141-11ef-b1e8-a4f933c45288', '153d3cf3-7168-11ef-b1e8-a4f933c45288', 9.720000, 0.051440, '2023-11-01 00:00:00', '2023-11-03 00:00:00', 'F5F589B0-71CE-4FEE-AF61-7516F11A90E2', false),
	('5b08e337-7172-11ef-b1e8-a4f933c45288', 'bf6be2f3-7141-11ef-b1e8-a4f933c45288', '153d3cf3-7168-11ef-b1e8-a4f933c45288', 9.990000, 0.115115, '2024-04-03 00:00:00', '2024-04-05 00:00:00', 'F5F589B0-71CE-4FEE-AF61-7516F11A90E2', false),
	('5b08e428-7172-11ef-b1e8-a4f933c45288', 'bf6be2f3-7141-11ef-b1e8-a4f933c45288', '153d3cf3-7168-11ef-b1e8-a4f933c45288', 10.150000, 0.051231, '2024-03-01 00:00:00', '2024-03-05 00:00:00', 'F5F589B0-71CE-4FEE-AF61-7516F11A90E2', false),
	('5b08e500-7172-11ef-b1e8-a4f933c45288', 'bf6be2f3-7141-11ef-b1e8-a4f933c45288', '153d3cf3-7168-11ef-b1e8-a4f933c45288', 10.180000, 0.050098, '2023-12-01 00:00:00', '2023-12-05 00:00:00', 'F5F589B0-71CE-4FEE-AF61-7516F11A90E2', false),
	('5b08e5b3-7172-11ef-b1e8-a4f933c45288', 'bf6be2f3-7141-11ef-b1e8-a4f933c45288', '153d3cf3-7168-11ef-b1e8-a4f933c45288', 10.200000, 7.647058, '2024-02-20 00:00:00', '2024-02-22 00:00:00', 'F5F589B0-71CE-4FEE-AF61-7516F11A90E2', false),
	('5b08e6bc-7172-11ef-b1e8-a4f933c45288', 'bf6be2f3-7141-11ef-b1e8-a4f933c45288', '153d3cf3-7168-11ef-b1e8-a4f933c45288', 10.460000, 0.048757, '2024-02-01 00:00:00', '2024-02-05 00:00:00', 'F5F589B0-71CE-4FEE-AF61-7516F11A90E2', false),
	('5b08e77c-7172-11ef-b1e8-a4f933c45288', 'bf6be2f3-7141-11ef-b1e8-a4f933c45288', '153d3cf3-7168-11ef-b1e8-a4f933c45288', 10.700000, 0.047663, '2024-01-02 00:00:00', '2024-01-04 00:00:00', 'F5F589B0-71CE-4FEE-AF61-7516F11A90E2', false),
	('5b08e827-7172-11ef-b1e8-a4f933c45288', 'bf6be2f3-7141-11ef-b1e8-a4f933c45288', '153d4fe6-7168-11ef-b1e8-a4f933c45288', 11.220000, 1.250000, '2023-07-12 00:00:00', '2023-07-14 00:00:00', '8d3196f9-715a-11ef-b1e8-a4f933c45288', false),
	('5b08ed9f-7172-11ef-b1e8-a4f933c45288', 'bf6be2f3-7141-11ef-b1e8-a4f933c45288', '153d4589-7168-11ef-b1e8-a4f933c45288', 14.350000, 1.000000, '2023-05-30 00:00:00', '2023-06-01 00:00:00', '8d3196f9-715a-11ef-b1e8-a4f933c45288', false),
	('5b08eefa-7172-11ef-b1e8-a4f933c45288', 'bf6be2f3-7141-11ef-b1e8-a4f933c45288', '153d3cf3-7168-11ef-b1e8-a4f933c45288', 21.270000, 7.051627, '2024-04-23 00:00:00', '2024-04-25 00:00:00', '8d3196f9-715a-11ef-b1e8-a4f933c45288', false),
	('5b08efc8-7172-11ef-b1e8-a4f933c45288', 'bf6be2f3-7141-11ef-b1e8-a4f933c45288', '153d3cf3-7168-11ef-b1e8-a4f933c45288', 21.580000, 0.053753, '2024-05-01 00:00:00', '2024-05-03 00:00:00', 'F5F589B0-71CE-4FEE-AF61-7516F11A90E2', false),
	('5b08f0b7-7172-11ef-b1e8-a4f933c45288', 'bf6be2f3-7141-11ef-b1e8-a4f933c45288', '153d3cf3-7168-11ef-b1e8-a4f933c45288', 22.430000, 0.000445, '2024-06-03 00:00:00', '2024-06-04 00:00:00', 'F5F589B0-71CE-4FEE-AF61-7516F11A90E2', false),
	('5b08f1ab-7172-11ef-b1e8-a4f933c45288', 'bf6be2f3-7141-11ef-b1e8-a4f933c45288', '153d3cf3-7168-11ef-b1e8-a4f933c45288', 22.900000, 0.000436, '2024-09-03 00:00:00', '2024-09-04 00:00:00', 'F5F589B0-71CE-4FEE-AF61-7516F11A90E2', false),
	('5b08f285-7172-11ef-b1e8-a4f933c45288', 'bf6be2f3-7141-11ef-b1e8-a4f933c45288', '153d3cf3-7168-11ef-b1e8-a4f933c45288', 23.320000, 0.000428, '2024-07-01 00:00:00', '2024-07-02 00:00:00', 'F5F589B0-71CE-4FEE-AF61-7516F11A90E2', false),
	('5b094cd4-7172-11ef-b1e8-a4f933c45288', 'bf6be2f3-7141-11ef-b1e8-a4f933c45288', '153d3cf3-7168-11ef-b1e8-a4f933c45288', 23.870000, 0.000418, '2024-08-01 00:00:00', '2024-08-02 00:00:00', 'F5F589B0-71CE-4FEE-AF61-7516F11A90E2', false);