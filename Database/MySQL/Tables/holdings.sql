create table holdings (
	id varchar (36) primary key not null,
    user_id varchar (36) not null,
    broker_id varchar (36) not null,
    ticker_id varchar (36) not null,
    quantity int,
    cost decimal (14, 6),
    
    constraint fk_holdings_to_users foreign key (user_id) references users (id),
    constraint fk_holdings_to_brokers foreign key (broker_id) references brokers (id),
    constraint fk_holdings_to_tickers foreign key (ticker_id) references tickers (id)
);

select * from holdings;