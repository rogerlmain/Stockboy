drop table if exists user_tickers;
drop table if exists user_stocks;

create table user_stocks (
	id varchar (36) primary key not null,
    user_id varchar (36) not null,
    broker_id varchar (36) not null,
    ticker_id varchar (36) not null,
    deleted boolean default false,
    
    constraint fk_user_stocks_to_users foreign key (user_id) references users (id),
    constraint fk_user_stocks_to_brokers foreign key (broker_id) references brokers (id),
    constraint fk_user_stocks_to_tickers foreign key (ticker_id) references tickers (id)
);

insert into user_stocks select
	uuid (),
	usr.id as user_id,
    tra.broker_id,
    tra.ticker_id,
    false
from
	users as usr
join (
	select distinct
		usr.id as user_id,
		tra.broker_id,
		tra.ticker_id
	from
		users as usr
	join
		transactions as tra
) as tra;
    
select * from user_stocks;