package com.vacationbuds.dao;

import java.util.List;

import com.vacationbuds.model.Message;

public interface MessageDao {

	long saveOrUpdate(Message message);

	Message getMessageById(Long id);
	
	void deleteInboxMessage(Message message);
	void deleteOutboxMessage(Message message);
	
	List<Message> getInboxMessagesByUserId(long id);
	
	List<Message> getOutboxMessagesByUserId(long id);
	
}
