create table transaction_types (
	id varchar (36) unique primary key not null,
    description varchar (12)
);

insert into transaction_types values
	('D6BC19B8-4BDE-4D87-9DB3-BAC3C41476B0', 'Reinvestment'),
	('F5F589B0-71CE-4FEE-AF61-7516F11A90E2', 'Buy'),
    ('8d3196f9-715a-11ef-b1e8-a4f933c45288', 'Sell'),
    ('8d3197e0-715a-11ef-b1e8-a4f933c45288', 'Split'),
    ('ba6fd2cb-7163-11ef-b1e8-a4f933c45288', 'Lending');
    
select * from transaction_types;