package com.puzzle.physiotrack.service;

import com.puzzle.physiotrack.model.entity.Session;

import java.util.List;

public interface SessionService {

    List<Session> getAllSessions();
    List<Session> getTodaySessions();
    Session getSession(long session_id);
    Session addSession(Session session);
    Session updateSession(Session session);
    Session deleteSession(long session_id);

}
