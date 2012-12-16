package com.vacationbuds.dao;

import java.util.List;

import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate3.HibernateTemplate;
import org.springframework.transaction.annotation.Transactional;

import com.vacationbuds.model.Ad;
import com.vacationbuds.model.Image;

@Transactional
public class ImageDaoImpl extends HibernateTemplate implements ImageDao {

	@Autowired
	private SessionFactory sessionFactory;

	public Image getImageById(Long id) {

		try {
			List<Image> images = sessionFactory.getCurrentSession()
					.createCriteria(Image.class).add(Restrictions.idEq(id))
					.list();
			if (images.size() > 0) {
				return images.get(0);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;

	}

	public boolean saveOrUpdate(Image image) {
		try {
			sessionFactory.getCurrentSession().saveOrUpdate(image);
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}

	

}
