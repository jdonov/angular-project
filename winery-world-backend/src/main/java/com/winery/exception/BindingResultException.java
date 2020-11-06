package com.winery.exception;

public class BindingResultException extends RuntimeException{
    private Error error;

    public BindingResultException(String message) {
        super(message);
    }

    public BindingResultException(Error error) {
        this.error = error;
    }

    public Error getError() {
        return error;
    }

    public void setError(Error error) {
        this.error = error;
    }
}
