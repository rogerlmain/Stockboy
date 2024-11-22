create table users (
	id varchar (36) primary key not null,
    last_updated datetime
);

insert into users values (uuid(), null);

select * from users;