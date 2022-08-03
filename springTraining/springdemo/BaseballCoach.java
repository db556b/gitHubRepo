package com.luv2code.springdemo;

public class BaseballCoach implements Coach{

	
	//define a private field
	private FortuneService fortuneService;
	
	//define constructor for dependency injection
	public BaseballCoach(FortuneService theFortuneService) {
		fortuneService = theFortuneService;
	}
	
	@Override
	public String getDailyWorkout() {
		return "Spend 30 minutes in the batting cage.";
	}

	@Override
	public String getDailyFortune() {
		//use myFortuneService to get a fortune
		return fortuneService.getFortune();
	}  
}     