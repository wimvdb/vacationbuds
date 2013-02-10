package com.vacationbuds.dao;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.springframework.orm.hibernate3.HibernateTemplate;
import org.springframework.transaction.annotation.Transactional;

import com.vacationbuds.model.Image;

@Transactional
public class ImageDaoImpl  implements ImageDao {

	
	
	@PersistenceContext
	private EntityManager entityManager;

	public Image getImageById(Long id) {

		return entityManager.find(Image.class, id);

	}

	public long saveOrUpdate(Image image) {
		if (image.getId() == null) {
			entityManager.persist(image);
			return image.getId();
		} else {
			return entityManager.merge(image).getId();
		}
	}

	public void deleteAdImage(long imageId, long userId) {
		
		Query query = entityManager.createQuery("DELETE FROM Image i  where id in (select id from Image where id=:imageId and i.ad.user.id = :userId) ");
		query.setParameter("imageId",imageId);
		query.setParameter("userId", userId);
		query.executeUpdate();

	}
	
public void deleteProfileImage(long imageId, long userId) {
		
		Query query = entityManager.createQuery("DELETE FROM Image i where id=:imageId and i.user.id = :userId ");
		query.setParameter("imageId",imageId);
		query.setParameter("userId", userId);
		query.executeUpdate();

	}

	public List<Image> getImagesByUserId(long id) {
		
		return entityManager
				.createQuery("select i from Image i where i.user.id =:id")
				.setParameter("id", id).getResultList();
	}

	public void setImageDescription(long imageId, String description) {
		Query query = entityManager.createQuery("Update Image set description=:description where id=:imageId");
		query.setParameter("imageId",imageId);
		query.setParameter("description", description);
		query.executeUpdate();
		
	}

	public List<Image> getImagesByAdId(long id) {
		return entityManager
				.createQuery("select i from Image i where i.ad.id =:id")
				.setParameter("id", id).getResultList();
	
	}

}
