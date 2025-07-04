package actividades.tarea.services;

import org.springframework.stereotype.Service;

import actividades.tarea.models.ActivityRepository;

@Service
public class ApiService {
    private final ActivityRepository ActivityRepository;
    public ApiService(ActivityRepository ActivityRepository) {
        this.ActivityRepository = ActivityRepository;
    }
}
