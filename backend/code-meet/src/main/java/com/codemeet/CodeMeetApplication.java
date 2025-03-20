package com.codemeet;

import com.codemeet.entity.User;
import com.codemeet.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableAsync
public class CodeMeetApplication {

	public static void main(String[] args) {
		SpringApplication.run(CodeMeetApplication.class, args);
	}

	private void init(
		UserRepository userRepository
	) {
		User user = new User();
		user.setFirstName("Abdo");
		user.setLastName("Emad");
		user.setUsername("abdoemad123");
		user.setPassword("123");
		user.setEmail("abdoemad123@gmail.com");
		user.setPhoneNumber("01102761051");
		
		userRepository.save(user);
	}
	
	@Bean
	public CommandLineRunner commandLineRunner(
		UserRepository userRepository
	) {
		return args -> {
			// init(userRepository);
		};
	}
}
