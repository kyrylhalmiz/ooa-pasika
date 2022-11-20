package com.rentler.apartment.enums;

import com.fasterxml.jackson.annotation.JsonValue;

public enum ApartmentType {
    APARTMENT("Apartment"),
    HOUSE("House"),
    CONDO("Condo"),
    TOWNHOUSE("Townhouse"),
    LOFT("Loft"),
    ROOM("Room");

    private final String text;

    ApartmentType(final String text) {
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
