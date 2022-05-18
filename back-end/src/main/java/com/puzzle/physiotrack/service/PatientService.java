package com.puzzle.physiotrack.service;

import com.puzzle.physiotrack.model.entity.Doctor;
import com.puzzle.physiotrack.model.entity.Patient;

import java.util.List;
import java.util.Optional;

public interface PatientService {

    List<Patient> getPatients(Doctor doctor);
    Patient getPatient(Doctor doctor, long patient_id);
    Patient addPatient(Patient patient);
    Patient updatePatient(Patient product);
    Patient deletePatient(long patient_id);

}
