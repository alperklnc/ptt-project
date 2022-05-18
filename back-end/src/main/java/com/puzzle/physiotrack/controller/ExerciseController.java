package com.puzzle.physiotrack.controller;

import com.puzzle.physiotrack.exception.NotFoundException;
import com.puzzle.physiotrack.model.entity.Exercise;
import com.puzzle.physiotrack.model.entity.Session;
import com.puzzle.physiotrack.service.ExerciseService;
import com.puzzle.physiotrack.service.SessionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins="*", allowedHeaders = "*")
public class ExerciseController {

    @Autowired
    SessionService sessionService;

    @Autowired
    ExerciseService exerciseService;

    @RequestMapping(value="/exercise/{sid}", method = RequestMethod.GET)
    public List<Exercise> getExercises(@PathVariable long sid) {
        Session currentSession=sessionService.getSession(sid);
        if(currentSession==null)
            throw new NotFoundException("Session not found with id:" + sid);
        return currentSession.getExercises();
    }

    @RequestMapping(value = "/exercise/{sid}/{eid}", method = RequestMethod.GET)
    public Exercise getExercise(@PathVariable long sid,@PathVariable long eid) {
        Session currentSession=sessionService.getSession(sid);
        if(currentSession==null)
            throw new NotFoundException("Session not found with id:" + sid);

        return currentSession.getExercise(eid);
    }

    @PostMapping(value="/exercise/{sid}")
    public Exercise addExercise(@PathVariable long sid, @Valid @RequestBody Exercise exercise) {
        Session currentSession=sessionService.getSession(sid);
        exercise.setSession(currentSession);
        return exerciseService.addExercise(exercise);
    }

    @PutMapping(value="/exercise/{sid}")
    public Exercise updateExercise(@PathVariable long sid, @Valid @RequestBody Exercise exercise) {
        Session currentSession=sessionService.getSession(sid);
        exercise.setSession(currentSession);
        return exerciseService.updateExercise(exercise);
    }

    @RequestMapping(value = "/exercise/{eid}", method = RequestMethod.DELETE)
    public Exercise deleteExercise(@PathVariable long eid) {
        return exerciseService.deleteExercise(eid);
    }
}

