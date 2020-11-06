package com.winery.constraint;

import com.winery.model.binding.AddressWineryBindingDTO;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class AddressWineryValidator implements ConstraintValidator<AddressWineryValidation, AddressWineryBindingDTO> {
    @Override
    public boolean isValid(AddressWineryBindingDTO addressWineryBindingDTO, ConstraintValidatorContext constraintValidatorContext) {
        return addressWineryBindingDTO.getRegion() != null &&
                !addressWineryBindingDTO.getRegion().isEmpty() &&
                addressWineryBindingDTO.getCity() != null &&
                !addressWineryBindingDTO.getCity().isEmpty() &&
                addressWineryBindingDTO.getStreet() != null &&
                !addressWineryBindingDTO.getStreet().isEmpty();
    }
}
