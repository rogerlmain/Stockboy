drop table if exists splits;

create table splits (
	id varchar (36) unique primary key not null,
    user_id varchar (36) not null,
    broker_id varchar (36) not null,
    ticker_id varchar (36) not null,
    previous decimal (6, 2) not null,
    current decimal (6, 2) not null,
    split_date date not null,
    deleted boolean not null default false,
    
    constraint fk_splits_to_users foreign key (user_id) references users (id),
    constraint fk_splits_to_brokers foreign key (broker_id) references brokers (id),
    constraint fk_splits_to_tickers foreign key (ticker_id) references tickers (id)
);

insert into splits values
	('230244d3-e769-4a61-a0de-e93d6208de00','071e5e85-aa78-11ef-9b55-dc454691e924', '80e43ec8-016a-453d-b4ff-80d9d79a2bc7','4676d995-5c5b-4bd9-b1b7-26532e391c42',2.00,1.00,'2024-04-04',0),
    ('f1bb2ebf-29f5-4c6c-baf7-7e4aa6168060','071e5e85-aa78-11ef-9b55-dc454691e924', '80e43ec8-016a-453d-b4ff-80d9d79a2bc7','9c534e96-b549-4bda-a970-a67ad27a5db8',25.00,1.00,'2024-01-11',0);
    