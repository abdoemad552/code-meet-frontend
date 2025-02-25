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
	
	private void init(UserRepository userRepository) {
		User u;
		
		u = new User();
		u.setFirstName("Abdo");
		u.setLastName("Emad");
		u.setUsername("abdoemad552");
		u.setEmail("abdoemad552@gmail.com");
		u.setPassword("1234");
		u.setPhoneNumber("01102761050");
		u.setProfilePicture(new byte[]{0, 1, 2, 3});
		
		userRepository.save(u);
		
		u = new User();
		u.setFirstName("Ahmed");
		u.setLastName("Emad");
		u.setUsername("ahmedemad552");
		u.setEmail("ahemdemad552@gmail.com");
		u.setPassword("12345");
		u.setPhoneNumber("01102761051");
		u.setProfilePicture(new byte[]{0, 1, 3, 3});
		
		userRepository.save(u);
		
		u = new User();
		u.setFirstName("Abdo");
		u.setLastName("Sami");
		u.setUsername("abdosmai552");
		u.setEmail("abdosami552@gmail.com");
		u.setPassword("12346");
		u.setPhoneNumber("01102761052");
		u.setProfilePicture(new byte[]{2, 1, 2, 3});
		
		userRepository.save(u);
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
