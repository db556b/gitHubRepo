package com.luv2code.springdemo;

import org.springframework.context.support.ClassPathXmlApplicationContext;

public class TennicCoachMain {

	public static void main(String[] args) {
		
		ClassPathXmlApplicationContext context = 
				new ClassPathXmlApplicationContext("beanLifeCycle-applicationContext2.xml");
		
		Coach tennisCoach = context.getBean("myCoach", Coach.class);
		
		
		System.out.println(tennisCoach.getDailyWorkout());
		
		context.close();
	}

}
