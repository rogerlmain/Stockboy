drop table if exists purchase_types;

create table purchase_types (
	id uniqueidentifier not null,
	description varchar(12) not null,

	constraint PK_purchase_types primary key (id)
);

insert into purchase_types values
	('F5F589B0-71CE-4FEE-AF61-7516F11A90E2', 'purchase'),
	('D6BC19B8-4BDE-4D87-9DB3-BAC3C41476B0', 'reinvestment');

select * from purchase_types;