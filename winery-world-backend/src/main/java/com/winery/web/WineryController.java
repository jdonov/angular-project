package com.winery.web;

import com.winery.exception.BindingResultException;
import com.winery.exception.Error;
import com.winery.model.binding.WineryRegisterBindingDTO;
import com.winery.model.service.WineryDetailsServiceDTO;
import com.winery.model.service.WineryServiceDTO;
import com.winery.service.WineryService;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("api/winery")
public class WineryController {
    private final WineryService wineryService;

    public WineryController(WineryService wineryService) {
        this.wineryService = wineryService;
    }

    @GetMapping
    public ResponseEntity<List<WineryServiceDTO>> getAllWineries() {
        List<WineryServiceDTO> wineries = this.wineryService.getAllWineries();
        return ResponseEntity.ok(wineries);
    }

    @GetMapping("my-wineries")
    public ResponseEntity<List<WineryServiceDTO>> getMyWineries() {
        List<WineryServiceDTO> wineries = this.wineryService.getMyWineries();
        return ResponseEntity.ok(wineries);
    }

    @GetMapping("/{id}")
    public ResponseEntity<WineryDetailsServiceDTO> getWineryDetails(@PathVariable("id") String id) {
        WineryDetailsServiceDTO winery = this.wineryService.getWineryDetails(id);
        return ResponseEntity.ok(winery);
    }

    @PostMapping("/register")
    public ResponseEntity<WineryDetailsServiceDTO> registerWinery(@Valid @RequestBody WineryRegisterBindingDTO wineryRegisterBindingDTO, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            throw new BindingResultException(new Error().setErrors(bindingResult.getAllErrors()
                    .stream()
                    .map(DefaultMessageSourceResolvable::getDefaultMessage)
                    .collect(Collectors.toList())));
        } else {
            WineryDetailsServiceDTO wineryServiceDTO = this.wineryService.registerWinery(wineryRegisterBindingDTO);
            return ResponseEntity.status(HttpStatus.OK).body(wineryServiceDTO);
        }
    }
}
