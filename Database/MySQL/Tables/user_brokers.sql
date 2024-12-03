drop table user_brokers;

create table user_brokers (
	id varchar (36) primary key not null,
    user_id varchar (36) not null,
    broker_id varchar (36) not null,
    deleted boolean default false,
    
    constraint fk_user_brokers_to_users foreign key (user_id) references users (id),
    constraint fk_user_brokers_to_brokers foreign key (broker_id) references brokers (id)
);

select * from user_brokers;
