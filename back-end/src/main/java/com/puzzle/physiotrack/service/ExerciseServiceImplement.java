package com.puzzle.physiotrack.service;

import com.puzzle.physiotrack.exception.NotFoundException;
import com.puzzle.physiotrack.model.entity.Exercise;
import com.puzzle.physiotrack.repository.ExerciseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ExerciseServiceImplement implements ExerciseService{

    @Autowired
    ExerciseRepository exerciseRepository;

    @Override
    public List<Exercise> getExercises() {
        return new ArrayList<>(exerciseRepository.findAll());
    }

    @Override
    public Exercise getExercise(long exercise_id) {
        Optional<Exercise> exercise = exerciseRepository.findById(exercise_id);
        return exercise.orElse(null);
    }

    @Override
    @Transactional
    public Exercise addExercise(Exercise exercise) {
        if (exercise.getId() != 0)
            throw new RuntimeException("Exercise id must be equal to 0");
        exerciseRepository.save(exercise);
        return null;
    }

    @Override
    public Exercise updateExercise(Exercise exercise) {
        Optional<Exercise> oldExercise = exerciseRepository.
                findById(exercise.getId());

        if (oldExercise.isPresent())
            exerciseRepository.save(exercise);
        else
            throw new NotFoundException("Exercise not found with id:" + exercise.getId());

        return oldExercise.orElse(null);
    }

    @Override
    public Exercise deleteExercise(long exercise_id) {
        Optional<Exercise> exercise = exerciseRepository.findById(exercise_id);
        if (exercise.isPresent()) {
            exerciseRepository.deleteById(exercise_id);
            return exercise.get();
        } else
            throw new NotFoundException("Exercise not found with id:" + exercise_id);
    }
}

