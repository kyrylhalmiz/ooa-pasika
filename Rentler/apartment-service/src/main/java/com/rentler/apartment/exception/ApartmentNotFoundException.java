package com.rentler.apartment.exception;

public class ApartmentNotFoundException extends RuntimeException {
    public ApartmentNotFoundException(String message) {
        super(message);
    }
}


