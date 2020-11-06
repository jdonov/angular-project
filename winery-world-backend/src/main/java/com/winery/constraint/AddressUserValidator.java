package com.winery.constraint;

import com.winery.model.binding.AddressUserBindingDTO;
import com.winery.model.binding.AddressWineryBindingDTO;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class AddressUserValidator implements ConstraintValidator<AddressUserValidation, AddressUserBindingDTO> {


    @Override
    public boolean isValid(AddressUserBindingDTO addressUserBindingDTO, ConstraintValidatorContext constraintValidatorContext) {
        return addressUserBindingDTO.getCity() != null &&
                !addressUserBindingDTO.getCity().isEmpty() &&
                addressUserBindingDTO.getStreet() != null &&
                !addressUserBindingDTO.getStreet().isEmpty();
    }
}
