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
@Table(name="actividad_tema")
public class ActivityTheme {
    @Id
    @SequenceGenerator(
        name = "actividad_tema_sequence",
        sequenceName = "actividad_tema_sequence",
        allocationSize = 1
    )
    @GeneratedValue(
        strategy = GenerationType.SEQUENCE,
        generator = "actividad_tema_sequence"
    )
    private Long id;

    @NotNull
    @Column(name="tema")
    private String theme;

    @Column(name="glosa_otro")
    private String other;

    @NotNull
    @Column(name="actividad_id")
    private Long activityId;

    public ActivityTheme(){
    }

    public ActivityTheme(String theme,
                    String other, 
                    Long activity_id) {
        this.theme = theme;
        this.other = other;
        this.activityId = activity_id;
    }

    public Long getId() {
        return id;
    }

    public String getTheme() {
        return theme;
    }

    public String getOther() {
        return other;
    }

    public Long getActivityId() {
        return activityId;
    }
}
