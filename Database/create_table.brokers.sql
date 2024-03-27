create table brokers (
	id uniqueidentifier not null,
	name varchar (128),

	constraint PK_brokers primary key (id)
);