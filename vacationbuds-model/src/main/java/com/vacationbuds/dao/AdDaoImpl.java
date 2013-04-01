package com.vacationbuds.dao;

import java.util.Date;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.springframework.transaction.annotation.Transactional;

import com.vacationbuds.model.Ad;
import com.vacationbuds.model.User;
import com.vacationbuds.util.SearchCriteria;

@Transactional
public class AdDaoImpl implements AdDao {

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
				.createQuery(
						"select new Ad(a.id, a.active, a.adtype, a.city,a.country, a.departure, a.duration, a.expenses,a.expireOn, a.placeOn, a.text, a.title) from Ad a where a.user.id =:id and a.active=true")
				.setParameter("id", id).getResultList();
	}
	
	

	public void deletaAd(long adId, long userId) {
		Query deleteFavAdsQuery = entityManager
				.createQuery("DELETE FROM Favorite f where f.ad.id =:adId and f.user.id=:userId ");
		deleteFavAdsQuery.setParameter("adId", adId).setParameter(
				"userId", userId);
		deleteFavAdsQuery.executeUpdate();
		
		Query deleteAdImagesQuery = entityManager
				.createQuery("DELETE FROM Image i  where id in (select id from Image where i.ad.id=:adId and i.ad.user.id = :userId) ");
		deleteAdImagesQuery.setParameter("adId", adId);
		deleteAdImagesQuery.setParameter("userId", userId);
		deleteAdImagesQuery.executeUpdate();

		Query deleteAdQuery = entityManager
				.createQuery("DELETE FROM Ad a  where id =:adId and user.id=:userId");
		deleteAdQuery.setParameter("adId", adId);
		deleteAdQuery.setParameter("userId", userId);
		deleteAdQuery.executeUpdate();

	}

	public List<Ad> search(SearchCriteria searchCriteria) {
		String queryString = "select a from Ad a where ((soundex(a.country) =soundex(:country) and not a.country = '') or (soundex(a.city)=soundex(:city) and not a.city = '')) and a.adtype=:type and now() > a.placeOn and  now() < a.expireOn ";
		switch (searchCriteria.getAge()) {
		case 1:
			queryString += " and EXTRACT(year from AGE(NOW(), a.user.birthday)) < 20 ";
			break;
		case 2:
			queryString += " and EXTRACT(year from AGE(NOW(), a.user.birthday)) >= 20 and EXTRACT(year from AGE(NOW(), a.user.birthday)) <= 30 ";
			break;
		case 3:
			queryString += " and EXTRACT(year from AGE(NOW(), a.user.birthday)) > 20 ";
			break;
		case 4:
			queryString += " and EXTRACT(year from AGE(NOW(), a.user.birthday)) < 30 ";
			break;
		case 5:
			queryString += " and EXTRACT(year from AGE(NOW(), a.user.birthday)) >= 30 and EXTRACT(year from AGE(NOW(), a.user.birthday)) <= 40 ";
			break;
		case 6:
			queryString += " and EXTRACT(year from AGE(NOW(), a.user.birthday)) > 30 ";
			break;
		case 7:
			queryString += " and EXTRACT(year from AGE(NOW(), a.user.birthday)) < 40 ";
			break;
		case 8:
			queryString += " and EXTRACT(year from AGE(NOW(), a.user.birthday)) >= 40 and EXTRACT(year from AGE(NOW(), a.user.birthday)) <= 50 ";
			break;
		case 9:
			queryString += " and EXTRACT(year from AGE(NOW(), a.user.birthday)) > 40 ";
			break;
		case 10:
			queryString += " and EXTRACT(year from AGE(NOW(), a.user.birthday)) < 50 ";
			break;
		case 11:
			queryString += " and EXTRACT(year from AGE(NOW(), a.user.birthday)) > 50 ";
			break;
		default:
			break;
		}
		if(searchCriteria.getSex() != 'E'){
			queryString += " and a.user.gender =:sex ";
		}
		Query query = entityManager.createQuery(queryString)
				.setParameter("country", searchCriteria.getDestination())
				.setParameter("city", searchCriteria.getDestination())
				.setParameter("type", searchCriteria.getType());
		if(searchCriteria.getSex() != 'E'){
			query.setParameter("sex", ""+searchCriteria.getSex());
		}
		return query.getResultList();

	}

}
