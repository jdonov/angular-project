package com.winery.web;

import com.winery.exception.BindingResultException;
import com.winery.exception.Error;
import com.winery.model.binding.WineryRegisterBindingDTO;
import com.winery.model.service.WineryServiceDTO;
import com.winery.service.WineryService;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.stream.Collectors;

@RestController
@RequestMapping("api/winery")
public class WineryController {
    private final WineryService wineryService;

    public WineryController(WineryService wineryService) {
        this.wineryService = wineryService;
    }

    @PostMapping("/register")
    public ResponseEntity<WineryServiceDTO> registerWinery(@Valid @RequestBody WineryRegisterBindingDTO wineryRegisterBindingDTO, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            throw new BindingResultException(new Error().setErrors(bindingResult.getAllErrors()
                    .stream()
                    .map(DefaultMessageSourceResolvable::getDefaultMessage)
                    .collect(Collectors.toList())));
        } else {
            WineryServiceDTO wineryServiceDTO = this.wineryService.registerWinery(wineryRegisterBindingDTO);
            return ResponseEntity.status(HttpStatus.OK).body(wineryServiceDTO);
        }
    }
}
