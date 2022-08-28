package com.luv2code.springdemo;

public class TrackCoach implements Coach {

	private FortuneService fortuneService;
	
	
	public TrackCoach(FortuneService fortuneService) {
		this.fortuneService = fortuneService;
	}

	@Override
	public String getDailyWorkout() {
		
		return "run a hard 5k";
	}

	@Override
	public String getDailyFortune() {
		return "Track Coach says: " + fortuneService.getFortune();
	}

	//add an init method
	public void doMyStartupStuff() {
		System.out.println("TrackCoach: Inside method...do my startup stuff");
	}
	
	//add a destroy method
	public void doMyCleanupStuffYoYo() {
		System.out.println("TrackCoach: Inside method...do my cleanup stuff, yoyo");
	}
}
