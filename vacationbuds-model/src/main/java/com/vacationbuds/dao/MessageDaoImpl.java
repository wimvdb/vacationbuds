package com.vacationbuds.dao;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.springframework.transaction.annotation.Transactional;

import com.vacationbuds.model.Message;

@Transactional
public class MessageDaoImpl implements MessageDao {

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

	public void deleteInboxMessage(Message message) {

		Query deleteAdQuery = entityManager
				.createQuery("DELETE FROM Message m  where id =:messageId and recipient.id=:recipientId");
		deleteAdQuery.setParameter("messageId", message.getId());
		deleteAdQuery.setParameter("recipientId", message.getRecipient()
				.getId());
		deleteAdQuery.executeUpdate();

	}

	public void deleteOutboxMessage(Message message) {

		Query deleteAdQuery = entityManager
				.createQuery("DELETE FROM Message m  where id =:messageId and sender.id=:senderId");
		deleteAdQuery.setParameter("messageId", message.getId());
		deleteAdQuery.setParameter("senderId", message.getSender().getId());
		deleteAdQuery.executeUpdate();

	}

	public List<Message> getInboxMessagesByUserId(long id) {
		return entityManager
				.createQuery(
						"select m from Message m where m.recipient.id =:id")
				.setParameter("id", id).getResultList();

	}

	public List<Message> getOutboxMessagesByUserId(long id) {
		return entityManager
				.createQuery("select m from Message m where m.sender.id =:id")
				.setParameter("id", id).getResultList();
	}

}
