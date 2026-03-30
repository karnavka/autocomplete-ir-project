package com.olya.autocomplete.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.olya.autocomplete.service.AutoCompleteService;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class AutoсompleteController {

    private final AutoCompleteService autoCompleteService;

    public AutoсompleteController(AutoCompleteService autoCompleteService) {
        this.autoCompleteService = autoCompleteService;
    }

    @GetMapping("/autocomplete")
    public List<String> autocomplete(
            @RequestParam String q,
            @RequestParam(defaultValue = "5") int limit
    ) throws IOException {
        return autoCompleteService.autocomplete(q, limit);
    }
}