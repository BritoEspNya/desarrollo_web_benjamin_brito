package actividades.tarea.models;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ActivityScoreRepository extends JpaRepository<ActivityScore, Long> {
    Page<Activity> findAllByOrderByIdDesc(Pageable pageable);

    List<ActivityScore> findByActivityId(Long activityId);
}