create table tickers (
	id varchar (36) unique primary key not null,
	symbol varchar (8) unique,
	name varchar (128)
);