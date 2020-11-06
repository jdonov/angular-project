package com.winery.constraint;


import com.winery.model.binding.OrderWineBindingDTO;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.util.Set;

public class OrderedWinesValidator implements ConstraintValidator<OrderedWines, Set<OrderWineBindingDTO>> {

    @Override
    public boolean isValid(Set<OrderWineBindingDTO> orderProductBindingDTOS, ConstraintValidatorContext constraintValidatorContext) {
        if (orderProductBindingDTOS == null || orderProductBindingDTOS.size() == 0) {
            return false;
        }
        boolean checkProducts = true;
        for (OrderWineBindingDTO op : orderProductBindingDTOS) {
            if (op.getId() == null || op.getId().isEmpty() || op.getQuantity() <= 0) {
                checkProducts = false;
                break;
            }
        }
        return checkProducts;
    }
}
