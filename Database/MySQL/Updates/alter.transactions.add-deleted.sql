alter table transactions add column deleted boolean not null default false;
select * from transactions;