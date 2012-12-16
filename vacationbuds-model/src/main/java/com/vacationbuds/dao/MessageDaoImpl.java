package com.vacationbuds.dao;

import java.util.List;

import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate3.HibernateTemplate;
import org.springframework.transaction.annotation.Transactional;

import com.vacationbuds.model.Image;
import com.vacationbuds.model.Message;

@Transactional
public class MessageDaoImpl extends HibernateTemplate implements MessageDao {

	@Autowired
	private SessionFactory sessionFactory;

	public Message getMessageById(Long id) {

		try {
			List<Message> messages = sessionFactory.getCurrentSession()
					.createCriteria(Message.class).add(Restrictions.idEq(id))
					.list();
			if (messages.size() > 0) {
				return messages.get(0);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	public boolean saveOrUpdate(Message message) {
		try {
			sessionFactory.getCurrentSession().saveOrUpdate(message);
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}

	public boolean delete(Message message) {
		try {
			sessionFactory.getCurrentSession().delete(message);
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}

	public List<Message> getInboxMessagesByUserId(long id) {
		return  (List<Message>)  sessionFactory.getCurrentSession()
				.createCriteria(Message.class,"message")
				.add(Restrictions.eq("message.recipiant.id",id)).list();
	}

	public List<Message> getOutboxMessagesByUserId(long id) {
		return  (List<Message>)  sessionFactory.getCurrentSession()
				.createCriteria(Message.class,"message")
				.add(Restrictions.eq("message.sender.id",id)).list();
	}
	
	


}
