package actividades.tarea.controllers;

import java.util.List;
import java.util.Map;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import actividades.tarea.services.AppService;

@Controller
public class AppController {
    private final AppService appService;
    public AppController(AppService appService) {
        this.appService = appService;
    }

    @GetMapping("/")
    public String indexRoute(Model model) {
        List<Map<String, String>> modelData = appService.getActivitiesData(5);
        model.addAttribute("data", modelData);
        return "actividades";
    }

    @PostMapping("/post-score")
    public String postActRoute(
        @RequestBody Map<String, Object> data) throws Exception {
            Long actId;
            Float actScore;
            if (data.containsKey("activityId") && data.containsKey("score")) {
                actId = Long.parseLong(data.get("activityId").toString());
                actScore = Float.parseFloat(data.get("score").toString());

                appService.handlePostScore(
                    actId,
                    actScore
                );
            }
        return "redirect:/";
    }
}
