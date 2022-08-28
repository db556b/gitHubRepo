package com.luv2code.springdemo;

public class TennisCoach implements Coach{
	
	private FortuneService fortuneService;
	private String emailAddress;
	private String team;

	
	@Override
	public String getDailyWorkout() {
		
		return "Go hit a ball against a wall";
		
	}

	@Override
	public String getDailyFortune() {
		
		return fortuneService.getFortune();
	}
}
