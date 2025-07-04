package actividades.tarea.services;

import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.util.ResourceUtils;

import actividades.tarea.models.Activity;
import actividades.tarea.models.ActivityRepository;
import actividades.tarea.models.ActivityScore;
import actividades.tarea.models.ActivityScoreRepository;
import actividades.tarea.models.ActivityTheme;
import actividades.tarea.models.ActivityThemeRepository;

@Service
public class AppService {

    private final String pathStatic;
    private final ActivityRepository ActivityRepository;
    private final ActivityScoreRepository ActivityScoreRepository;
    private final ActivityThemeRepository ActivityThemeRepository;

    public AppService(ActivityRepository ActivityRepository,
                    ActivityScoreRepository ActivityScoreRepository,
                    ActivityThemeRepository ActivityThemeRepository
                    ) throws IOException {
        this.ActivityRepository = ActivityRepository;
        this.ActivityScoreRepository = ActivityScoreRepository;
        this.ActivityThemeRepository = ActivityThemeRepository;
        // Dynamically resolve the absolute path for the static directory
        Path staticDir = Paths.get(ResourceUtils.getFile("classpath:static").getAbsolutePath());
        this.pathStatic = staticDir.toString();
        System.out.println("Static path resolved to: " + this.pathStatic);
    }

    public List<Map<String, String>> getActivitiesData(Integer pageSize) {
        List<Activity> Activities = ActivityRepository.findAllByOrderByIdDesc(PageRequest.of(0, pageSize)).getContent();
        List<Map<String, String>> ActivitiesData = new ArrayList<>();
        
        for (Activity act : Activities) {
            Map<String, String> actData = new HashMap<>();
            actData.put("id", act.getId().toString());
            actData.put("act_sector", act.getSector());
            actData.put("act_name", act.getName());
            actData.put("act_start", act.getStart().toString());

            List<ActivityScore> scores = ActivityScoreRepository.findByActivityId(act.getId());
            double averageScore = 0.0;
            if (scores != null && !scores.isEmpty()) {
                double sum = scores.stream()
                                   .mapToDouble(ActivityScore::getScore)
                                   .sum();
                averageScore = sum / scores.size();
            }
            if (averageScore == 0.0) {
                actData.put("act_average_score", "-"); 
            } else {
                actData.put("act_average_score", String.format("%.2f", averageScore)); 
            }

            List<ActivityTheme> Themes = ActivityThemeRepository.findByActivityId(act.getId());
            String[] themes_arr = new String[Themes.size()];
            int i = 0;
            for (ActivityTheme theme : Themes) {
                themes_arr[i] = (theme.getOther() == null || theme.getOther().trim().isEmpty()) ? theme.getTheme() : theme.getOther();
                i++;
            }
            actData.put("act_themes", String.join(", ", themes_arr));

            ActivitiesData.add(actData);
        }

        return ActivitiesData;
    }

    public void handlePostScore(
        Long actId,
        Float actScore
        ) throws Exception {

        if (ActivityScore.validateScore(actScore)) {
            ActivityScore activityScore = new ActivityScore(
                actScore,
                actId
            );
            ActivityScoreRepository.save(activityScore);
            System.out.println("Score saved successfully.");
        } else {
            throw new IllegalArgumentException("Score validation failed.");
        }
    }
}