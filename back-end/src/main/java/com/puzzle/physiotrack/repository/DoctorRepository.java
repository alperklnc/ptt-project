package com.puzzle.physiotrack.repository;

import com.puzzle.physiotrack.model.entity.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface DoctorRepository extends JpaRepository<Doctor,Long> {
    Optional<Doctor> findByEmail(String email);
    Optional<Doctor> findById(long id);

}