drop table if exists new_tickers;
drop table if exists tickers;

create table new_tickers (
	id varchar (36) unique primary key not null,
	symbol varchar (8) unique,
	name varchar (128),
	price decimal (14,6),
	volume int,
	dividend_date date,
	dividend_frequency int,
	last_updated datetime 
);

insert into new_tickers values
	('153d3e18-7168-11ef-b1e8-a4f933c45288', 'JEWL', 'Adamas One Corp', null, null, null, null, null),
	('153d1cbf-7168-11ef-b1e8-a4f933c45288', 'ADTH', 'Adtheorent', null, null, null, null, null),
	('153d3272-7168-11ef-b1e8-a4f933c45288', 'ALLR', 'Allarity Therapeutics', null, null, null, null, null),
	('153d34df-7168-11ef-b1e8-a4f933c45288', 'ALPSQ', 'Alpine Summit Energy Partners', null, null, null, null, null),
	('153d35c6-7168-11ef-b1e8-a4f933c45288', 'ASTI', 'Ascent Solar Technologies', null, null, null, null, null),
	('153d3745-7168-11ef-b1e8-a4f933c45288', 'BHIL', 'Benson Hill', null, null, null, null, null),
	('a68d31aa-7141-11ef-b1e8-a4f933c45288', 'BDN', 'Brandywine Realty Trust', null, null, null, null, null),
	('153d37fc-7168-11ef-b1e8-a4f933c45288', 'CEIN', 'Camber Energy Inc', null, null, null, null, null),
	('153d38bb-7168-11ef-b1e8-a4f933c45288', 'CELU', 'Celularity', null, null, null, null, null),
	('153d398e-7168-11ef-b1e8-a4f933c45288', 'CENN', 'Cenntro Electric Group Limited', null, null, null, null, null),
	('153d3a59-7168-11ef-b1e8-a4f933c45288', 'CIOXY', 'Cielo', null, null, null, null, null),
	('153d3ba4-7168-11ef-b1e8-a4f933c45288', 'EFTR', 'Effector Therapeutics', null, null, null, null, null),
	('153d3b07-7168-11ef-b1e8-a4f933c45288', 'EARN', 'Ellington Credit Company', null, null, null, null, null),
	('153d3c55-7168-11ef-b1e8-a4f933c45288', 'FLJ', 'Flj Group', null, null, null, null, null),
	('153d3cf3-7168-11ef-b1e8-a4f933c45288', 'GLAD', 'Gladstone Capital', null, null, null, null, null),
	('153d3d87-7168-11ef-b1e8-a4f933c45288', 'ICMB', 'Investcorp Credit Management Bdc', null, null, null, null, null),
	('153d3eb2-7168-11ef-b1e8-a4f933c45288', 'JOANQ', 'Joann Inc', null, null, null, null, null),
	('153d405a-7168-11ef-b1e8-a4f933c45288', 'LGSXY', 'Light S.A.', null, null, null, null, null),
	('153d44ac-7168-11ef-b1e8-a4f933c45288', 'LIZI', 'Lizhi', null, null, null, null, null),
	('153d4589-7168-11ef-b1e8-a4f933c45288', 'M', 'Macys', null, null, null, null, null),
	('153d4626-7168-11ef-b1e8-a4f933c45288', 'NCMI', 'National Cinemedia', null, null, null, null, null),
	('153d46b6-7168-11ef-b1e8-a4f933c45288', 'NDVLY', 'New World Development Co., Ltd.', null, null, null, null, null),
	('153d4752-7168-11ef-b1e8-a4f933c45288', 'OPAD', 'Offerpad Solutions', null, null, null, null, null),
	('153d4805-7168-11ef-b1e8-a4f933c45288', 'OPI', 'Office Properties Income Trust Common Shares Of Beneficial Interest', null, null, null, null, null),
	('153d4ae0-7168-11ef-b1e8-a4f933c45288', 'OXSQ', 'Oxford Square Capital', null, null, null, null, null),
	('153d4b99-7168-11ef-b1e8-a4f933c45288', 'PCFBY', 'Pacific Basin Shipping Ltd.', null, null, null, null, null),
	('153d5114-7168-11ef-b1e8-a4f933c45288', 'SQFT', 'Presidio Property Trust', null, null, null, null, null),
	('153d4f53-7168-11ef-b1e8-a4f933c45288', 'RGTI', 'Rigetti Computing', null, null, null, null, null),
	('153d4fe6-7168-11ef-b1e8-a4f933c45288', 'SKLZ', 'Skillz', null, null, null, null, null),
	('153d507e-7168-11ef-b1e8-a4f933c45288', 'SOGP', 'Sound Group Inc.', null, null, null, null, null),
	('153d51bf-7168-11ef-b1e8-a4f933c45288', 'USEG', 'U.S. Energy', null, null, null, null, null);