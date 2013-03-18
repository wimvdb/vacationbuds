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
		entityManager
				.createQuery(
						"Update Message m set m.inboxRemoved = true where m.id =:messageId ")
				.setParameter("messageId", message.getId()).executeUpdate();

	}

	public void deleteOutboxMessage(Message message) {
		entityManager
				.createQuery(
						"Update Message m set m.outboxRemoved = true where m.id =:messageId ")
				.setParameter("messageId", message.getId()).executeUpdate();

	}

	public List<Message> getInboxMessagesByUserId(long id) {
		return entityManager
				.createQuery(
						"select new Message(m.id, m.title,m.text,m.sendDate,m.recipient.username,m.recipient.id,m.sender.username,m.sender.id) from Message m where m.recipient.id =:id and m.inboxRemoved = false")
				.setParameter("id", id).getResultList();

	}

	public List<Message> getOutboxMessagesByUserId(long id) {
		return entityManager
				.createQuery(
						"select new Message(m.id, m.title,m.text,m.sendDate,m.recipient.username,m.recipient.id,m.sender.username,m.sender.id) from Message m where m.sender.id =:id  and  m.outboxRemoved = false")
				.setParameter("id", id).getResultList();
	}

}
