drop table if exists splits;

create table splits (
	id varchar (36) unique primary key not null,
    broker_id varchar (36) not null,
    ticker_id varchar (36) not null,
    previous decimal (6, 2) not null,
    current decimal (6, 2) not null,
    split_date date not null,
    deleted boolean not null default false
);

insert into splits values
	('31cdc955-714a-11ef-b1e8-a4f933c45288', 'bf6be2f3-7141-11ef-b1e8-a4f933c45288', 'a68d31aa-7141-11ef-b1e8-a4f933c45288', '2.000000', '1.000000', '2023-12-01 00:00:00', false),
	('cf35fe75-714a-11ef-b1e8-a4f933c45288', 'bf6be2f3-7141-11ef-b1e8-a4f933c45288', 'a68d31aa-7141-11ef-b1e8-a4f933c45288', '3.000000', '2.000000', '2024-01-31 00:00:00', false);