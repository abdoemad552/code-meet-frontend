package com.codemeet.entity;

public enum NotificationType {
    FRIENDSHIP_REQUEST(
        "%s (%s) accepted your friendship request"
    ),
    FRIENDSHIP_ACCEPTED(
        "%s (%s) sent you a friendship request"
    );
    
    private final String abstractContent;
    
    NotificationType(String abstractContent) {
        this.abstractContent = abstractContent;
    }
    
    public String getAbstractContent() {
        return abstractContent;
    }
}
