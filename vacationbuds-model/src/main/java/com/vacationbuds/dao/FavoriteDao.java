package com.vacationbuds.dao;


import java.util.List;

import com.vacationbuds.model.Ad;
import com.vacationbuds.model.Favorite;
import com.vacationbuds.model.User;

public interface FavoriteDao {
	

	
	 
	 List<Ad> getFavAdsByUserId(Long id);
	 
	 void removeAdFromFavorites(Ad ad,Long userid);
	 
	 void addToFavorites(Ad ad, Long userId);
}
