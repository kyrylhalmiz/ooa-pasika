package com.rentler.apartment.enums;

import com.fasterxml.jackson.annotation.JsonValue;

public enum Amenities {
    POOL("Pool"),
    GARDEN("Garden"),
    ELEVATOR("Elevator"),
    DOORMAN("Doorman"),
    DECK("Deck"),
    WASHER("Washer"),
    GYM("Gym"),
    PARKING("Parking Spot"),
    FIREPLACE("Fireplace"),
    CONDITIONER("Air Conditioning"),
    DISHWASHER("Dishwasher"),
    STORAGE("Storage"),
    WHEEL("Wheelchair Accessible"),
    HARDWOOD_FLOORS("Hardwood Floors"),
    BALCONY("Balcony"),
    FURNISHED("Furnished"),
    VIEW("View"),
    HIGH_RISE("High Rise"),
    STUDENT_FRIENDLY("Student Friendly"),
    UTILITIES("Utilities Included");

    private final String text;

    Amenities(final String text) {
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
