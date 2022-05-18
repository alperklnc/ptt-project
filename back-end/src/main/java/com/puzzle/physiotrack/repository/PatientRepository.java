package com.puzzle.physiotrack.repository;

import com.puzzle.physiotrack.model.entity.Doctor;
import com.puzzle.physiotrack.model.entity.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PatientRepository extends JpaRepository<Patient,Long> {
    Optional<Patient> findById(long id);

    List<Patient> findByDoctor(Doctor doctor);
    Optional<Patient> findByDoctorAndId(Doctor doctor, long id);

}
