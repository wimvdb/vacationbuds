package com.vacationbuds.dao;

import com.vacationbuds.model.Profile;

public interface ProfileDao {

	boolean saveOrUpdate(Profile profile);

	Profile getProfileById(Long id);
}
