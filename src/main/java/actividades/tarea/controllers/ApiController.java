package actividades.tarea.controllers;

import org.springframework.web.bind.annotation.RestController;

import actividades.tarea.services.ApiService;


@RestController
public class ApiController {
    private final ApiService apiService;
    public ApiController(ApiService apiService) {
        this.apiService = apiService;
    }
}
