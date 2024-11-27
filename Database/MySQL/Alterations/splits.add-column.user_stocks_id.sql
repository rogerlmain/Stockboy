update splits set user_stocks_id = null;

alter table splits drop constraint fk_splits_to_user_stocks;
alter table splits drop column user_stocks_id;

alter table splits add column user_stocks_id varchar (36) after id;

update splits as spl set user_stocks_id = (select id from user_stocks where 
	(user_stocks.broker_id = spl.broker_id) and
    (user_stocks.ticker_id = spl.ticker_id)
);

alter table splits add constraint fk_splits_to_user_stocks foreign key (user_stocks_id) references user_stocks (id);

alter table splits
	drop column broker_id,
    drop column ticker_id;

select * from splits;
