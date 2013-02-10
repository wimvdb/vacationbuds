package com.vacationbuds.dao;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.transaction.annotation.Transactional;

import com.vacationbuds.model.Ad;

@Transactional
public class AdDaoImpl  implements AdDao {

	

	@PersistenceContext
	private EntityManager entityManager;

	public Ad getAdById(Long id) {
		return entityManager.find(Ad.class, id);

	}

	public long saveOrUpdate(Ad ad) {
		if (ad.getId() == null) {
			entityManager.persist(ad);
			return ad.getId();
		} else {
			return entityManager.merge(ad).getId();
		}
		
	}

	public List<Ad> getAdsByUserId(Long id) {
		return entityManager
				.createQuery("select a from Ad a where a.user.id =:id and a.active=true")
				.setParameter("id", id).getResultList();
	}

}
