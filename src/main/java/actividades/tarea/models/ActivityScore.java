package actividades.tarea.models;

import jakarta.persistence.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name="nota")
public class ActivityScore {
    @Id
    @SequenceGenerator(
        name = "nota_sequence",
        sequenceName = "nota_sequence",
        allocationSize = 1
    )
    @GeneratedValue(
        strategy = GenerationType.SEQUENCE,
        generator = "nota_sequence"
    )
    private Long id;

    @NotNull
    @Column(name="nota")
    private Float score;

    @NotNull 
    @Column(name = "actividad_id") 
    private Long activityId; 


    public ActivityScore(){
    }

    public ActivityScore(Float score,
                    Long activity_id) {
        this.score = score;
        this.activityId = activity_id;
    }

    public Long getId() {
        return id;
    }

    public Float getScore() {
        return score;
    }

    public void setScore(Float score) {
        this.score = score;
    }

    public Long getActivityId() {
        return activityId;
    }

    public static Boolean validateScore(Float score) {
        return (score != null) && (score == (int) score.floatValue()) && (score <= 7) && (score >= 1);
    }
}

