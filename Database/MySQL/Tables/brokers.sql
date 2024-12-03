drop table if exists brokers;

create table brokers (
	id varchar (36) unique primary key not null,
	name varchar (128),
    approved boolean not null default false,
    deleted boolean not null default false
);

insert into brokers values
	('80e43ec8-016a-453d-b4ff-80d9d79a2bc7','Robinhood', true, false),
    ('87dd6b50-bf1e-4b1f-b48d-6b6e165acf2e','Fidelity', true, false);
    
select * from brokers;