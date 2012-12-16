package com.vacationbuds.dao;

import java.util.List;

import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate3.HibernateTemplate;
import org.springframework.transaction.annotation.Transactional;

import com.vacationbuds.model.Message;
import com.vacationbuds.model.Profile;

@Transactional
public class ProfileDaoImpl extends HibernateTemplate implements ProfileDao {

	@Autowired
	private SessionFactory sessionFactory;

	public Profile getProfileById(Long id) {

		try {
			List<Profile> profiles = sessionFactory.getCurrentSession()
					.createCriteria(Profile.class).add(Restrictions.idEq(id))
					.list();
			if (profiles.size() > 0) {
				return profiles.get(0);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;

	}

	public boolean saveOrUpdate(Profile profile) {
		try {
			sessionFactory.getCurrentSession().saveOrUpdate(profile);
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}


}
