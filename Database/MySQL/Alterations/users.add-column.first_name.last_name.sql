alter table users 
	add column first_name varchar (20) after password, 
    add column last_name varchar (20) after first_name;
    
select * from users