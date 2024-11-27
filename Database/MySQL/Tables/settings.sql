drop table if exists settings;

create table settings (
	id varchar (36) primary key not null,
    user_id varchar (36),
    name varchar (32) not null,
    value varchar (32) not null,
    
    constraint fk_settings_to_users foreign key (user_id) references users (id)
);