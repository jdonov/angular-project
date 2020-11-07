package com.winery.web;

import com.winery.model.binding.WineRegisterDTO;
import com.winery.model.service.UserServiceDTO;
import com.winery.model.service.WineServiceDTO;
import com.winery.service.WineService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.MvcUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;

@RestController
@RequestMapping("api/wine")
public class WineController {
    private final WineService wineService;
    private final Logger LOGGER;

    public WineController(WineService wineService) {
        this.wineService = wineService;
        this.LOGGER = LoggerFactory.getLogger(WineController.class);
    }

    @PostMapping("/register")
    public ResponseEntity<WineServiceDTO> registerWine(@Valid @RequestBody WineRegisterDTO wineRegisterDTO, BindingResult bindingResult) {

        if (bindingResult.hasErrors()) {
            return ResponseEntity.badRequest().body(null);
        } else {
            WineServiceDTO wineServiceDTO = this.wineService.addNewWine(wineRegisterDTO);
            return ResponseEntity.status(HttpStatus.CREATED).body(wineServiceDTO);
        }
    }
}
