drop table if exists purchases;

create table purchases (
	id uniqueidentifier not null,
	ticker_id uniqueidentifier not null,
	broker_id uniqueidentifier not null,
	purchase_price decimal(7,2) not null,
	purchase_date datetime not null,
	settlement_date datetime not null,
	quantity decimal(14,6) not null,
	purchase_type_id uniqueidentifier not null,

	constraint PK_purchases primary key (id),
	constraint FK_purchases_to_tickers foreign key (ticker_id) references tickers (id),
	constraint FK_purchases_to_brokers foreign key (broker_id) references brokers (id),
	constraint FK_purchases_to_purchase_types foreign key (purchase_type_id) references purchase_types (id)
);

insert into purchases values 
	('25D304BC-FC56-4D68-8226-0F2E1870D438', 'F731CB69-3049-41CD-9B2D-E66C98392E0C', 'B726305A-FC54-44F4-9809-F1E615B27ACD', '10.15', '2024-02-29 00:00:00.000', '2024-03-01 08:31:00.000', '0.05123100', 'D6BC19B8-4BDE-4D87-9DB3-BAC3C41476B0'),
	('A00EDB36-7118-4335-9940-4ADAEA793F3B', 'F731CB69-3049-41CD-9B2D-E66C98392E0C', 'B726305A-FC54-44F4-9809-F1E615B27ACD', '9.33', '2023-10-08 00:00:00.000', '2023-10-09 07:30:00.000', '6.09189100', 'F5F589B0-71CE-4FEE-AF61-7516F11A90E2'),
	('752C6D76-413D-45E3-9BFA-5820D48A88AE', 'F731CB69-3049-41CD-9B2D-E66C98392E0C', 'B726305A-FC54-44F4-9809-F1E615B27ACD', '10.20', '2024-02-18 00:00:00.000', '2024-02-20 07:30:00.000', '7.64705800', 'F5F589B0-71CE-4FEE-AF61-7516F11A90E2'),
	('59B73920-C496-4B2B-8F1F-6E49CD0DCBCE', 'F731CB69-3049-41CD-9B2D-E66C98392E0C', 'B726305A-FC54-44F4-9809-F1E615B27ACD', '10.70', '2023-12-29 00:00:00.000', '2024-01-02 08:31:00.000', '0.04766300', 'D6BC19B8-4BDE-4D87-9DB3-BAC3C41476B0'),
	('7B352D1A-4C0D-4EEA-935D-71B3EE149FEE', 'F731CB69-3049-41CD-9B2D-E66C98392E0C', 'B726305A-FC54-44F4-9809-F1E615B27ACD', '10.46', '2024-01-31 00:00:00.000', '2024-02-01 08:30:00.000', '0.04875800', 'D6BC19B8-4BDE-4D87-9DB3-BAC3C41476B0'),
	('107D1540-E8DF-4726-A922-945D5B7B6007', '8A6C7BAA-8BC2-4B10-9FAC-284DC64C78F7', 'B726305A-FC54-44F4-9809-F1E615B27ACD', '5.00', '2023-01-18 00:00:00.000', '2023-01-19 08:30:00.000', '1.54200000', 'F5F589B0-71CE-4FEE-AF61-7516F11A90E2'),
	('1251FB95-5853-423B-8E4B-9C33D5E7E8D9', 'F731CB69-3049-41CD-9B2D-E66C98392E0C', 'B726305A-FC54-44F4-9809-F1E615B27ACD', '9.72', '2023-10-31 00:00:00.000', '2023-11-01 08:32:00.000', '0.05144000', 'D6BC19B8-4BDE-4D87-9DB3-BAC3C41476B0'),
	('B5531A2E-3FA2-4ED3-A00A-A25AF4D38B0D', '8A6C7BAA-8BC2-4B10-9FAC-284DC64C78F7', 'B726305A-FC54-44F4-9809-F1E615B27ACD', '4.15', '2024-02-18 00:00:00.000', '2024-02-20 07:30:00.000', '32.53035300', 'F5F589B0-71CE-4FEE-AF61-7516F11A90E2'),
	('EE51B612-AA1A-46E7-90D1-A56DB67783E1', 'F731CB69-3049-41CD-9B2D-E66C98392E0C', 'B726305A-FC54-44F4-9809-F1E615B27ACD', '10.18', '2023-11-30 00:00:00.000', '2023-12-01 08:31:00.000', '0.05009800', 'D6BC19B8-4BDE-4D87-9DB3-BAC3C41476B0'),
	('7D14D8CC-6DCE-42D6-AD72-BC9110F7E2FA', '8A6C7BAA-8BC2-4B10-9FAC-284DC64C78F7', 'B726305A-FC54-44F4-9809-F1E615B27ACD', '3.89', '2023-10-08 00:00:00.000', '2023-10-09 07:30:00.000', '51.41460900', 'F5F589B0-71CE-4FEE-AF61-7516F11A90E2');

select * from purchases;