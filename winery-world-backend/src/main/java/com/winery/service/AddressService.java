package com.winery.service;


import com.winery.model.binding.AddressUserBindingDTO;
import com.winery.model.binding.AddressWineryBindingDTO;
import com.winery.model.entity.Address;
import com.winery.model.entity.User;
import com.winery.model.entity.Winery;

public interface AddressService {
    Address registerAddressWinery(AddressWineryBindingDTO addressWineryBindingDTO);

    Address registerAddressWinery(AddressUserBindingDTO addressUserBindingDTO);
}
