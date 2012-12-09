package com.vacationbuds.webservice;

public interface Service {
	String test();

	boolean validateUser(String username, String password);

	boolean createUser(String jsonUser);

	boolean updateUser(String jsonUser);

	String getUserById(long id);

	boolean createReview(String jsonReview);

	boolean deleteReviewById(long id);

	boolean updateReview(String jsonReview);

	String getInboxMessagesByUserId(long id);

	String getOutboxMessagesByUserId(long id);

	String getMessageById(long id);

	boolean createMessage(String jsonMessage);

	boolean deleteMessageById(long id);

	String getAdsByUserId(long id);

	String getAdById(long id);

	String getAdsBySearchCriteria(String jsonSearchCriteria);

}
