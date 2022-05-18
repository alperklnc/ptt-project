package com.puzzle.physiotrack.service;

import com.puzzle.physiotrack.model.entity.Doctor;

import java.util.List;


public interface DoctorService {

    List<Doctor> getDoctors();
    Doctor getDoctor(long id);
    Doctor getCurrentlyLoggedInDoctor();
    Doctor updateDoctor(Doctor doctor);
}