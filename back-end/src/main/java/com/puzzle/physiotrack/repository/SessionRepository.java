package com.puzzle.physiotrack.repository;

import com.puzzle.physiotrack.model.entity.Session;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SessionRepository extends JpaRepository<Session,Long> {
    List<Session> findByCurrentDay();
}
