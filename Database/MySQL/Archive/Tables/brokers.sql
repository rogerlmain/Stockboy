drop table if exists brokers;

create table brokers (
	id varchar (36) unique primary key not null,
	name varchar (128)
);

insert into brokers values
	("82d57b96-8722-11ef-b413-6c02e0d344c7", "Fidelity"),
    ("bf6be2f3-7141-11ef-b1e8-a4f933c45288", "Robinhood");
    
select * from brokers;