package com.luv2code.springdemo;

public class myApp {

	public static void main(String[] args) {
		
		// create the object
		Coach theCoach = new TrackCoach();
		//use the object
		System.out.println(theCoach.getDailyWorkout());
	}

}
