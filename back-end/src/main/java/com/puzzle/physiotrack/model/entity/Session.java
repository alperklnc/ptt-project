package com.puzzle.physiotrack.model.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.puzzle.physiotrack.model.dto.PatientDTO;
import com.puzzle.physiotrack.model.dto.SessionDTO;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Getter
@Setter
@EqualsAndHashCode
@Entity
@NoArgsConstructor
@NamedQuery(query = "select s from Session s where DATE(s.date) = CURRENT_DATE order by s.time",name = "Session.findByCurrentDay")
@Table(name = "session")
public class Session {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "session_id")
    private long id;
    @JsonFormat(pattern="HH:mm")
    private LocalTime time;
    @JsonFormat(pattern="dd-MM-yyyy")
    private LocalDate date;
    private String comment;
    //@JsonIgnore
    @ManyToOne(cascade=CascadeType.ALL,fetch = FetchType.LAZY)
    @JoinColumn(name = "pt_id")
    private Patient patient;

    @JsonIgnore
    @OneToMany(mappedBy = "session",cascade=CascadeType.ALL)
    private List<Exercise> exercises=new ArrayList<>();

    public Exercise getExercise(long id){
        return exercises.stream().filter(ex->ex.getId()==id).collect(Collectors.toList()).get(0);
    }

    @Override
    public String toString() {
        return "Session{" +
                "id=" + id +
                ", time=" + time +
                ", date=" + date +
                ", comment='" + comment + '\'' +
                ", patient=" + patient +
                ", exercises=" + exercises +
                '}';
    }

    public SessionDTO toSessionDTO() {
        SessionDTO s = new SessionDTO();
        s.setId(this.id);
        s.setComment(this.comment);
        s.setDate(this.date);
        s.setTime(this.time);
        s.setPt_id(this.patient.getId());
        return s;
    }
}
