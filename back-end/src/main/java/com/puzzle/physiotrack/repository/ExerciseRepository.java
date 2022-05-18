
package com.puzzle.physiotrack.repository;

import com.puzzle.physiotrack.model.entity.Exercise;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ExerciseRepository extends JpaRepository<Exercise,Long> {
}


