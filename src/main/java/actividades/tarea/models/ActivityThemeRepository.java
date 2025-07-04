package actividades.tarea.models;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ActivityThemeRepository extends JpaRepository<ActivityTheme, Long> {
    Page<Activity> findAllByOrderByIdDesc(Pageable pageable);

    List<ActivityTheme> findByActivityId(Long activityId);
}

