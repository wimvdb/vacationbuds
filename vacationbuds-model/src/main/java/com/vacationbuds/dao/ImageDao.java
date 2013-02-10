package com.vacationbuds.dao;

import java.util.List;

import com.vacationbuds.model.Image;

public interface ImageDao {

	long saveOrUpdate(Image image);

	Image getImageById(Long id);
	
	List<Image> getImagesByUserId(long id);
	List<Image> getImagesByAdId(long id);
	
	void deleteAdImage(long imageId,long userId);
	void deleteProfileImage(long imageId,long userId);
	void setImageDescription(long imageId,String description);
}
