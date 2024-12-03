drop table if exists user_tickers;

create table user_tickers (
	id varchar (36) primary key not null,
    user_id varchar (36) not null,
    ticker_id varchar (36) not null,
    deleted boolean default false,
    
    constraint fk_user_tickers_to_users foreign key (user_id) references users (id),
    constraint fk_user_tickers_to_tickers foreign key (ticker_id) references tickers (id)
);

select * from user_tickers;
