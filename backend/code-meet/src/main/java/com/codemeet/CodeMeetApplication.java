package com.codemeet;

import com.codemeet.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class CodeMeetApplication {

	public static void main(String[] args) {
		SpringApplication.run(CodeMeetApplication.class, args);
	}

	
	public CommandLineRunner commandLineRunner(
		UserRepository userRepository
	) {
		return args -> {
		
		};
	}
}
