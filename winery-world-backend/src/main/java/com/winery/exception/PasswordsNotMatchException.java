package com.winery.exception;

public class PasswordsNotMatchException extends RuntimeException{
    public PasswordsNotMatchException() {
    }

    public PasswordsNotMatchException(String message) {
        super(message);
    }
}
