package com.puzzle.physiotrack.controller;

import com.puzzle.physiotrack.exception.NotFoundException;
import com.puzzle.physiotrack.model.dto.PatientDTO;
import com.puzzle.physiotrack.model.entity.Doctor;
import com.puzzle.physiotrack.model.entity.Exercise;
import com.puzzle.physiotrack.model.entity.Patient;
import com.puzzle.physiotrack.model.entity.Session;
import com.puzzle.physiotrack.service.DoctorService;
import com.puzzle.physiotrack.service.ExerciseService;
import com.puzzle.physiotrack.service.PatientService;
import com.puzzle.physiotrack.service.SessionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins="*", allowedHeaders = "*")
public class PatientController {
    @Autowired
    PatientService patientService;

    @Autowired
    DoctorService doctorService;

    @Autowired
    SessionService sessionService;

    @Autowired
    ExerciseService exerciseService;

    @GetMapping("/patient")
    public List<PatientDTO> getPatients() {
        //Doctor currentDoctor= doctorService.getCurrentlyLoggedInDoctor();
        Doctor currentDoctor= doctorService.getDoctor(3);
        List<Patient> patients=patientService.getPatients(currentDoctor);
        if(patients==null)
            throw new NotFoundException("No patient");
        return patients.stream().map(Patient::toPatientDTO).collect(Collectors.toList());
    }

    @RequestMapping(value = "/patient/{id}", method = RequestMethod.GET)
    public PatientDTO getPatient(@PathVariable long id) {
        //Doctor currentDoctor= doctorService.getCurrentlyLoggedInDoctor();
        Doctor currentDoctor= doctorService.getDoctor(3);
        Patient patient=patientService.getPatient(currentDoctor,id);
        if(patient==null)
            throw new NotFoundException("No patient");
        return patient.toPatientDTO();
    }

    @PostMapping("/patient")
    public Patient addPatient(@Valid @RequestBody PatientDTO patientdto) {
        //Doctor currentDoctor= doctorService.getCurrentlyLoggedInDoctor();
        Doctor currentDoctor= doctorService.getDoctor(3);
        Patient patient=patientdto.toPatient();
        List<String> exercises=patientdto.getExercises();
        int period=patientdto.getPeriod();
        int sessionAmount=patientdto.getSessionAmount();
        String time= patientdto.getSessionHour();
        List<Integer> timeList= Arrays.stream(time.split(":")).map(Integer::parseInt).collect(Collectors.toList());
        LocalTime localTime=LocalTime.of(timeList.get(0),timeList.get(1));

        LocalDate currentDate=LocalDate.now();
        for (int i = 0; i < sessionAmount; i++) {
            Session session=new Session();
            DayOfWeek day=currentDate.getDayOfWeek();
            if(day==DayOfWeek.SUNDAY)
                currentDate=currentDate.plusDays(1);

            session.setDate(currentDate);
            session.setTime(localTime);
            List<Exercise> exerciseList=new ArrayList<>();
            for (String e:exercises) {
                Exercise exercise=new Exercise();
                exercise.setName(e);
                exercise.setAngles(new ArrayList<>());
                exerciseList.add(exercise);
            }
            session.setComment("");
            session.setPatient(patient);
            System.out.println(session.getId());
            sessionService.addSession(session);

            for (Exercise ex : exerciseList) {
                ex.setSession(session);
                exerciseService.addExercise(ex);
            }
            currentDate=currentDate.plusDays(period);
        }

        patient.setDoctor(currentDoctor);
        patient.getSessions().forEach(System.out::println);
        return patientService.addPatient(patient);
    }

    @PutMapping("/patient")
    public Patient updatePatient(@Valid @RequestBody Patient patient) {
        Doctor currentDoctor= doctorService.getCurrentlyLoggedInDoctor();
        patient.setDoctor(currentDoctor);
        return patientService.updatePatient(patient);
    }

    @RequestMapping(value = "/patient/{id}", method = RequestMethod.DELETE)
    public Patient deletePatient(@PathVariable long id) {
        return patientService.deletePatient(id);
    }
}
