package com.puzzle.physiotrack.service;

import com.puzzle.physiotrack.exception.NotFoundException;
import com.puzzle.physiotrack.model.entity.Doctor;
import com.puzzle.physiotrack.model.entity.Patient;
import com.puzzle.physiotrack.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
public class PatientServiceImplement implements PatientService{

    @Autowired
    private PatientRepository patientRepository;

    @Override
    public List<Patient> getPatients(Doctor doctor) {
        return patientRepository.findByDoctor(doctor);
    }

    @Override
    public Patient getPatient(Doctor doctor, long patient_id) {
        Optional<Patient> patient = patientRepository.findByDoctorAndId(doctor,patient_id);
        return patient.orElse(null);
    }

    @Override
    @Transactional
    public Patient addPatient(Patient patient) {
        patientRepository.save(patient);
        return null;
    }

    @Override
    @Transactional
    public Patient updatePatient(Patient patient) {
        Optional<Patient> oldPatient = patientRepository.
                findById(patient.getId());

        if (oldPatient.isPresent())
            patientRepository.save(patient);
        else
            throw new NotFoundException("Patient not found with id:" + patient.getId());


        return oldPatient.get();
    }

    @Override
    @Transactional
    public Patient deletePatient(long patient_id) {
        Optional<Patient> patient = patientRepository.findById(patient_id);
        if (patient.isPresent()) {
            patientRepository.deleteById(patient_id);
            return patient.get();
        } else
            throw new NotFoundException("Product not found with id:" + patient_id);
    }
}
