package ethan.entelect.swipemarketplace.controllers;

import ethan.entelect.swipemarketplace.dtos.RegisterDto;
import ethan.entelect.swipemarketplace.dtos.TokenResponseDto;
import ethan.entelect.swipemarketplace.entities.UserAccount;
import ethan.entelect.swipemarketplace.repositories.UserRepository;
import ethan.entelect.swipemarketplace.services.TokenService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.provisioning.JdbcUserDetailsManager;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
public class HomeController {

    private TokenService tokenService;
    private UserRepository userRepository;
    private BCryptPasswordEncoder bCryptPasswordEncoder;
    private UserDetailsService userDetailsService;
    @GetMapping("/")
    public String home() {
        return "Welcome to Swipe Marketplace API";
    }

    @PostMapping("/login")
    public TokenResponseDto authenticate(Authentication authentication) {
        return new TokenResponseDto(tokenService.createToken(authentication));
    }

    @PostMapping("/register")
    public ResponseEntity<String> updateSelfUserDetails(@RequestBody RegisterDto registerDto){
        try {
            UserDetails newUser = User.withUsername(registerDto.getEmail())
                    .password(registerDto.getPassword())
                    .disabled(false)
                    .passwordEncoder(str -> bCryptPasswordEncoder.encode(str))
                    .roles("USER").build();
            ((JdbcUserDetailsManager)userDetailsService).createUser(newUser);
            UserAccount newUserAccount = new UserAccount();
            newUserAccount.setEmail(registerDto.getEmail());
            newUserAccount.setName(registerDto.getName());
            newUserAccount.setSurname(registerDto.getSurname());
            newUserAccount.setAccountEnabled(true);
            userRepository.save(newUserAccount);
            return new ResponseEntity<>(HttpStatus.CREATED);

        } catch (Exception error) {
            return new ResponseEntity<>(error.toString(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/authed")
    public ResponseEntity<Boolean> isAuthed(){
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
