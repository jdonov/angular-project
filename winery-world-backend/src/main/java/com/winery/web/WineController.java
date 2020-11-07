package com.winery.web;

import com.winery.exception.BindingResultException;
import com.winery.exception.Error;
import com.winery.model.binding.WineRegisterDTO;
import com.winery.model.entity.Rating;
import com.winery.model.service.WineServiceDTO;
import com.winery.service.WineService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("api/wine")
public class WineController {
    private final WineService wineService;
    private final Logger LOGGER;

    public WineController(WineService wineService) {
        this.wineService = wineService;
        this.LOGGER = LoggerFactory.getLogger(WineController.class);
    }

    @GetMapping
    public ResponseEntity<List<WineServiceDTO>> getAllWines(@RequestParam("wineryId") String wineryId) {
        List<WineServiceDTO> wines = this.wineService.getAllWines(wineryId);
        return ResponseEntity.ok(wines);
    }

    @PostMapping("/register")
    public ResponseEntity<WineServiceDTO> registerWine(@Valid @RequestBody WineRegisterDTO wineRegisterDTO, BindingResult bindingResult) {

        if (bindingResult.hasErrors()) {
            throw new BindingResultException(new Error().setErrors(bindingResult.getAllErrors()
                    .stream()
                    .map(DefaultMessageSourceResolvable::getDefaultMessage)
                    .collect(Collectors.toList())));
        } else {
            WineServiceDTO wineServiceDTO = this.wineService.addNewWine(wineRegisterDTO);
            return ResponseEntity.status(HttpStatus.CREATED).body(wineServiceDTO);
        }
    }
    @GetMapping("/rate")
    public ResponseEntity<WineServiceDTO> rateWine(@RequestParam("wineId") String wineId, @RequestParam("rating")String rating) {
        Rating rating1 = Rating.valueOf(rating);
        WineServiceDTO wineServiceDTO = this.wineService.rateWine(wineId, rating1);
        return ResponseEntity.ok(wineServiceDTO);
    }
}
