drop procedure if exists delete_transaction;

delimiter $$

create procedure delete_transaction (id varchar (36)) begin

	update transactions set deleted = true where transactions.id = id;

end $$

delimiter ;