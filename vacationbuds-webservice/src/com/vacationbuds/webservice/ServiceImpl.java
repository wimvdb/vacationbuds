package com.vacationbuds.webservice;

public class ServiceImpl  implements Service{

	public String test() {
		// TODO Auto-generated method stub
		return "{test : 'test123'}";
	}

	public boolean validateUser(String username, String password) {
		// TODO Auto-generated method stub
		return false;
	}

	public boolean createUser(String jsonUser) {
		// TODO Auto-generated method stub
		return false;
	}

	public boolean updateUser(String jsonUser) {
		// TODO Auto-generated method stub
		return false;
	}

	public String getUserById(long id) {
		// TODO Auto-generated method stub
		return null;
	}

	public boolean createReview(String jsonReview) {
		// TODO Auto-generated method stub
		return false;
	}

	public boolean deleteReviewById(long id) {
		// TODO Auto-generated method stub
		return false;
	}

	public boolean updateReview(String jsonReview) {
		// TODO Auto-generated method stub
		return false;
	}

	public String getInboxMessagesByUserId(long id) {
		// TODO Auto-generated method stub
		return null;
	}

	public String getOutboxMessagesByUserId(long id) {
		// TODO Auto-generated method stub
		return null;
	}

	public String getMessageById(long id) {
		// TODO Auto-generated method stub
		return null;
	}

	public boolean createMessage(String jsonMessage) {
		// TODO Auto-generated method stub
		return false;
	}

	public boolean deleteMessageById(long id) {
		// TODO Auto-generated method stub
		return false;
	}

	public String getAdsByUserId(long id) {
		// TODO Auto-generated method stub
		return null;
	}

	public String getAdById(long id) {
		// TODO Auto-generated method stub
		return null;
	}

	public String getAdsBySearchCriteria(String jsonSearchCriteria) {
		// TODO Auto-generated method stub
		return null;
	}


}
