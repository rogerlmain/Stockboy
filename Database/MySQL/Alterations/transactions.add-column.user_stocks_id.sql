update transactions set user_stocks_id = null;

alter table transactions drop constraint fk_transactions_to_user_stocks;
alter table transactions drop constraint fk_transactions_to_brokers;
alter table transactions drop constraint fk_transactions_to_tickers;
alter table transactions drop column user_stocks_id;

alter table transactions add column user_stocks_id varchar (36) after id;

update transactions as tra set user_stocks_id = (select id from user_stocks where 
	(user_stocks.broker_id = tra.broker_id) and
    (user_stocks.ticker_id = tra.ticker_id)
);

alter table transactions add constraint fk_transactions_to_user_stocks foreign key (user_stocks_id) references user_stocks (id);

alter table transactions 
	drop column broker_id,
    drop column ticker_id;

select * from transactions;
