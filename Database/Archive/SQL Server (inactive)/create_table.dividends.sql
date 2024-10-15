drop table if exists dividends;

create table dividends (
	id uniqueidentifier not null,
	broker_id uniqueidentifier not null,
	ticker_id uniqueidentifier not null,
	issue_date date not null,
	amount_per_share decimal(14,6) not null,

	constraint PK_dividends primary key (id),
	constraint FK_dividends_to_brokers foreign key (broker_id) references brokers (id),
	constraint FK_dividends_to_tickers foreign key (ticker_id) references tickers (id)
)

insert into dividends values
	(newid (), 'B726305A-FC54-44F4-9809-F1E615B27ACD', (select id from tickers where symbol = 'BDN'), '2024-1-18', 0.15),
	(newid (), 'B726305A-FC54-44F4-9809-F1E615B27ACD', (select id from tickers where symbol = 'EARN'), '2023-11-27', 0.08),
	(newid (), 'B726305A-FC54-44F4-9809-F1E615B27ACD', (select id from tickers where symbol = 'EARN'), '2023-12-26', 0.08),
	(newid (), 'B726305A-FC54-44F4-9809-F1E615B27ACD', (select id from tickers where symbol = 'EARN'), '2024-1-25', 0.08),
	(newid (), 'B726305A-FC54-44F4-9809-F1E615B27ACD', (select id from tickers where symbol = 'EARN'), '2024-2-26', 0.08),
	(newid (), 'B726305A-FC54-44F4-9809-F1E615B27ACD', (select id from tickers where symbol = 'EARN'), '2024-3-25', 0.08),
	(newid (), 'B726305A-FC54-44F4-9809-F1E615B27ACD', (select id from tickers where symbol = 'GLAD'), '2023-10-31', 0.0825),
	(newid (), 'B726305A-FC54-44F4-9809-F1E615B27ACD', (select id from tickers where symbol = 'GLAD'), '2023-11-30', 0.0825),
	(newid (), 'B726305A-FC54-44F4-9809-F1E615B27ACD', (select id from tickers where symbol = 'GLAD'), '2023-12-29', 0.0825),
	(newid (), 'B726305A-FC54-44F4-9809-F1E615B27ACD', (select id from tickers where symbol = 'GLAD'), '2024-1-31', 0.0825),
	(newid (), 'B726305A-FC54-44F4-9809-F1E615B27ACD', (select id from tickers where symbol = 'GLAD'), '2024-2-29', 0.0825),
	(newid (), 'B726305A-FC54-44F4-9809-F1E615B27ACD', (select id from tickers where symbol = 'ICMB'), '2024-1-8', 0.03),
	(newid (), 'B726305A-FC54-44F4-9809-F1E615B27ACD', (select id from tickers where symbol = 'ICMB'), '2024-1-8', 0.12),
	(newid (), 'B726305A-FC54-44F4-9809-F1E615B27ACD', (select id from tickers where symbol = 'M'), '2021-10-1', 0.15),
	(newid (), 'B726305A-FC54-44F4-9809-F1E615B27ACD', (select id from tickers where symbol = 'M'), '2022-1-3', 0.15),
	(newid (), 'B726305A-FC54-44F4-9809-F1E615B27ACD', (select id from tickers where symbol = 'M'), '2022-4-1', 0.1575),
	(newid (), 'B726305A-FC54-44F4-9809-F1E615B27ACD', (select id from tickers where symbol = 'M'), '2022-7-1', 0.1575),
	(newid (), 'B726305A-FC54-44F4-9809-F1E615B27ACD', (select id from tickers where symbol = 'M'), '2022-10-3', 0.1575),
	(newid (), 'B726305A-FC54-44F4-9809-F1E615B27ACD', (select id from tickers where symbol = 'M'), '2023-1-3', 0.1575),
	(newid (), 'B726305A-FC54-44F4-9809-F1E615B27ACD', (select id from tickers where symbol = 'M'), '2023-4-3', 0.1654),
	(newid (), 'B726305A-FC54-44F4-9809-F1E615B27ACD', (select id from tickers where symbol = 'OPI'), '2023-11-16', 0.25),
	(newid (), 'B726305A-FC54-44F4-9809-F1E615B27ACD', (select id from tickers where symbol = 'OPI'), '2024-2-15', 0.01),
	(newid (), 'B726305A-FC54-44F4-9809-F1E615B27ACD', (select id from tickers where symbol = 'PCFBY'), '2023-9-11', 0.165398),
	(newid (), 'B726305A-FC54-44F4-9809-F1E615B27ACD', (select id from tickers where symbol = 'SQFT'), '2023-6-30', 0.023);
