package com.rentler.apartment.enums;

import com.fasterxml.jackson.annotation.JsonValue;

public enum ApplicationStatus {
    PENDING("Pending"),
    APPROVED("Approved"),
    REJECTED("Rejected");

    private final String text;

    ApplicationStatus(final String text) {
        this.text = text;
    }

    @Override
    public String toString() {
        return text;
    }

    @JsonValue
    public String getText() {
        return text;
    }
}
