alter table users rename column username to email_address;
update users set email_address = 'rex@rogerlmain.com';
select * from users;