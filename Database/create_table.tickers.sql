create table tickers (
	id uniqueidentifier not null,
	symbol varchar (8) unique,
	name varchar (128),

	constraint PK_tickers primary key (id),
	constraint UQ_symbol unique (symbol)
);