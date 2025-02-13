package com.codemeet.controller;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import java.util.logging.Logger;

@Controller
public class WebSocketController {


    @MessageMapping("/message")  // Clients send messages to "/app/message" at backend
    @SendTo("/topic/response")  // Broadcast to subscribers on "/topic/response" at frontend
    public String handleMessage(String message) {
        System.out.println(message);
        return  message;
    }
}
