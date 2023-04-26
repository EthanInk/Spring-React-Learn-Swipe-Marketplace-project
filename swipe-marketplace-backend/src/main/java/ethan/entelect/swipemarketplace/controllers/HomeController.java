package ethan.entelect.swipemarketplace.controllers;

import ethan.entelect.swipemarketplace.dtos.TokenResponseDto;
import ethan.entelect.swipemarketplace.entities.UserAccount;
import ethan.entelect.swipemarketplace.services.TokenService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
public class HomeController {

    private TokenService tokenService;
    private UserDetailsService userDetailsService;
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @GetMapping("/")
    public String home() {
        return "Welcome to Swipe Marketplace API";
    }

    @PostMapping("/login")
    public TokenResponseDto authenticate(Authentication authentication) {
        return new TokenResponseDto(tokenService.createToken(authentication));
    }

//    @PostMapping("/register")
//    public ResponseEntity updateSelfUserDetails(Authentication authentication){
//        UserAccount user = userRepository.findById(authentication.getName()).get();
//        UserDetails userUser = User.withUsername("Ethan@gmail.com")
//                .password("Ethan")
//                .passwordEncoder(str -> bCryptPasswordEncoder.encode(str))
//                .roles("USER").build();
//
//    }

}
