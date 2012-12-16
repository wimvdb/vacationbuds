package com.vacationbuds.dao;

import java.util.List;

import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate3.HibernateTemplate;
import org.springframework.transaction.annotation.Transactional;

import com.vacationbuds.model.Ad;
import com.vacationbuds.model.User;

@Transactional
public class AdDaoImpl extends HibernateTemplate implements AdDao {

	@Autowired
	private SessionFactory sessionFactory;

	public Ad getAdById(Long id) {

		try {
			List<Ad> ads = sessionFactory.getCurrentSession()
					.createCriteria(Ad.class).add(Restrictions.idEq(id))
					.list();
			if (ads.size() > 0) {
				return ads.get(0);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;

	}

	public boolean saveOrUpdate(Ad ad) {
		try {
			sessionFactory.getCurrentSession().saveOrUpdate(ad);
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}

	public List<Ad> getAdsByUserId(Long id) {
		return sessionFactory.getCurrentSession()
				.createCriteria(Ad.class,"ad")
				.add(Restrictions.eq("ad.profile.user.id", id)).list();
	}

	

}
