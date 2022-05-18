package com.puzzle.physiotrack.model.dto;

import com.puzzle.physiotrack.model.entity.Patient;
import lombok.Data;

import javax.validation.constraints.NotBlank;
import java.util.List;

@Data
public class PatientDTO {

    private long id;
    @NotBlank(message = "Patient FirstName is mandatory")
    private String patientFirstName;
    @NotBlank(message = "Patient LastName is mandatory")
    private String patientLastName;
    @NotBlank(message = "Patient Email is mandatory")
    private String patientEmail;
    @NotBlank(message = "Patient TellNo is mandatory")
    private String patientTellNo;
    //@NotBlank(message = "Patient gender is mandatory")
    private Boolean isMan=false;
    private String patientDisease;

    private List<String> exercises;
    private String sessionHour;

    private int period;

    private int sessionAmount;

    public PatientDTO(){}

    public PatientDTO(long id, String patientFirstName, String patientLastName, String patientEmail, String patientTellNo, Boolean isMan, String patientDisease, List<String> exercises, int period, int sessionAmount, String time) {
        this.id = id;
        this.patientFirstName = patientFirstName;
        this.patientLastName = patientLastName;
        this.patientEmail = patientEmail;
        this.patientTellNo = patientTellNo;
        this.isMan = isMan;
        this.patientDisease = patientDisease;
        this.exercises = exercises;
        this.period = period;
        this.sessionAmount = sessionAmount;
        this.sessionHour =time;
    }

    public Patient toPatient() {
        Patient p = new Patient();
        //p.setId(this.id);
        p.setPatientFirstName(this.patientFirstName);
        p.setPatientLastName(this.patientLastName);
        p.setPatientEmail(this.patientEmail);
        p.setPatientTellNo(this.patientTellNo);
        p.setIsMan(this.isMan);
        p.setPatientDisease(this.patientDisease);
        return p;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getPatientFirstName() {
        return patientFirstName;
    }

    public void setPatientFirstName(String patientFirstName) {
        this.patientFirstName = patientFirstName;
    }

    public String getPatientLastName() {
        return patientLastName;
    }

    public void setPatientLastName(String patientLastName) {
        this.patientLastName = patientLastName;
    }

    public String getPatientEmail() {
        return patientEmail;
    }

    public void setPatientEmail(String patientEmail) {
        this.patientEmail = patientEmail;
    }

    public String getPatientTellNo() {
        return patientTellNo;
    }

    public void setPatientTellNo(String patientTellNo) {
        this.patientTellNo = patientTellNo;
    }

    public Boolean getMan() {
        return isMan;
    }

    public void setMan(Boolean man) {
        isMan = man;
    }

    public String getPatientDisease() {
        return patientDisease;
    }

    public void setPatientDisease(String patientDisease) {
        this.patientDisease = patientDisease;
    }

    public List<String> getExercises() {
        return exercises;
    }

    public void setExercises(List<String> exercises) {
        this.exercises = exercises;
    }

    public int getPeriod() {
        return period;
    }

    public void setPeriod(int period) {
        this.period = period;
    }

    public int getSessionAmount() {
        return sessionAmount;
    }

    public void setSessionAmount(int sessionAmount) {
        this.sessionAmount = sessionAmount;
    }

    @Override
    public String toString() {
        return "PatientDTO{" +
                ", patientFirstName='" + patientFirstName + '\'' +
                ", patientLastName='" + patientLastName + '\'' +
                ", patientEmail='" + patientEmail + '\'' +
                ", patientTellNo='" + patientTellNo + '\'' +
                ", isMan=" + isMan +
                ", patientDisease='" + patientDisease + '\'' +
                ", exercises=" + exercises +
                ", time='" + sessionHour + '\'' +
                ", period=" + period +
                ", sessionAmount=" + sessionAmount +
                '}';
    }
}
