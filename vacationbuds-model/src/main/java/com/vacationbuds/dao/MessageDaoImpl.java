package com.vacationbuds.dao;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.transaction.annotation.Transactional;

import com.vacationbuds.model.Message;

@Transactional
public class MessageDaoImpl  implements MessageDao {


	
	
	@PersistenceContext
	private EntityManager entityManager;
	
	public Message getMessageById(Long id) {

		return entityManager.find(Message.class, id);
	}

	public long saveOrUpdate(Message message) {
		if (message.getId() == null) {
			entityManager.persist(message);
			return message.getId();
		} else {
			return entityManager.merge(message).getId();
		}
	}

	public boolean delete(Message message) {
		try {
			entityManager.remove(message);
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}

	public List<Message> getInboxMessagesByUserId(long id) {
		return entityManager.createQuery("select m from Message m where m.recipiant.id =:id").setParameter("id", id).getResultList();

	}

	public List<Message> getOutboxMessagesByUserId(long id) {
		return entityManager.createQuery("select m from Message m where m.sender.id =:id").setParameter("id", id).getResultList();
	}
	


}
