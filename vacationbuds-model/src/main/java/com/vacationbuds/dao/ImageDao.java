package com.vacationbuds.dao;

import com.vacationbuds.model.Image;

public interface ImageDao {

	long saveOrUpdate(Image image);

	Image getImageById(Long id);
}
