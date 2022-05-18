package com.puzzle.physiotrack.service;

import com.puzzle.physiotrack.model.entity.Doctor;
import com.puzzle.physiotrack.model.entity.Exercise;
import com.puzzle.physiotrack.model.entity.Patient;

import java.util.List;

public interface ExerciseService {
    List<Exercise> getExercises();
    Exercise getExercise(long exercise_id);
    Exercise addExercise(Exercise exercise);
    Exercise updateExercise(Exercise exercise);
    Exercise deleteExercise(long exercise_id);
}

