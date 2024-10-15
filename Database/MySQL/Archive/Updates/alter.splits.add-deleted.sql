alter table splits add column deleted boolean not null default false;
select * from splits;