alter table users add column administrator boolean not null default false;
select * from users;