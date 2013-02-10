package com.vacationbuds.dao;

import java.util.List;

import com.vacationbuds.model.Message;

public interface MessageDao {

	long saveOrUpdate(Message message);

	Message getMessageById(Long id);
	
	boolean delete(Message message);
	
	List<Message> getInboxMessagesByUserId(long id);
	
	List<Message> getOutboxMessagesByUserId(long id);
	
}
