package com.winery.exception;

public class WineryNotFoundException extends RuntimeException{
    public WineryNotFoundException() {
    }

    public WineryNotFoundException(String message) {
        super(message);
    }
}
