package com.luv2code.springdemo;

public class CricketCoach implements Coach {

	private FortuneService fortuneService;
	private String emailAddress;
	private String team;
	
	public String getEmailAddress() {
		return emailAddress;
	}


	public void setEmailAddress(String emailAddress) {
		this.emailAddress = emailAddress;
		System.out.println("CricketCoach: inside setter method- setEmail");
	}


	public String getTeam() {
		return team;
	}


	public void setTeam(String team) {
		this.team = team;
		System.out.println("CricketCoach: inside setter method- setTeam");
	}


	//create no-arg constructor
	public CricketCoach() {
		System.out.println("CricketCoach: inside no-arg constructor");
	}
		
	
	public void setFortuneService(FortuneService fortuneService) {
		System.out.println("CricketCoach: inside setter method- setFortune");
		this.fortuneService = fortuneService;
	}



	@Override
	public String getDailyWorkout() {
		
		return "Practice fast bowling today";
	}

	@Override
	public String getDailyFortune() {
		return fortuneService.getFortune();
	}

}
