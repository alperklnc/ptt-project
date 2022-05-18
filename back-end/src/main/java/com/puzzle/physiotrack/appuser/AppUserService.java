package com.puzzle.physiotrack.appuser;

import com.puzzle.physiotrack.model.entity.Doctor;
import com.puzzle.physiotrack.registration.token.ConfirmationToken;
import com.puzzle.physiotrack.registration.token.ConfirmationTokenService;
import com.puzzle.physiotrack.repository.DoctorRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
@AllArgsConstructor
public class AppUserService implements UserDetailsService {

    private final static String USER_NOT_FOUND_MSG="User Not Found";
    private final DoctorRepository doctorRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final ConfirmationTokenService confirmationTokenService;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return doctorRepository.findByEmail(email)
                .orElseThrow(()->new UsernameNotFoundException(USER_NOT_FOUND_MSG));
    }

    public String signUpUser(Doctor doctor){
        boolean userExist= doctorRepository.findByEmail(doctor.getEmail()).isPresent();
        if(userExist){
            throw new IllegalStateException("Email already taken");
        }

        String encodePassword=bCryptPasswordEncoder.encode(doctor.getPassword());

        doctor.setPassword(encodePassword);
        //System.err.println(doctor.toString());
        doctorRepository.save(doctor);

        String token=UUID.randomUUID().toString();

        ConfirmationToken confirmationToken=new ConfirmationToken(
                token,
                LocalDateTime.now(),
                LocalDateTime.now().plusMinutes(30),
                doctor
        );

        confirmationTokenService.saveConfirmationToken(confirmationToken);
        return token;
    }

    /*
    public int enableAppUser(String email) {
        return appUserRepository.enableAppUser(email);
    }

     */
}
