package com.puzzle.physiotrack.controller;

import com.puzzle.physiotrack.model.entity.Doctor;
import com.puzzle.physiotrack.service.DoctorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins="*", allowedHeaders = "*")
public class DoctorController {

    @Autowired
    DoctorService doctorService;

    @GetMapping("/doctor")
    public List<Doctor> getProducts() {
        return doctorService.getDoctors();
    }

    @RequestMapping(value = "/doctor/{id}", method = RequestMethod.GET)
    public Doctor getDoctor(@PathVariable long id) {
        return doctorService.getDoctor(id);
    }

    @PutMapping("/doctor")
    public Doctor updateDoctor(@Valid @RequestBody Doctor doctor) {
        return doctorService.updateDoctor(doctor);
    }


}
