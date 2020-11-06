package com.winery.constraint;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.Documented;
import java.lang.annotation.Retention;
import java.lang.annotation.Target;

import static java.lang.annotation.ElementType.*;
import static java.lang.annotation.RetentionPolicy.RUNTIME;

@Target({ FIELD, METHOD, PARAMETER, ANNOTATION_TYPE, TYPE_USE })
@Retention(RUNTIME)
@Constraint(validatedBy = AddressUserValidator.class)
@Documented
public @interface AddressUserValidation {
    String message() default "Invalid address!";
    Class<?>[] groups() default { };
    Class<? extends Payload>[] payload() default { };
}
