package com.luv2code.springdemo;

import org.springframework.context.support.ClassPathXmlApplicationContext;

public class BeanScopeDemoApp {

	public static void main(String[] args) {
		
		//load spring config file
		ClassPathXmlApplicationContext context = 
				new ClassPathXmlApplicationContext("beanScope-applicationContext.xml");
		
		//retrieve beans from spring container
		Coach theCoach = context.getBean("myCoach", Coach.class);
		Coach alphaCoach = context.getBean("myCoach", Coach.class);
		boolean result = (theCoach == alphaCoach);
		System.out.println("Pointing to the same object: " + result);
		System.out.println("Memory location for theCoach: " + theCoach);
		System.out.println("Memory location for alphaCoach: " + alphaCoach);
		
		context.close();
		
	}
	

}
