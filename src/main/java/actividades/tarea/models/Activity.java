package actividades.tarea.models;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name="actividad")
public class Activity {
    @Id
    @SequenceGenerator(
        name = "actividad_sequence",
        sequenceName = "actividad_sequence",
        allocationSize = 1
    )
    @GeneratedValue(
        strategy = GenerationType.SEQUENCE,
        generator = "actividad_sequence"
    )
    private Long id;

    @NotNull
    @Column(name="nombre")
    private String name;

    @NotNull
    @Column(name="sector")
    private String sector;
    
    @NotNull
    @Column(name="dia_hora_inicio")
    private LocalDateTime start;

    public Activity(){
    }

    public Activity(String name,
                    String sector, 
                    LocalDateTime start) {
        this.name = name;
        this.sector = sector;
        this.start = start;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getSector() {
        return sector;
    }

    public LocalDateTime getStart() {
        return start;
    }
}
