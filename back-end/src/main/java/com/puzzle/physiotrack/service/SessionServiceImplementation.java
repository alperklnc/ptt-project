package com.puzzle.physiotrack.service;

import com.puzzle.physiotrack.exception.NotFoundException;
import com.puzzle.physiotrack.model.entity.Session;
import com.puzzle.physiotrack.repository.SessionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class SessionServiceImplementation implements SessionService{

    @Autowired
    SessionRepository sessionRepository;

    @Override
    public List<Session> getAllSessions() {
        return new ArrayList<>(sessionRepository.findAll());
    }

    @Override
    public List<Session> getTodaySessions() {
        return new ArrayList<>(sessionRepository.findByCurrentDay());
    }

    @Override
    public Session getSession(long session_id) {
        Optional<Session> product = sessionRepository.findById(session_id);
        return product.orElse(null);
    }

    @Override
    @Transactional
    public Session addSession(Session session) {
        if (session.getId() != 0)
            throw new RuntimeException("Session id must be equal to 0");
        sessionRepository.save(session);
        return session;
    }

    @Override
    @Transactional
    public Session updateSession(Session session) {
        Optional<Session> oldSession = sessionRepository.
                findById(session.getId());

        if (oldSession.isPresent())
            sessionRepository.save(session);
        else
            throw new NotFoundException("Product not found with id:" + session.getId());

        return oldSession.orElse(null);
    }

    @Override
    @Transactional
    public Session deleteSession(long session_id) {
        Optional<Session> session = sessionRepository.findById(session_id);
        if (session.isPresent()) {
            sessionRepository.deleteById(session_id);
            return session.get();
        } else
            throw new NotFoundException("Session not found with id:" + session_id);
    }
}

