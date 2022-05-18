package com.puzzle.physiotrack.controller;

import com.puzzle.physiotrack.exception.NotFoundException;
import com.puzzle.physiotrack.model.dto.SessionDTO;
import com.puzzle.physiotrack.model.entity.Doctor;
import com.puzzle.physiotrack.model.entity.Patient;
import com.puzzle.physiotrack.model.entity.Session;
import com.puzzle.physiotrack.service.DoctorService;
import com.puzzle.physiotrack.service.PatientService;
import com.puzzle.physiotrack.service.SessionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins="*", allowedHeaders = "*")
public class SessionController {
    @Autowired
    PatientService patientService;

    @Autowired
    DoctorService doctorService;

    @Autowired
    SessionService sessionService;

    @RequestMapping(value="/session/{pid}", method = RequestMethod.GET)
    public List<Session> getSessions(@PathVariable long pid) {
        //Doctor currentDoctor= doctorService.getCurrentlyLoggedInDoctor();
        Doctor currentDoctor= doctorService.getDoctor(3);

        Patient currentPatient=patientService.getPatient(currentDoctor,pid);
        if(currentPatient==null)
            throw new NotFoundException("Patient not found with id:" + pid);
        return currentPatient.getSessions();
    }

    @RequestMapping(value = "/session/{pid}/{sid}", method = RequestMethod.GET)
    public Session getSession(@PathVariable long pid,@PathVariable long sid) {
        //Doctor currentDoctor= doctorService.getCurrentlyLoggedInDoctor();
        Doctor currentDoctor= doctorService.getDoctor(3);

        Patient currentPatient=patientService.getPatient(currentDoctor,pid);
        if(currentPatient==null)
            throw new NotFoundException("Patient not found with id:" + pid);
        Session session=currentPatient.getSession(sid);
        if(session==null)
            throw new NotFoundException("No patient");
        return session;
    }

    @RequestMapping(value="/session", method = RequestMethod.GET)
    public List<SessionDTO> getTodaySessions() {
        //Doctor currentDoctor= doctorService.getCurrentlyLoggedInDoctor();
        Doctor currentDoctor= doctorService.getDoctor(3);

        List<Session> allSessions=sessionService.getTodaySessions();
        if (allSessions==null)
            return null;

        return allSessions.stream()
                .filter(s->s.getPatient().getDoctor().getDr_id() == currentDoctor.getDr_id()).map(Session::toSessionDTO)
                .collect(Collectors.toList());
    }

    @PostMapping(value="/session/{pid}")
    public Session addSession(@PathVariable long pid, @Valid @RequestBody Session session) {
        //Doctor currentDoctor= doctorService.getCurrentlyLoggedInDoctor();
        Doctor currentDoctor= doctorService.getDoctor(3);

        Patient currentPatient=patientService.getPatient(currentDoctor,pid);
        session.setPatient(currentPatient);
        return sessionService.addSession(session);
    }

    @PutMapping(value="/session/{pid}")
    public Session updateSession(@PathVariable long pid, @Valid @RequestBody Session session) {
        //Doctor currentDoctor= doctorService.getCurrentlyLoggedInDoctor();
        Doctor currentDoctor= doctorService.getDoctor(3);

        Patient currentPatient=patientService.getPatient(currentDoctor,pid);
        session.setPatient(currentPatient);
        return sessionService.updateSession(session);
    }

    @RequestMapping(value = "/session/{sid}", method = RequestMethod.DELETE)
    public Session deleteSession(@PathVariable long sid) {
        return sessionService.deleteSession(sid);
    }
}
