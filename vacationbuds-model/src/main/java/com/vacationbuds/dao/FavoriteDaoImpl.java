package com.vacationbuds.dao;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.springframework.transaction.annotation.Transactional;

import com.vacationbuds.model.Ad;
import com.vacationbuds.model.Favorite;
import com.vacationbuds.model.User;

@Transactional
public class FavoriteDaoImpl implements FavoriteDao {

	@PersistenceContext
	private EntityManager entityManager;

	public List<Ad> getFavAdsByUserId(Long id) {
		return entityManager
				.createQuery("select f.ad from Favorite f where f.user.id =:id")
				.setParameter("id", id).getResultList();
	}

	public void removeAdFromFavorites(Ad ad, Long userId) {
		Query deleteFavAdsQuery = entityManager
				.createQuery("DELETE FROM Favorite f where f.ad.id =:adId and f.user.id=:userId ");
		deleteFavAdsQuery.setParameter("adId", ad.getId()).setParameter(
				"userId", userId);
		deleteFavAdsQuery.executeUpdate();
	}

	public void addToFavorites(Ad ad, Long userId) {

		int size = entityManager
				.createQuery(
						"select f.ad.id from Favorite f where f.user.id =:id and f.ad.id=:adId")
				.setParameter("id", userId).setParameter("adId", ad.getId())
				.getResultList().size();
		if (size == 0) {
			Favorite favorite = new Favorite(new User(userId), ad);
			entityManager.persist(favorite);
		}
		
	}

}
