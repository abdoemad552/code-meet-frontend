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
}
