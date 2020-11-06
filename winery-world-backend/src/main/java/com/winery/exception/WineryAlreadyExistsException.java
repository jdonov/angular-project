package com.winery.exception;

public class WineryAlreadyExistsException extends RuntimeException{
    public WineryAlreadyExistsException() {
    }

    public WineryAlreadyExistsException(String message) {
        super(message);
    }
}
