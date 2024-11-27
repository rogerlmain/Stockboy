drop table if exists users;

create table users (
	id varchar (36) primary key not null,
    username varchar (32) not null,
    password varchar (128) not null
);

select * from users;