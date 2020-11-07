package com.winery.service.impl;

import com.winery.model.binding.AddressUserBindingDTO;
import com.winery.model.binding.AddressWineryBindingDTO;
import com.winery.model.entity.Address;
import com.winery.repository.AddressRepository;
import com.winery.service.AddressService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AddressServiceImpl implements AddressService {
    private final AddressRepository addressRepository;
    private final ModelMapper modelMapper;

    @Autowired
    public AddressServiceImpl(AddressRepository addressRepository, ModelMapper modelMapper) {
        this.addressRepository = addressRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public Address registerAddressWinery(AddressWineryBindingDTO addressWineryBindingDTO) {
        Address address = this.modelMapper.map(addressWineryBindingDTO, Address.class);
        return this.addressRepository.saveAndFlush(address);
    }

    @Override
    public Address registerAddressUser(AddressUserBindingDTO addressUserBindingDTO) {
        Address address = this.modelMapper.map(addressUserBindingDTO, Address.class);
        return this.addressRepository.saveAndFlush(address);
    }
}
