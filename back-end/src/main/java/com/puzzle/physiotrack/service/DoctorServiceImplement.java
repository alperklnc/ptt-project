package com.puzzle.physiotrack.service;

import com.puzzle.physiotrack.exception.NotFoundException;
import com.puzzle.physiotrack.model.entity.Doctor;
import com.puzzle.physiotrack.repository.DoctorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class DoctorServiceImplement implements DoctorService {
    @Autowired
    DoctorRepository doctorRepository;
    @Override
    public List<Doctor> getDoctors() {
        return new ArrayList<>(doctorRepository.findAll());
    }

    @Override
    public Doctor getDoctor(long id) {
        Optional<Doctor> doctor = doctorRepository.findById(id);
        return doctor.orElse(null);
    }

    @Override
    public Doctor getCurrentlyLoggedInDoctor() {
        //Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        //String currentDoctorEmail = authentication.getName();

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (!(authentication instanceof AnonymousAuthenticationToken)) {
            String currentDoctorEmail = authentication.getName();
            Optional<Doctor> doctor=doctorRepository.findByEmail(currentDoctorEmail);
            return doctor.orElse(null);
        }
        return null;
    }

    @Override
    @Transactional
    public Doctor updateDoctor(Doctor doctor) {
        Optional<Doctor> oldProduct = doctorRepository.
                findById(doctor.getDr_id());

        if (oldProduct.isPresent())
            doctorRepository.save(doctor);
        else
            throw new NotFoundException("Product not found with id:" + doctor.getDr_id());


        return oldProduct.orElse(null);
    }
}