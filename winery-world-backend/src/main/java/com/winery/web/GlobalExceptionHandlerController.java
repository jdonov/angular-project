package com.winery.web;

import com.winery.exception.*;
import com.winery.exception.Error;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@ControllerAdvice
@RestController
public class GlobalExceptionHandlerController {

    @ExceptionHandler(WineryAlreadyExistsException.class)
    @ResponseStatus(HttpStatus.CONFLICT)
    public Error usernameExists(WineryAlreadyExistsException e) {
        return new Error().setErrors(List.of(e.getMessage()));
    }

    @ExceptionHandler(UserAlreadyExistsException.class)
    @ResponseStatus(HttpStatus.CONFLICT)
    public Error usernameExists(UserAlreadyExistsException e) {
        return new Error().setErrors(List.of(e.getMessage()));
    }

    @ExceptionHandler(PasswordsNotMatchException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Error userNotFoundHandler(PasswordsNotMatchException e) {
        return new Error().setErrors(List.of(e.getMessage()));
    }
//
//    @ExceptionHandler(NoSuchOrderException.class)
//    @ResponseStatus(HttpStatus.NOT_FOUND)
//    public Error noSuchOrder(NoSuchOrderException e) {
//        return new Error().setErrors(List.of(e.getMessage()));
//    }

    @ExceptionHandler(BindingResultException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Error bindingResultError(BindingResultException e) {
        return e.getError();
    }

//    @ExceptionHandler(DataIntegrityViolationException.class)
//    @ResponseStatus(HttpStatus.BAD_REQUEST)
//    public Error dataIntegrityViolation(DataIntegrityViolationException e) {
//        return new Error().setErrors(List.of("Bad data format!"));
//    }
//
//    @ExceptionHandler(RuntimeException.class)
//    @ResponseStatus(HttpStatus.BAD_REQUEST)
//    public Error allErrors(RuntimeException e) {
//        return new Error().setErrors(List.of(e.getMessage()));
//    }
}
